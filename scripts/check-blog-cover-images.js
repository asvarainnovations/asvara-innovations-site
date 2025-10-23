const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBlogCoverImages() {
  try {
    console.log('🔍 Checking blog cover images in database...');
    
    const blogs = await prisma.blogPost.findMany({
      where: {
        title: {
          in: [
            "Digital Constitutionalism: The Future of Rights and Governance Online",
            "Going Deep: The Dark Web Terrorism",
            "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
            "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
            "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
            "Legal Profession in the Age of AI: Replacement vs Assistance"
          ]
        }
      },
      select: {
        id: true,
        title: true,
        coverImage: true
      }
    });

    console.log(`\n📊 Found ${blogs.length} blogs:`);
    
    for (const blog of blogs) {
      console.log(`\n📝 ${blog.title}`);
      console.log(`🆔 ID: ${blog.id}`);
      console.log(`🖼️  Cover Image: ${blog.coverImage || 'None'}`);
      
      if (blog.coverImage) {
        if (blog.coverImage.startsWith('https://')) {
          console.log(`✅ Full URL stored`);
        } else {
          console.log(`📁 Filename only: ${blog.coverImage}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking cover images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogCoverImages();
