const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'utopian-pride-462008-j4',
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE || './secrets/service-account-key.json'
});

const bucketName = 'asvara-blog-images';

async function uploadBlogImages() {
  try {
    const bucket = storage.bucket(bucketName);
    
    // Define the images to upload - cover image for all blogs
    const images = [
      {
        localPath: './blog-images/cover-image.png',
        remoteName: 'cover-image.png',
        contentType: 'image/png'
      }
    ];

    console.log('🚀 Starting image uploads for batch 2 blogs...');

    for (const image of images) {
      try {
        // Check if file exists
        if (!fs.existsSync(image.localPath)) {
          console.log(`⚠️  File not found: ${image.localPath}`);
          continue;
        }

        // Upload file
        await bucket.upload(image.localPath, {
          destination: image.remoteName,
          metadata: {
            contentType: image.contentType,
            cacheControl: 'public, max-age=31536000', // 1 year cache
          },
          public: true // Make the file publicly accessible
        });

        console.log(`✅ Uploaded: ${image.remoteName}`);
        
        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${image.remoteName}`;
        console.log(`🔗 Public URL: ${publicUrl}`);

      } catch (error) {
        console.error(`❌ Error uploading ${image.remoteName}:`, error.message);
      }
    }

    console.log('🎉 Image upload process completed!');

  } catch (error) {
    console.error('❌ Error in upload process:', error);
  }
}

// Main execution
async function main() {
  console.log('📸 Blog Image Upload Script - Batch 2');
  console.log('=====================================');
  
  await uploadBlogImages();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Run the blog creation scripts for each blog');
  console.log('2. Check your blogs at: /blogs');
  console.log('3. Verify images are displaying correctly');
}

main();
