const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Google Cloud Storage using application default credentials
const storage = new Storage({
  projectId: 'utopian-pride-462008-j4'
  // No keyFilename needed - will use application default credentials
});

const bucketName = 'asvara-blog-images';

async function uploadBlogImages() {
  try {
    const bucket = storage.bucket(bucketName);
    
    // Test bucket access first
    console.log('🔍 Testing bucket access...');
    try {
      const [metadata] = await bucket.getMetadata();
      console.log('✅ Bucket access confirmed');
      console.log(`📦 Bucket: ${metadata.name}`);
      console.log(`📍 Location: ${metadata.location}`);
    } catch (error) {
      console.error('❌ Cannot access bucket:', error.message);
      console.log('\n💡 Solutions:');
      console.log('1. Check if bucket exists: gsutil ls gs://asvara-blog-images');
      console.log('2. Check your permissions for the bucket');
      return;
    }
    
    // Define the images to upload
    const images = [
      {
        localPath: './blog-images/cover-image.png',
        remoteName: 'cover-image.png',
        contentType: 'image/png'
      }
    ];

    console.log('🚀 Starting image uploads...');

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
          }
          // Removed public: true due to uniform bucket-level access
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
      }
    }

    console.log('🎉 Image upload process completed!');

  } catch (error) {
    console.error('❌ Error in upload process:', error);
  }
}

// Main execution
async function main() {
  console.log('📸 Blog Image Upload Script (gcloud auth)');
  console.log('==========================================');
  
  await uploadBlogImages();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Run the blog creation scripts for each blog');
  console.log('2. Check your blogs at: /blogs');
  console.log('3. Verify images are displaying correctly');
}

main();
