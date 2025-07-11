import { Storage } from '@google-cloud/storage';

// Google Cloud Storage configuration
export const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  // Use keyFilename if provided, otherwise use Application Default Credentials
  ...(process.env.GOOGLE_CLOUD_KEY_FILE && { keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE }),
});

// Storage buckets configuration
export const BUCKETS = {
  BLOG_IMAGES: process.env.GCP_BLOG_IMAGES_BUCKET || 'asvara-blog-images',
  BLOG_ATTACHMENTS: process.env.GCP_BLOG_ATTACHMENTS_BUCKET || 'asvara-blog-attachments',
  RESUMES: process.env.GCP_RESUMES_BUCKET || 'asvara-resumes',
} as const;

export type BucketName = typeof BUCKETS[keyof typeof BUCKETS]; 