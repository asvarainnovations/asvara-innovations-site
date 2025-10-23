const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// List of blog titles that need cover images updated to local path
const blogTitlesToUpdate = [
  "Digital Constitutionalism: The Future of Rights and Governance Online",
  "Going Deep: The Dark Web Terrorism",
  "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
  "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
  "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
  "Legal Profession in the Age of AI: Replacement vs Assistance"
];

async function updateCoverImagesToLocal() {
  try {
    console.log('🖼️  Updating blog cover images to local paths...');
    
    const localCoverImagePath = "/blog-images/cover-image.png";
    let updatedCount = 0;
    
    for (const title of blogTitlesToUpdate) {
      console.log(`\n🔍 Looking for blog: "${title}"`);
      
      // Find the blog post
      const blogPost = await prisma.blogPost.findFirst({
        where: { title: title }
      });

      if (blogPost) {
        console.log(`✅ Found blog: ${blogPost.title} (ID: ${blogPost.id})`);
        console.log(`📸 Current cover image: ${blogPost.coverImage || 'None'}`);
        
        // Update the cover image to local path
        await prisma.blogPost.update({
          where: { id: blogPost.id },
          data: {
            coverImage: localCoverImagePath
          }
        });
        
        console.log(`✅ Updated cover image for: ${blogPost.title}`);
        console.log(`🔗 New cover image path: ${localCoverImagePath}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Blog not found: ${title}`);
      }
    }

    console.log(`\n🎉 Cover image update completed!`);
    console.log(`📊 Total blogs updated: ${updatedCount}`);
    console.log(`🔗 Local cover image path: ${localCoverImagePath}`);
    console.log(`📁 File location: public/blog-images/cover-image.png`);
    
  } catch (error) {
    console.error('❌ Error updating cover images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCoverImagesToLocal();
