import { storage, BUCKETS, BucketName } from '../gcp-config';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  url: string;
  error?: string;
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

/**
 * Upload a file to Google Cloud Storage
 */
export async function uploadFile(
  file: File | Buffer,
  bucketName: BucketName,
  folder: string = 'uploads'
): Promise<UploadResult> {
  try {
    const bucket = storage.bucket(bucketName);
    
    // Generate unique filename
    const fileExtension = file instanceof File ? file.name.split('.').pop() : 'bin';
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
    
    // Create file buffer
    const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
    
    // Upload to GCS
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(buffer, {
      metadata: {
        contentType: file instanceof File ? file.type : 'application/octet-stream',
      },
      public: true, // Make file publicly accessible
    });
    
    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    
    return { url: publicUrl };
  } catch (error) {
    console.error('GCP upload error:', error);
    return { 
      url: '', 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
}

/**
 * Delete a file from Google Cloud Storage
 */
export async function deleteFile(bucketName: BucketName, filePath: string): Promise<DeleteResult> {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);
    
    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return { success: true }; // File doesn't exist, consider deletion successful
    }
    
    // Delete the file
    await file.delete();
    
    return { success: true };
  } catch (error) {
    console.error('GCP delete error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Delete failed' 
    };
  }
}

/**
 * Get a signed URL for temporary access to a private file
 */
export async function getSignedUrl(
  bucketName: BucketName,
  filePath: string,
  expirationMinutes: number = 15
): Promise<{ url: string; error?: string }> {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);
    
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expirationMinutes * 60 * 1000,
    });
    
    return { url };
  } catch (error) {
    console.error('GCP signed URL error:', error);
    return { 
      url: '', 
      error: error instanceof Error ? error.message : 'Failed to generate signed URL' 
    };
  }
}

/**
 * Get a signed URL for temporary access to a private file (public access workaround)
 */
export async function getSignedUrlForPublic(
  bucketName: BucketName,
  filePath: string,
  expirationMinutes: number = 60 * 24 * 7 // 7 days by default
): Promise<{ url: string; error?: string }> {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expirationMinutes * 60 * 1000,
    });
    return { url };
  } catch (error) {
    console.error('GCP signed URL error:', error);
    return {
      url: '',
      error: error instanceof Error ? error.message : 'Failed to generate signed URL',
    };
  }
}

/**
 * List files in a bucket with optional prefix
 */
export async function listFiles(
  bucketName: BucketName,
  prefix?: string
): Promise<{ files: string[]; error?: string }> {
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix });
    
    const fileNames = files.map(file => file.name);
    return { files: fileNames };
  } catch (error) {
    console.error('GCP list files error:', error);
    return { 
      files: [], 
      error: error instanceof Error ? error.message : 'Failed to list files' 
    };
  }
} 