import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const type = formData.get('type');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  let bucket = BUCKETS.BLOG_ATTACHMENTS;
  let folder = 'files';
  if (type === 'cover') {
    bucket = BUCKETS.BLOG_IMAGES;
    folder = 'covers';
  }

  const { url, error } = await uploadFile(file, bucket, folder);
  if (error || !url) {
    return NextResponse.json({ error: error || 'Upload failed' }, { status: 500 });
  }

  return NextResponse.json({ url });
} 