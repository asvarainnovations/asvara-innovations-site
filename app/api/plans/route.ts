import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

export async function GET() {
  // For demo: get all plans for the first service
  const service = await prisma.service.findFirst();
  if (!service) return NextResponse.json([]);
  const plans = await prisma.subscriptionPlan.findMany({
    where: { serviceId: service.id },
    orderBy: { priceCents: "asc" },
  });
  // Parse features from JSON if needed
  const parsed = plans.map((plan) => ({
    ...plan,
    features: Array.isArray(plan.features) ? plan.features : (plan.features ? JSON.parse(plan.features as any) : []),
  }));
  return NextResponse.json(parsed);
} 