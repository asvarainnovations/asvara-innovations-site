const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// List of blogs to update with their new content
const blogContentUpdates = [
  {
    title: "Digital Constitutionalism: The Future of Rights and Governance Online",
    contentFile: "updated-content-1.md", // Path to your updated markdown file
    // Or you can provide content directly:
    // content: `# Updated Title\n\nUpdated content here...`
  },
  {
    title: "Going Deep: The Dark Web Terrorism",
    contentFile: "updated-content-2.md",
    // content: `# Another Updated Title\n\nMore updated content...`
  }
];

async function updateBlogContent() {
  try {
    console.log('📝 Updating blog content...');
    
    let updatedCount = 0;
    
    for (const update of blogContentUpdates) {
      console.log(`\n🔍 Looking for blog: "${update.title}"`);
      
      // Find the blog post
      const blogPost = await prisma.blogPost.findFirst({
        where: { title: update.title }
      });

      if (blogPost) {
        console.log(`✅ Found blog: ${blogPost.title} (ID: ${blogPost.id})`);
        console.log(`📄 Current content length: ${blogPost.content.length} characters`);
        
        let newContent = '';
        
        // Check if content is provided directly or from file
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
            console.log(`💡 Please create the file or provide content directly in the script`);
            continue;
          }
        } else {
          console.log(`⚠️  No content provided for: ${update.title}`);
          continue;
        }
        
        // Update the content
        await prisma.blogPost.update({
          where: { id: blogPost.id },
          data: {
            content: newContent,
            updatedAt: new Date() // Update the updatedAt timestamp
          }
        });
        
        console.log(`✅ Updated content for: ${blogPost.title}`);
        console.log(`📄 New content length: ${newContent.length} characters`);
        updatedCount++;
      } else {
        console.log(`⚠️  Blog not found: ${update.title}`);
      }
    }

    console.log(`\n🎉 Content update completed!`);
    console.log(`📊 Total blogs updated: ${updatedCount}`);
    
  } catch (error) {
    console.error('❌ Error updating blog content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogContent();


