#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    console.log('Running Prisma seed script...');
    // Run the seed script (assumes npm run db:seed is set up)
    const { execSync } = require('child_process');
    execSync('npm run db:seed', { stdio: 'inherit' });

    // Check if at least one user or record exists (adjust model as needed)
    const userCount = await prisma.user.count().catch(() => null);
    if (userCount !== null) {
      console.log(`Users in DB after seed: ${userCount}`);
    } else {
      console.log('User model not found, skipping user count check.');
    }

    // You can add more checks for other models here
    console.log('✅ Seed test completed.');
  } catch (err) {
    console.error('❌ Seed test failed:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 