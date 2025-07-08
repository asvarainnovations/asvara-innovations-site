import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { deleteFile, getSignedUrlForPublic } from '@/lib/gcp/storage';
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
      
      // Generate signed URL for coverImage
      let coverImage = null;
      if (submission.coverImage) {
        const { url } = await getSignedUrlForPublic(BUCKETS.BLOG_IMAGES, submission.coverImage);
        coverImage = url;
      }
      // Generate signed URLs for attachments
      const attachments = await Promise.all((submission.attachments || []).map(async a => ({
        ...a,
        url: a.url ? (await getSignedUrlForPublic(BUCKETS.BLOG_ATTACHMENTS, a.url)).url : null,
      })));
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
    // Add signed URLs for all submissions
    const submissionsWithUrls = await Promise.all(submissions.map(async (submission) => {
      let coverImage = null;
      if (submission.coverImage) {
        const { url } = await getSignedUrlForPublic(BUCKETS.BLOG_IMAGES, submission.coverImage);
        coverImage = url;
      }
      const attachments = await Promise.all((submission.attachments || []).map(async a => ({
        ...a,
        url: a.url ? (await getSignedUrlForPublic(BUCKETS.BLOG_ATTACHMENTS, a.url)).url : null,
      })));
      return {
        ...submission,
        coverImage,
        attachments,
      };
    }));
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
        const gcsUrl = `https://storage.googleapis.com/${bucketName}/`;
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