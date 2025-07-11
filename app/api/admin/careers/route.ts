export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/app/lib/prisma";
import { getSignedUrlForPublic, deleteFile } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.careerSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Add signed URLs for resumes (keep private)
    const submissionsWithUrls = await Promise.all(submissions.map(async (submission) => {
      let resumeUrl = null;
      if (submission.resumeUrl) {
        // Extract path from GCS URL if needed
        const filePath = submission.resumeUrl.startsWith('http')
          ? submission.resumeUrl.split(`/${BUCKETS.RESUMES}/`)[1]
          : submission.resumeUrl;
        const { url } = await getSignedUrlForPublic(BUCKETS.RESUMES, filePath);
        resumeUrl = url;
      }
      return {
        ...submission,
        resumeUrl,
      };
    }));
    return NextResponse.json({ submissions: submissionsWithUrls });
  } catch (error) {
    console.error('Error fetching career submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    // Fetch the submission before deleting
    const submission = await prisma.careerSubmission.findUnique({ where: { id } });
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Delete resume file from storage if present
    if (submission.resumeUrl) {
      try {
        // Extract path from GCS URL if needed
        const filePath = submission.resumeUrl.startsWith('http')
          ? submission.resumeUrl.split(`/${BUCKETS.RESUMES}/`)[1]
          : submission.resumeUrl;
        console.log(`Deleting resume from ${BUCKETS.RESUMES}: ${filePath}`);
        await deleteFile(BUCKETS.RESUMES, filePath);
      } catch (error) {
        console.error('Failed to delete resume file:', error);
      }
    }

    // Delete the submission from the database
    await prisma.careerSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting career submission:', error);
    return NextResponse.json({ error: 'Failed to delete career submission.' }, { status: 500 });
  }
} 