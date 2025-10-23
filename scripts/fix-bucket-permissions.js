const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'utopian-pride-462008-j4'
});

const bucketName = 'asvara-blog-images';

async function fixBucketPermissions() {
  try {
    console.log('🔧 Fixing bucket permissions for production...');
    
    const bucket = storage.bucket(bucketName);
    
    // Check current permissions
    console.log('📋 Checking current bucket permissions...');
    try {
      const [iam] = await bucket.iam.getPolicy();
      console.log('Current IAM Policy:', JSON.stringify(iam, null, 2));
    } catch (error) {
      console.log('⚠️  Could not get current IAM policy:', error.message);
    }
    
    // Make bucket publicly readable
    console.log('\n🔓 Making bucket publicly readable...');
    try {
      await bucket.iam.addPolicyBinding({
        role: 'roles/storage.objectViewer',
        members: ['allUsers']
      });
      console.log('✅ Successfully made bucket publicly readable');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket is already publicly readable');
      } else {
        console.log('❌ Error making bucket public:', error.message);
        console.log('\n💡 Manual fix: Run this command:');
        console.log(`gsutil iam ch allUsers:objectViewer gs://${bucketName}`);
      }
    }
    
    // Test the cover image URL
    console.log('\n🧪 Testing cover image accessibility...');
    const coverImageUrl = `https://storage.googleapis.com/${bucketName}/cover-image.png`;
    console.log(`🔗 Testing URL: ${coverImageUrl}`);
    
    try {
      const response = await fetch(coverImageUrl);
      if (response.ok) {
        console.log('✅ Cover image is now publicly accessible!');
        console.log(`📊 Status: ${response.status}`);
        console.log(`📊 Content-Type: ${response.headers.get('content-type')}`);
        console.log(`📊 Content-Length: ${response.headers.get('content-length')} bytes`);
      } else {
        console.log(`❌ Cover image still not accessible (Status: ${response.status})`);
        console.log('💡 Try the manual command: gsutil iam ch allUsers:objectViewer gs://asvara-blog-images');
      }
    } catch (fetchError) {
      console.log(`❌ Error testing URL: ${fetchError.message}`);
    }
    
    // Set up CORS if needed
    console.log('\n🌐 Setting up CORS configuration...');
    const corsConfig = [
      {
        origin: ["*"], // Allow all origins for now
        method: ["GET"],
        responseHeader: ["Content-Type", "Access-Control-Allow-Origin"],
        maxAgeSeconds: 3600
      }
    ];
    
    try {
      await bucket.setCorsConfiguration(corsConfig);
      console.log('✅ CORS configuration set successfully');
    } catch (error) {
      console.log('⚠️  Could not set CORS configuration:', error.message);
      console.log('\n💡 Manual CORS fix:');
      console.log('1. Create a cors.json file with:');
      console.log(JSON.stringify(corsConfig, null, 2));
      console.log('2. Run: gsutil cors set cors.json gs://asvara-blog-images');
    }
    
    console.log('\n🎉 Bucket permission fix completed!');
    console.log('📋 Next steps:');
    console.log('1. Test your production site');
    console.log('2. Check if cover images are now visible');
    console.log('3. If still not working, check your production environment variables');
    
  } catch (error) {
    console.error('❌ Error fixing bucket permissions:', error.message);
    console.log('\n💡 Manual fixes:');
    console.log('1. Make bucket public: gsutil iam ch allUsers:objectViewer gs://asvara-blog-images');
    console.log('2. Set CORS: gsutil cors set cors.json gs://asvara-blog-images');
    console.log('3. Check environment variables in production');
  }
}

fixBucketPermissions();
