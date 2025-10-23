const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

async function testGCPAuth() {
  try {
    console.log('🔍 Testing Google Cloud authentication...');
    
    // Check if service account key file exists
    const keyFile = './secrets/service-account-key.json';
    if (!fs.existsSync(keyFile)) {
      console.error('❌ Service account key file not found:', keyFile);
      return;
    }
    
    console.log('✅ Service account key file found');
    
    // Try to read the key file
    let keyData;
    try {
      keyData = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
      console.log('✅ Service account key file is valid JSON');
      console.log('📧 Service account email:', keyData.client_email);
      console.log('🆔 Project ID:', keyData.project_id);
    } catch (error) {
      console.error('❌ Error reading service account key file:', error.message);
      return;
    }
    
    // Initialize Storage with explicit configuration
    const storage = new Storage({
      projectId: 'utopian-pride-462008-j4',
      keyFilename: keyFile
    });
    
    console.log('✅ Storage client initialized');
    
    // Test bucket access
    const bucketName = 'asvara-blog-images';
    const bucket = storage.bucket(bucketName);
    
    console.log(`🔍 Testing access to bucket: ${bucketName}`);
    
    try {
      // Try to get bucket metadata
      const [metadata] = await bucket.getMetadata();
      console.log('✅ Successfully accessed bucket');
      console.log('📦 Bucket name:', metadata.name);
      console.log('📍 Location:', metadata.location);
      console.log('🔒 Public access:', metadata.iam?.bindings ? 'Configured' : 'Not configured');
      
    } catch (error) {
      console.error('❌ Error accessing bucket:', error.message);
      
      if (error.message.includes('Invalid JWT Signature')) {
        console.log('\n💡 Solution: The service account key is invalid or expired.');
        console.log('   Please generate a new service account key from Google Cloud Console.');
      } else if (error.message.includes('Permission denied')) {
        console.log('\n💡 Solution: The service account does not have permission to access the bucket.');
        console.log('   Please check the IAM permissions for the service account.');
      } else if (error.message.includes('not found')) {
        console.log('\n💡 Solution: The bucket does not exist.');
        console.log('   Please create the bucket or check the bucket name.');
      }
    }
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
  }
}

testGCPAuth();
