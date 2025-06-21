import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { deleteFile } from '@/app/lib/supabase/storage';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseBlogImageBase = `${supabaseUrl}/storage/v1/object/public/blog-images/`;
    const supabaseAttachmentBase = `${supabaseUrl}/storage/v1/object/public/blog-attachments/`;
    if (id) {
      const submission = await prisma.blogSubmission.findUnique({
        where: { id },
        include: { attachments: true },
      });
      if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
      // Transform coverImage and attachments to full URLs
      const coverImage = submission.coverImage
        ? (submission.coverImage.startsWith("http")
            ? submission.coverImage
            : supabaseBlogImageBase + submission.coverImage)
        : null;
      const attachments = (submission.attachments || []).map(a => ({
        ...a,
        url: a.url.startsWith("http") ? a.url : supabaseAttachmentBase + a.url,
      }));
      return NextResponse.json({
        submission: {
          ...submission,
          coverImage,
          attachments,
        }
      });
    }
    const submissions = await prisma.blogSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Error fetching blog submissions:", error);
    return NextResponse.json({ error: "Failed to fetch blog submissions" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Fetch the submission with attachments before deleting
    const submission = await prisma.blogSubmission.findUnique({
      where: { id },
      include: { attachments: true },
    });
    if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Helper to extract file path from URL
    const getPathFromUrl = (url: string) => {
      try {
        const urlParts = new URL(url);
        // Path is something like /storage/v1/object/public/bucket-name/file-path
        const pathSegments = urlParts.pathname.split('/');
        const bucketIndex = pathSegments.findIndex(segment => segment === 'blog-images' || segment === 'blog-attachments');
        if (bucketIndex !== -1 && bucketIndex + 1 < pathSegments.length) {
          return pathSegments.slice(bucketIndex + 1).join('/');
        }
      } catch (e) {
        // Not a full URL, assume it's a path
        return url;
      }
      return url; // Fallback
    };
    
    // Delete cover image from storage if present
    if (submission.coverImage) {
      try {
        const imagePath = getPathFromUrl(submission.coverImage);
        console.log(`Deleting cover image from blog-images: ${imagePath}`);
        await deleteFile("blog-images", imagePath);
      } catch (error) {
        console.error("Failed to delete cover image:", error);
      }
    }
    // Delete all attachments from storage
    if (submission.attachments && submission.attachments.length > 0) {
      for (const att of submission.attachments) {
        if (att.url) {
          try {
            const attachmentPath = getPathFromUrl(att.url);
            console.log(`Deleting attachment from blog-attachments: ${attachmentPath}`);
            await deleteFile("blog-attachments", attachmentPath);
          } catch (error) {
            console.error(`Failed to delete attachment ${att.id}:`, error);
          }
        }
      }
    }

    // Delete the submission (and attachments in DB via cascade)
    await prisma.blogSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog submission:", error);
    return NextResponse.json({ error: "Failed to delete blog submission" }, { status: 500 });
  }
} 