#!/usr/bin/env node

/**
 * Migration Script: Supabase to Google Cloud Platform
 * 
 * This script helps migrate data from Supabase to Google Cloud Platform.
 * Run this after setting up your GCP infrastructure.
 */

const { PrismaClient } = require('@prisma/client');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
});

const BUCKETS = {
  BLOG_IMAGES: process.env.GCP_BLOG_IMAGES_BUCKET || 'asvara-blog-images',
  BLOG_ATTACHMENTS: process.env.GCP_BLOG_ATTACHMENTS_BUCKET || 'asvara-blog-attachments',
  RESUMES: process.env.GCP_RESUMES_BUCKET || 'asvara-resumes',
  GENERAL: process.env.GCP_GENERAL_BUCKET || 'asvara-general',
};

/**
 * Migrate blog submissions from Supabase URLs to GCS URLs
 */
async function migrateBlogSubmissions() {
  console.log('🔄 Migrating blog submissions...');
  
  try {
    const submissions = await prisma.blogSubmission.findMany({
      include: { attachments: true },
    });

    for (const submission of submissions) {
      const updates = {};

      // Update cover image URL if it's a Supabase URL
      if (submission.coverImage && submission.coverImage.includes('supabase')) {
        const fileName = path.basename(submission.coverImage);
        const newUrl = `https://storage.googleapis.com/${BUCKETS.BLOG_IMAGES}/covers/${fileName}`;
        updates.coverImage = `covers/${fileName}`;
        console.log(`  📸 Updated cover image: ${fileName}`);
      }

      // Update attachment URLs
      if (submission.attachments && submission.attachments.length > 0) {
        for (const attachment of submission.attachments) {
          if (attachment.url.includes('supabase')) {
            const fileName = path.basename(attachment.url);
            const newPath = `files/${fileName}`;
            
            await prisma.blogAttachment.update({
              where: { id: attachment.id },
              data: { url: newPath },
            });
            
            console.log(`  📎 Updated attachment: ${fileName}`);
          }
        }
      }

      // Update submission if there are changes
      if (Object.keys(updates).length > 0) {
        await prisma.blogSubmission.update({
          where: { id: submission.id },
          data: updates,
        });
      }
    }

    console.log('✅ Blog submissions migration completed');
  } catch (error) {
    console.error('❌ Error migrating blog submissions:', error);
  }
}

/**
 * Migrate career submissions from Supabase URLs to GCS URLs
 */
async function migrateCareerSubmissions() {
  console.log('🔄 Migrating career submissions...');
  
  try {
    const submissions = await prisma.careerSubmission.findMany();

    for (const submission of submissions) {
      if (submission.resumeUrl && submission.resumeUrl.includes('supabase')) {
        const fileName = path.basename(submission.resumeUrl);
        const newPath = `careers/${fileName}`;
        
        await prisma.careerSubmission.update({
          where: { id: submission.id },
          data: { resumeUrl: `https://storage.googleapis.com/${BUCKETS.RESUMES}/${newPath}` },
        });
        
        console.log(`  📄 Updated resume: ${fileName}`);
      }
    }

    console.log('✅ Career submissions migration completed');
  } catch (error) {
    console.error('❌ Error migrating career submissions:', error);
  }
}

/**
 * Verify GCP configuration
 */
async function verifyGCPConfig() {
  console.log('🔍 Verifying GCP configuration...');
  
  try {
    // Check if buckets exist
    for (const [bucketName, bucketId] of Object.entries(BUCKETS)) {
      const bucket = storage.bucket(bucketId);
      const [exists] = await bucket.exists();
      
      if (exists) {
        console.log(`  ✅ Bucket ${bucketId} exists`);
      } else {
        console.log(`  ❌ Bucket ${bucketId} does not exist`);
      }
    }

    // Test database connection
    await prisma.$connect();
    console.log('  ✅ Database connection successful');
    
    const userCount = await prisma.user.count();
    console.log(`  📊 Found ${userCount} users in database`);
    
  } catch (error) {
    console.error('❌ GCP configuration verification failed:', error);
    process.exit(1);
  }
}

/**
 * Create default service and plans if they don't exist
 */
async function createDefaultService() {
  console.log('🔄 Creating default service and plans...');
  
  try {
    // Check if default service exists
    let service = await prisma.service.findFirst({
      where: { key: 'default' },
    });

    if (!service) {
      service = await prisma.service.create({
        data: {
          key: 'default',
          name: 'Asvara Legal AI',
          description: 'Complete legal AI platform with all features',
          logoUrl: '/logo.png',
        },
      });
      console.log('  ✅ Created default service');
    } else {
      console.log('  ℹ️  Default service already exists');
    }

    // Check if basic plan exists
    let basicPlan = await prisma.subscriptionPlan.findFirst({
      where: { 
        serviceId: service.id,
        name: 'Basic'
      },
    });

    if (!basicPlan) {
      basicPlan = await prisma.subscriptionPlan.create({
        data: {
          serviceId: service.id,
          name: 'Basic',
          priceCents: 0, // Free tier
          interval: 'MONTHLY',
          description: 'Free trial with limited features',
          features: ['Basic access to all tools', 'Limited usage per day'],
        },
      });
      console.log('  ✅ Created basic plan');
    } else {
      console.log('  ℹ️  Basic plan already exists');
    }

    console.log('✅ Default service and plans setup completed');
  } catch (error) {
    console.error('❌ Error creating default service:', error);
  }
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('🚀 Starting Supabase to GCP migration...\n');

  try {
    // Step 1: Verify configuration
    await verifyGCPConfig();
    console.log('');

    // Step 2: Create default service and plans
    await createDefaultService();
    console.log('');

    // Step 3: Migrate data
    await migrateBlogSubmissions();
    console.log('');

    await migrateCareerSubmissions();
    console.log('');

    console.log('🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Test the application functionality');
    console.log('2. Verify file uploads work correctly');
    console.log('3. Check that all data is accessible');
    console.log('4. Update any remaining Supabase references');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = {
  runMigration,
  migrateBlogSubmissions,
  migrateCareerSubmissions,
  verifyGCPConfig,
  createDefaultService,
}; 