import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prismadb';

// GET: Get current user's subscription
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
    include: {
      plan: true,
      service: true,
    },
  });
  return NextResponse.json(subscription);
}

// POST: Create or update current user's subscription
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { planId, serviceId } = await req.json();
  if (!planId || !serviceId) {
    return NextResponse.json({ error: "Missing plan or service" }, { status: 400 });
  }
  // Upsert subscription
  const now = new Date();
  const subscription = await prisma.subscription.upsert({
    where: { userId: session.user.id },
    update: {
      planId,
      serviceId,
      status: "ACTIVE",
      startDate: now,
      endDate: null,
      canceledAt: null,
      renewalDate: null,
    },
    create: {
      userId: session.user.id,
      planId,
      serviceId,
      status: "ACTIVE",
      startDate: now,
    },
    include: {
      plan: true,
      service: true,
    },
  });
  return NextResponse.json(subscription);
} 