import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create the default service if it doesn't exist
  const service = await prisma.service.upsert({
    where: { key: 'default' },
    update: {},
    create: {
      key: 'default',
      name: 'Asvara Legal AI',
      description: 'AI-powered legal research and document analysis',
      plans: {
        create: [
          {
            name: 'Basic',
            priceCents: 2900,
            interval: 'MONTHLY',
            description: 'Perfect for individual lawyers and small practices',
            isActive: true,
            features: ['Basic document analysis', 'Up to 100 queries/month', '24/7 support'],
          },
          {
            name: 'Professional',
            priceCents: 4900,
            interval: 'MONTHLY',
            description: 'Ideal for growing law firms',
            isActive: true,
            features: ['Advanced document analysis', 'Unlimited queries', 'Priority support', 'Custom integrations'],
          },
          {
            name: 'Enterprise',
            priceCents: 9900,
            interval: 'MONTHLY',
            description: 'For large law firms and legal departments',
            isActive: true,
            features: ['Full suite of AI tools', 'Dedicated account manager', 'Custom development', 'SLA guarantee'],
          },
        ],
      },
    },
    include: {
      plans: true,
    },
  });

  console.log({ service });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 