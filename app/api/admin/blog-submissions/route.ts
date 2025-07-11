export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { deleteFile, getPublicUrl } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (id) {
      const submission = await prisma.blogSubmission.findUnique({
        where: { id },
        include: { attachments: true },
      });
      if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
      
      // Generate public URL for coverImage
      let coverImage = null;
      if (submission.coverImage) {
        coverImage = getPublicUrl(BUCKETS.BLOG_IMAGES, submission.coverImage);
      }
      // Generate public URLs for attachments
      const attachments = (submission.attachments || []).map(a => ({
        ...a,
        url: a.url ? getPublicUrl(BUCKETS.BLOG_ATTACHMENTS, a.url) : null,
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
      include: { attachments: true },
    });
    // Add public URLs for all submissions
    const submissionsWithUrls = submissions.map((submission) => {
      let coverImage = null;
      if (submission.coverImage) {
        coverImage = getPublicUrl(BUCKETS.BLOG_IMAGES, submission.coverImage);
      }
      const attachments = (submission.attachments || []).map(a => ({
        ...a,
        url: a.url ? getPublicUrl(BUCKETS.BLOG_ATTACHMENTS, a.url) : null,
      }));
      return {
        ...submission,
        coverImage,
        attachments,
      };
    });
    return NextResponse.json({ submissions: submissionsWithUrls });
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

    // Helper to extract file path from GCS URL
    const getPathFromUrl = (url: string, bucketName: string) => {
      try {
        const gcsUrl = `https://storage.googleapis.com/${bucketName}/covers`;
        if (url.startsWith(gcsUrl)) {
          return url.replace(gcsUrl, '');
        }
        // If it's already a path, return as is
        return url;
      } catch (e) {
        // Not a full URL, assume it's a path
        return url;
      }
    };
    
    // Delete cover image from storage if present
    if (submission.coverImage) {
      try {
        const imagePath = getPathFromUrl(submission.coverImage, BUCKETS.BLOG_IMAGES);
        console.log(`Deleting cover image from ${BUCKETS.BLOG_IMAGES}: ${imagePath}`);
        await deleteFile(BUCKETS.BLOG_IMAGES, imagePath);
      } catch (error) {
        console.error("Failed to delete cover image:", error);
      }
    }
    
    // Delete all attachments from storage
    if (submission.attachments && submission.attachments.length > 0) {
      for (const att of submission.attachments) {
        if (att.url) {
          try {
            const attachmentPath = getPathFromUrl(att.url, BUCKETS.BLOG_ATTACHMENTS);
            console.log(`Deleting attachment from ${BUCKETS.BLOG_ATTACHMENTS}: ${attachmentPath}`);
            await deleteFile(BUCKETS.BLOG_ATTACHMENTS, attachmentPath);
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