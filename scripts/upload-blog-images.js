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
    
    // Define the images to upload
    const images = [
      {
        localPath: './blog-images/fig1-female-candidates-uttarakhand.png',
        remoteName: 'fig1-female-candidates-uttarakhand.png',
        contentType: 'image/png'
      },
      {
        localPath: './blog-images/fig2-female-candidates-himachal.png',
        remoteName: 'fig2-female-candidates-himachal.png',
        contentType: 'image/png'
      },
      {
        localPath: './blog-images/fig3-uttarakhand-district-data.png',
        remoteName: 'fig3-uttarakhand-district-data.png',
        contentType: 'image/png'
      },
      {
        localPath: './blog-images/fig4-himachal-district-data.png',
        remoteName: 'fig4-himachal-district-data.png',
        contentType: 'image/png'
      },
      {
        localPath: './blog-images/women-political-backwardness-cover.jpg',
        remoteName: 'women-political-backwardness-cover.jpg',
        contentType: 'image/jpeg'
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

// Create a cover image placeholder if needed
async function createCoverImage() {
  try {
    const bucket = storage.bucket(bucketName);
    
    // Create a simple cover image using Canvas (if available)
    // For now, we'll use a placeholder approach
    console.log('📝 Note: You may want to create a custom cover image for the blog post');
    console.log('💡 You can upload a cover image manually to: https://storage.googleapis.com/asvara-blog-images/women-political-backwardness-cover.jpg');
    
  } catch (error) {
    console.error('❌ Error creating cover image:', error);
  }
}

// Main execution
async function main() {
  console.log('📸 Blog Image Upload Script');
  console.log('============================');
  
  await uploadBlogImages();
  await createCoverImage();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Run the blog creation script: node scripts/create-blog-post.js');
  console.log('2. Check your blog at: /blogs');
  console.log('3. Verify images are displaying correctly');
}

main();
