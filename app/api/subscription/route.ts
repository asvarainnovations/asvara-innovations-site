export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from '@/lib/prismadb';
import { Session } from "next-auth";

type UserWithId = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

// GET: Get current user's subscription
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserWithId | undefined;
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    include: { plan: true, service: true },
  });

  return NextResponse.json(subscriptions);
}

// POST: always create a fresh subscription
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserWithId | undefined;
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { planId, serviceId } = await req.json();
  if (!planId || !serviceId) {
    return NextResponse.json({ error: "Missing plan or service" }, { status: 400 });
  }
  const now = new Date();

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      planId,
      serviceId,
      status: "ACTIVE",
      startDate: now,
    },
    include: { plan: true, service: true },
  });

  return NextResponse.json(subscription);
}