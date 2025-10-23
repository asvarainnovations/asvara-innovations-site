const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// List of blogs to create (without cover image for now)
const blogsToCreate = [
  {
    filePath: './blog2.md',
    tags: ["Digital Constitutionalism", "Rights", "Governance", "India", "AI", "Privacy"]
  },
  {
    filePath: './blog3.md',
    tags: ["Dark Web", "Terrorism", "Cybersecurity", "Intelligence", "India"]
  },
  {
    filePath: './blog4.md',
    tags: ["Nuclear Accidents", "Radioactive Waste", "Ecosystem", "Environment", "Chernobyl", "Fukushima"]
  },
  {
    filePath: './blog5.md',
    tags: ["Artificial Intelligence", "Right to Privacy", "Data Protection", "Ethical AI", "India"]
  },
  {
    filePath: './blog6.md',
    tags: ["Income Tax", "India", "Tax Regimes", "Finance", "Budget 2025"]
  },
  {
    filePath: './blog7.md',
    tags: ["Legal Profession", "AI", "Lawyers", "Judiciary", "Technology", "India"]
  }
];

async function createBlogsWithoutImages() {
  console.log('🚀 Creating blogs without cover images (temporary solution)...');
  console.log('💡 You can add cover images later once GCP authentication is fixed\n');

  for (const blogConfig of blogsToCreate) {
    try {
      console.log(`\n📝 Processing: ${blogConfig.filePath}`);
      
      const markdownContent = fs.readFileSync(blogConfig.filePath, 'utf8');

      // Extract title (first H1)
      const titleMatch = markdownContent.match(/^#\s*(.+)/m);
      const title = titleMatch ? titleMatch[1].trim().replace(/\*\*/g, '') : path.basename(blogConfig.filePath, '.md');

      // Extract excerpt (first paragraph after title, or abstract if present)
      let excerpt = "";
      const abstractMatch = markdownContent.match(/##\s*(Abstract|1\. Abstract)\s*\n\n([\s\S]+?)(?=\n\n##|$)/i);
      if (abstractMatch) {
        excerpt = abstractMatch[2].split('\n')[0].trim().replace(/\*\*/g, '');
      } else {
        const firstParagraphMatch = markdownContent.replace(/^#\s*.+\n+/, '').match(/^([\s\S]+?)(?=\n\n##|$)/);
        if (firstParagraphMatch) {
          excerpt = firstParagraphMatch[1].split('\n')[0].trim().replace(/\*\*/g, '');
        }
      }
      excerpt = excerpt.substring(0, 200); // Truncate to 200 characters

      // Extract author details
      const authorDetailsMatch = markdownContent.match(/Author Details:\s*\n(.+?)(?:LinkedIn:\s*(.+))?/is);
      let authorName = "Unknown Author";
      let authorEmail = "unknown@example.com";
      let socialProfile = "";
      let bio = "";

      if (authorDetailsMatch) {
        const details = authorDetailsMatch[1].trim().split('\n').map(line => line.trim()).filter(Boolean);
        authorName = details[0].replace(/NAME-\s*/i, '').trim();
        if (details[1]) {
          bio = details[1].trim();
        }
        if (authorDetailsMatch[2]) {
          socialProfile = authorDetailsMatch[2].trim();
        }
      }

      // Find or create author
      let author = await prisma.blogAuthor.findUnique({
        where: { email: authorEmail }
      });

      if (!author) {
        author = await prisma.blogAuthor.create({
          data: {
            name: authorName,
            email: authorEmail,
            bio: bio,
            social: socialProfile
          }
        });
        console.log(`✅ Author created: ${author.name}`);
      } else {
        console.log(`✅ Author already exists: ${author.name}`);
      }

      // Handle tags - create them if they don't exist
      const tags = [];
      for (const tagName of blogConfig.tags) {
        let tag = await prisma.blogTag.findUnique({
          where: { name: tagName }
        });

        if (!tag) {
          tag = await prisma.blogTag.create({
            data: { name: tagName }
          });
          console.log(`✅ Tag created: ${tag.name}`);
        } else {
          console.log(`✅ Tag already exists: ${tag.name}`);
        }
        tags.push(tag);
      }

      // Check if blog post already exists
      const existingBlog = await prisma.blogPost.findFirst({
        where: { title: title }
      });

      if (existingBlog) {
        console.log(`⚠️  Blog post "${title}" already exists. Updating...`);
        await prisma.blogPost.update({
          where: { id: existingBlog.id },
          data: {
            excerpt: excerpt,
            content: markdownContent,
            coverImage: null, // No cover image for now
            status: "PUBLISHED",
            publishedAt: new Date(),
            authorId: author.id,
            tags: {
              set: tags.map(tag => ({ id: tag.id }))
            }
          }
        });
        console.log(`✅ Blog post "${title}" updated successfully!`);
      } else {
        // Create the blog post
        const blogPost = await prisma.blogPost.create({
          data: {
            title: title,
            excerpt: excerpt,
            content: markdownContent,
            coverImage: null, // No cover image for now
            status: "PUBLISHED",
            publishedAt: new Date(),
            tags: {
              connect: tags.map(tag => ({ id: tag.id }))
            },
            authorId: author.id
          }
        });
        console.log(`✅ Blog post "${title}" created successfully!`);
        console.log(`📝 Title: ${blogPost.title}`);
        console.log(`🆔 ID: ${blogPost.id}`);
        console.log(`📅 Published: ${blogPost.publishedAt}`);
      }

    } catch (error) {
      console.error(`❌ Error processing blog ${blogConfig.filePath}:`, error);
    }
  }

  console.log('\n🎉 All blogs created successfully!');
  console.log('💡 Note: Blogs are created without cover images due to GCP authentication issue');
  console.log('🔧 To fix: Generate a new service account key from Google Cloud Console');
  console.log('📋 Next steps:');
  console.log('1. Check your blogs at: /blogs');
  console.log('2. Fix GCP authentication and upload cover images later');
}

createBlogsWithoutImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
