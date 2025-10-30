const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Configuration for blog updates
const blogUpdates = [
  {
    title: "Digital Constitutionalism: The Future of Rights and Governance Online",
    newDate: "2025-01-15", // Format: YYYY-MM-DD
    contentFile: "updated-content-1.md", // Optional: path to updated content file
    // content: `# Updated Title\n\nUpdated content here...` // Alternative: direct content
  },
  {
    title: "Going Deep: The Dark Web Terrorism", 
    newDate: "2025-01-16",
    contentFile: "updated-content-2.md",
  },
  {
    title: "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
    newDate: "2025-01-17",
    // No content update for this one
  },
  {
    title: "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
    newDate: "2025-01-18",
    // No content update for this one
  },
  {
    title: "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
    newDate: "2025-01-19",
    // No content update for this one
  },
  {
    title: "Legal Profession in the Age of AI: Replacement vs Assistance",
    newDate: "2025-01-20",
    // No content update for this one
  }
];

async function updateBlogs() {
  try {
    console.log('🚀 Starting comprehensive blog updates...');
    
    let dateUpdatedCount = 0;
    let contentUpdatedCount = 0;
    
    for (const update of blogUpdates) {
      console.log(`\n🔍 Processing: "${update.title}"`);
      
      // Find the blog post
      const blogPost = await prisma.blogPost.findFirst({
        where: { title: update.title }
      });

      if (!blogPost) {
        console.log(`⚠️  Blog not found: ${update.title}`);
        continue;
      }

      console.log(`✅ Found blog: ${blogPost.title} (ID: ${blogPost.id})`);
      
      const updateData = {};
      
      // Update publication date
      if (update.newDate) {
        const newDate = new Date(update.newDate);
        updateData.publishedAt = newDate;
        console.log(`📅 Updating date from ${blogPost.publishedAt ? new Date(blogPost.publishedAt).toLocaleDateString() : 'Not published'} to ${newDate.toLocaleDateString()}`);
        dateUpdatedCount++;
      }
      
      // Update content
      if (update.contentFile || update.content) {
        let newContent = '';
        
        if (update.content) {
          newContent = update.content;
          console.log(`📝 Using provided content (${newContent.length} characters)`);
        } else if (update.contentFile) {
          const filePath = path.join(__dirname, '..', 'blog-content-updates', update.contentFile);
          
          if (fs.existsSync(filePath)) {
            newContent = fs.readFileSync(filePath, 'utf8');
            console.log(`📁 Using content from file: ${update.contentFile} (${newContent.length} characters)`);
          } else {
            console.log(`⚠️  Content file not found: ${filePath}`);
            console.log(`💡 Skipping content update for this blog`);
          }
        }
        
        if (newContent) {
          updateData.content = newContent;
          updateData.updatedAt = new Date();
          console.log(`📄 Updating content from ${blogPost.content.length} to ${newContent.length} characters`);
          contentUpdatedCount++;
        }
      }
      
      // Apply updates if any
      if (Object.keys(updateData).length > 0) {
        await prisma.blogPost.update({
          where: { id: blogPost.id },
          data: updateData
        });
        console.log(`✅ Successfully updated: ${blogPost.title}`);
      } else {
        console.log(`ℹ️  No updates needed for: ${blogPost.title}`);
      }
    }

    console.log(`\n🎉 Blog updates completed!`);
    console.log(`📊 Blogs with updated dates: ${dateUpdatedCount}`);
    console.log(`📊 Blogs with updated content: ${contentUpdatedCount}`);
    
  } catch (error) {
    console.error('❌ Error updating blogs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogs();


