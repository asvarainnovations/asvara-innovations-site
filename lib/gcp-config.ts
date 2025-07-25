import { Storage } from '@google-cloud/storage';

const isLocal = process.env.NODE_ENV === 'development';

export const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  ...(isLocal && { keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE }),
});

// Storage buckets configuration
export const BUCKETS = {
  BLOG_IMAGES: process.env.GCP_BLOG_IMAGES_BUCKET || 'asvara-blog-images',
  BLOG_ATTACHMENTS: process.env.GCP_BLOG_ATTACHMENTS_BUCKET || 'asvara-blog-attachments',
  RESUMES: process.env.GCP_RESUMES_BUCKET || 'asvara-resumes',
} as const;

export type BucketName = typeof BUCKETS[keyof typeof BUCKETS]; 