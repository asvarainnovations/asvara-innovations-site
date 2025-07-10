export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getSignedUrlForPublic, deleteFile } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.careerSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Add signed URLs for resumes
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

// If you need to implement DELETE or file removal, use deleteFile from @/lib/gcp/storage and update logic accordingly. 