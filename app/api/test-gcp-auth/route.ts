export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { storage } from '@/lib/gcp-config';

export async function GET(req: NextRequest) {
  try {
    // Test basic GCP authentication by listing buckets
    const [buckets] = await storage.getBuckets();
    
    return NextResponse.json({
      status: 'OK',
      message: 'GCP authentication successful',
      bucketCount: buckets.length,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasKeyFile: !!process.env.GOOGLE_CLOUD_KEY_FILE,
    });
  } catch (error) {
    console.error('GCP Auth Test Error:', error);
    
    return NextResponse.json({
      status: 'ERROR',
      message: 'GCP authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasKeyFile: !!process.env.GOOGLE_CLOUD_KEY_FILE,
    }, { status: 500 });
  }
} 