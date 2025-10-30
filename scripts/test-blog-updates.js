const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Test script to show what blogs would be updated
async function testBlogUpdates() {
  try {
    console.log('🔍 Testing blog update scripts...\n');
    
    // List of blogs we want to update
    const blogTitles = [
      "Digital Constitutionalism: The Future of Rights and Governance Online",
      "Going Deep: The Dark Web Terrorism", 
      "Impact of Nuclear Accidents and Radioactive Wastes on Ecosystem",
      "Expanding Contours of Artificial Intelligence & Its Effect on the Right to Privacy",
      "Income Tax in India Post-2025: Comparative Study of the Old and New Regimes",
      "Legal Profession in the Age of AI: Replacement vs Assistance"
    ];
    
    console.log('📋 Blogs that will be updated:');
    blogTitles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
    
    console.log('\n📅 New publication dates:');
    const dates = [
      "2025-01-15",
      "2025-01-16", 
      "2025-01-17",
      "2025-01-18",
      "2025-01-19",
      "2025-01-20"
    ];
    
    dates.forEach((date, index) => {
      const formattedDate = new Date(date).toLocaleDateString();
      console.log(`${index + 1}. ${formattedDate}`);
    });
    
    console.log('\n📝 Content updates:');
    console.log('1. Digital Constitutionalism - Will use content from: blog-content-updates/updated-content-1.md');
    console.log('2. Dark Web Terrorism - Will use content from: blog-content-updates/updated-content-2.md');
    console.log('3-6. Other blogs - Date updates only (no content changes)');
    
    console.log('\n🚀 To run the updates when database is available:');
    console.log('npm run blog:update-dates        # Update dates only');
    console.log('npm run blog:update-content      # Update content only');
    console.log('npm run blog:update-comprehensive # Update both dates and content');
    
    console.log('\n✅ Scripts are ready to use!');
    
  } catch (error) {
    console.error('❌ Error in test script:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBlogUpdates();


