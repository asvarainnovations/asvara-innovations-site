const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Google Cloud Storage with better error handling
let storage;
try {
  // Try with service account key first
  const keyFile = './secrets/service-account-key.json';
  if (fs.existsSync(keyFile)) {
    storage = new Storage({
      projectId: 'utopian-pride-462008-j4',
      keyFilename: keyFile
    });
    console.log('✅ Using service account key file');
  } else {
    // Fall back to application default credentials
    storage = new Storage({
      projectId: 'utopian-pride-462008-j4'
    });
    console.log('✅ Using application default credentials');
  }
} catch (error) {
  console.error('❌ Failed to initialize Storage:', error.message);
  process.exit(1);
}

const bucketName = 'asvara-blog-images';

async function uploadBlogImages() {
  try {
    const bucket = storage.bucket(bucketName);
    
    // Test bucket access first
    console.log('🔍 Testing bucket access...');
    try {
      await bucket.getMetadata();
      console.log('✅ Bucket access confirmed');
    } catch (error) {
      console.error('❌ Cannot access bucket:', error.message);
      console.log('\n💡 Solutions:');
      console.log('1. Check if bucket exists: gsutil ls gs://asvara-blog-images');
      console.log('2. Check service account permissions');
      console.log('3. Generate a new service account key');
      return;
    }
    
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

        console.log(`📤 Uploading: ${image.localPath} → ${image.remoteName}`);

        // Upload file
        const [file] = await bucket.upload(image.localPath, {
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

        // Test if the file is accessible
        try {
          const response = await fetch(publicUrl);
          if (response.ok) {
            console.log(`✅ File is publicly accessible`);
          } else {
            console.log(`⚠️  File uploaded but may not be publicly accessible (Status: ${response.status})`);
          }
        } catch (fetchError) {
          console.log(`⚠️  Could not verify public access: ${fetchError.message}`);
        }

      } catch (error) {
        console.error(`❌ Error uploading ${image.remoteName}:`, error.message);
        
        if (error.message.includes('Invalid JWT Signature')) {
          console.log('\n💡 The service account key is invalid. Please:');
          console.log('1. Go to Google Cloud Console');
          console.log('2. Navigate to IAM & Admin → Service Accounts');
          console.log('3. Create a new key for your service account');
          console.log('4. Replace secrets/service-account-key.json with the new key');
        }
      }
    }

    console.log('🎉 Image upload process completed!');

  } catch (error) {
    console.error('❌ Error in upload process:', error);
  }
}

// Main execution
async function main() {
  console.log('📸 Blog Image Upload Script - Batch 2 (Fixed)');
  console.log('==============================================');
  
  await uploadBlogImages();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Run the blog creation scripts for each blog');
  console.log('2. Check your blogs at: /blogs');
  console.log('3. Verify images are displaying correctly');
}

main();
