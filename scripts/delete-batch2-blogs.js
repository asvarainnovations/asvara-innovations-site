const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// List of blog titles that were published in batch 2
const blogTitlesToDelete = [
  "Digital Constitutionalism: The Future of Rights and Governance Online",
  "Going Deep: The Dark Web Terrorism",
  "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
  "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
  "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
  "Legal Profession in the Age of AI: Replacement vs Assistance"
];

async function deleteBatch2Blogs() {
  try {
    console.log('🗑️  Starting deletion of batch 2 blogs...');
    
    let deletedCount = 0;
    
    for (const title of blogTitlesToDelete) {
      console.log(`\n🔍 Looking for blog: "${title}"`);
      
      // Find the blog post
      const blogPost = await prisma.blogPost.findFirst({
        where: { title: title },
        include: {
          author: true,
          tags: true
        }
      });

      if (blogPost) {
        console.log(`✅ Found blog: ${blogPost.title} (ID: ${blogPost.id})`);
        console.log(`   Author: ${blogPost.author.name}`);
        console.log(`   Tags: ${blogPost.tags.map(tag => tag.name).join(', ')}`);
        
        // Delete the blog post (tags and author will be handled by cascade or remain if used by other blogs)
        await prisma.blogPost.delete({
          where: { id: blogPost.id }
        });
        
        console.log(`❌ Deleted blog: ${blogPost.title}`);
        deletedCount++;
      } else {
        console.log(`⚠️  Blog not found: ${title}`);
      }
    }

    console.log(`\n🎉 Deletion process completed!`);
    console.log(`📊 Total blogs deleted: ${deletedCount}`);
    
    // Optional: Clean up unused authors and tags
    console.log('\n🧹 Checking for unused authors and tags...');
    
    // Find authors that are no longer associated with any blog posts
    const unusedAuthors = await prisma.blogAuthor.findMany({
      where: {
        blogPosts: {
          none: {}
        }
      }
    });
    
    if (unusedAuthors.length > 0) {
      console.log(`Found ${unusedAuthors.length} unused authors:`);
      for (const author of unusedAuthors) {
        console.log(`  - ${author.name} (${author.email})`);
      }
      
      // Uncomment the following lines if you want to delete unused authors
      // await prisma.blogAuthor.deleteMany({
      //   where: {
      //     blogPosts: {
      //       none: {}
      //     }
      //   }
      // });
      // console.log('✅ Deleted unused authors');
    } else {
      console.log('✅ No unused authors found');
    }
    
    // Find tags that are no longer associated with any blog posts
    const unusedTags = await prisma.blogTag.findMany({
      where: {
        blogPosts: {
          none: {}
        }
      }
    });
    
    if (unusedTags.length > 0) {
      console.log(`Found ${unusedTags.length} unused tags:`);
      for (const tag of unusedTags) {
        console.log(`  - ${tag.name}`);
      }
      
      // Uncomment the following lines if you want to delete unused tags
      // await prisma.blogTag.deleteMany({
      //   where: {
      //     blogPosts: {
      //       none: {}
      //     }
      //   }
      // });
      // console.log('✅ Deleted unused tags');
    } else {
      console.log('✅ No unused tags found');
    }
    
  } catch (error) {
    console.error('❌ Error deleting blogs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Add confirmation prompt
async function confirmAndDelete() {
  console.log('⚠️  WARNING: This will delete all batch 2 blogs!');
  console.log('📝 Blogs to be deleted:');
  blogTitlesToDelete.forEach((title, index) => {
    console.log(`   ${index + 1}. ${title}`);
  });
  
  console.log('\n🤔 Are you sure you want to proceed?');
  console.log('💡 To proceed, run: node scripts/delete-batch2-blogs.js --confirm');
  
  // Check if --confirm flag is provided
  if (process.argv.includes('--confirm')) {
    await deleteBatch2Blogs();
  } else {
    console.log('\n❌ Deletion cancelled. Use --confirm flag to proceed.');
  }
}

confirmAndDelete();
