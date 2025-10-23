const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'utopian-pride-462008-j4'
  // In production, this should use application default credentials
});

const bucketName = 'asvara-blog-images';

async function checkProductionImages() {
  try {
    console.log('🔍 Checking production image accessibility...');
    
    const bucket = storage.bucket(bucketName);
    
    // Check if bucket exists and is accessible
    console.log('📦 Checking bucket access...');
    const [metadata] = await bucket.getMetadata();
    console.log(`✅ Bucket exists: ${metadata.name}`);
    console.log(`📍 Location: ${metadata.location}`);
    
    // Check if the cover image exists
    const coverImageName = 'cover-image.png';
    const file = bucket.file(coverImageName);
    
    console.log(`\n🖼️  Checking cover image: ${coverImageName}`);
    
    try {
      const [exists] = await file.exists();
      if (exists) {
        console.log('✅ Cover image exists in bucket');
        
        // Check if it's publicly accessible
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${coverImageName}`;
        console.log(`🔗 Public URL: ${publicUrl}`);
        
        // Test if the URL is accessible
        try {
          const response = await fetch(publicUrl);
          if (response.ok) {
            console.log('✅ Cover image is publicly accessible');
            console.log(`📊 Content-Type: ${response.headers.get('content-type')}`);
            console.log(`📊 Content-Length: ${response.headers.get('content-length')} bytes`);
          } else {
            console.log(`❌ Cover image is not publicly accessible (Status: ${response.status})`);
            console.log('💡 The bucket may not be configured for public access');
          }
        } catch (fetchError) {
          console.log(`❌ Error testing public access: ${fetchError.message}`);
        }
        
        // Check file permissions
        try {
          const [acl] = await file.acl.get();
          console.log('🔒 File ACL:', acl);
        } catch (aclError) {
          console.log('⚠️  Could not check file ACL:', aclError.message);
        }
        
      } else {
        console.log('❌ Cover image does not exist in bucket');
      }
    } catch (fileError) {
      console.log(`❌ Error checking file: ${fileError.message}`);
    }
    
    // Check bucket permissions
    console.log('\n🔒 Checking bucket permissions...');
    try {
      const [iam] = await bucket.iam.getPolicy();
      console.log('📋 Bucket IAM Policy:', JSON.stringify(iam, null, 2));
    } catch (iamError) {
      console.log('⚠️  Could not check bucket IAM:', iamError.message);
    }
    
  } catch (error) {
    console.error('❌ Error checking production images:', error.message);
    
    if (error.message.includes('Invalid JWT Signature')) {
      console.log('\n💡 Authentication issue:');
      console.log('1. Make sure you have gcloud CLI installed and authenticated');
      console.log('2. Run: gcloud auth application-default login');
      console.log('3. Or set up service account key in production environment');
    } else if (error.message.includes('Permission denied')) {
      console.log('\n💡 Permission issue:');
      console.log('1. Check if the service account has Storage Object Viewer permission');
      console.log('2. Check if the bucket allows public access');
    }
  }
}

checkProductionImages();
