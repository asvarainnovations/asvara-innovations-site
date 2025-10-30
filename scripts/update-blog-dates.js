const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// List of blog titles and their new publication dates
const blogUpdates = [
  {
    title: "Digital Constitutionalism: The Future of Rights and Governance Online",
    newDate: "2025-10-30" // Format: YYYY-MM-DD
  },
  {
    title: "Going Deep: The Dark Web Terrorism", 
    newDate: "2025-10-30"
  },
  {
    title: "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
    newDate: "2025-10-30"
  },
  {
    title: "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
    newDate: "2025-10-30"
  },
  {
    title: "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
    newDate: "2025-10-30"
  },
  {
    title: "Legal Profession in the Age of AI: Replacement vs Assistance",
    newDate: "2025-10-30"
  }
];

async function updateBlogDates() {
  try {
    console.log('📅 Updating blog publication dates...');
    
    let updatedCount = 0;
    
    for (const update of blogUpdates) {
      console.log(`\n🔍 Looking for blog: "${update.title}"`);
      
      // Find the blog post
      const blogPost = await prisma.blogPost.findFirst({
        where: { title: update.title }
      });

      if (blogPost) {
        console.log(`✅ Found blog: ${blogPost.title} (ID: ${blogPost.id})`);
        console.log(`📅 Current date: ${blogPost.publishedAt ? new Date(blogPost.publishedAt).toLocaleDateString() : 'Not published'}`);
        
        // Update the publication date
        const newDate = new Date(update.newDate);
        await prisma.blogPost.update({
          where: { id: blogPost.id },
          data: {
            publishedAt: newDate
          }
        });
        
        console.log(`✅ Updated publication date for: ${blogPost.title}`);
        console.log(`📅 New date: ${newDate.toLocaleDateString()}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Blog not found: ${update.title}`);
      }
    }

    console.log(`\n🎉 Date update completed!`);
    console.log(`📊 Total blogs updated: ${updatedCount}`);
    
  } catch (error) {
    console.error('❌ Error updating blog dates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogDates();


