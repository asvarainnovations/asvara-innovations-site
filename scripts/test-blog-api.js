const axios = require('axios');

async function testBlogAPI() {
  try {
    console.log('🔍 Testing blog API for cover images...');
    
    // Test the main blogs API
    const response = await axios.get('http://localhost:3000/api/blogs?published=true');
    const blogs = response.data.blogs;
    
    console.log(`\n📊 Found ${blogs.length} blogs:`);
    
    for (const blog of blogs) {
      console.log(`\n📝 ${blog.title}`);
      console.log(`🆔 ID: ${blog.id}`);
      console.log(`🖼️  Cover Image: ${blog.coverImage || 'None'}`);
      
      if (blog.coverImage) {
        console.log(`✅ Cover image URL is present`);
      } else {
        console.log(`❌ No cover image URL`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing blog API:', error.message);
    console.log('💡 Make sure your Next.js development server is running (npm run dev)');
  }
}

testBlogAPI();
