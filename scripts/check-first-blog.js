const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkFirstBlog() {
  try {
    console.log('🔍 Checking first blog cover image...');
    
    const blog = await prisma.blogPost.findFirst({
      where: { 
        title: { 
          contains: 'Women & Political Backwardness' 
        } 
      },
      select: { 
        id: true, 
        title: true, 
        coverImage: true 
      }
    });
    
    if (blog) {
      console.log('✅ First blog found:');
      console.log('📝 Title:', blog.title);
      console.log('🖼️  Cover Image:', blog.coverImage || 'None');
      
      if (blog.coverImage) {
        if (blog.coverImage.startsWith('http')) {
          console.log('🔗 Full URL stored');
        } else {
          console.log('📁 Filename only stored');
        }
      }
    } else {
      console.log('❌ First blog not found');
    }
    
  } catch (error) {
    console.error('❌ Error checking first blog:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFirstBlog();
