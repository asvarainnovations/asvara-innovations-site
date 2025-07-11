import { NextRequest, NextResponse } from "next/server";
import { getPublicUrl } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function GET(req: NextRequest) {
  try {
    // Test public URL generation for blog content
    const testImagePath = 'covers/test-image.jpg';
    const testAttachmentPath = 'files/test-attachment.pdf';
    
    const imageUrl = getPublicUrl(BUCKETS.BLOG_IMAGES, testImagePath);
    const attachmentUrl = getPublicUrl(BUCKETS.BLOG_ATTACHMENTS, testAttachmentPath);
    
    return NextResponse.json({
      status: 'OK',
      message: 'Public URL generation working',
      testImageUrl: imageUrl,
      testAttachmentUrl: attachmentUrl,
      buckets: {
        BLOG_IMAGES: BUCKETS.BLOG_IMAGES,
        BLOG_ATTACHMENTS: BUCKETS.BLOG_ATTACHMENTS,
        RESUMES: BUCKETS.RESUMES,
      },
      expectedFormat: 'https://storage.googleapis.com/{bucket}/{path}'
    });
  } catch (error) {
    console.error('Public URL Test Error:', error);
    
    return NextResponse.json({
      status: 'ERROR',
      message: 'Public URL generation failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 