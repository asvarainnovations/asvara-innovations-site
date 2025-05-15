import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from '@/lib/prismadb';
import crypto from "crypto";
import { Session } from "next-auth";

interface SessionWithUser extends Session {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}

// GET /api/api-keys - Get all API keys for the current user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as SessionWithUser;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        token: true,
        createdAt: true,
        lastUsedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/api-keys - Create a new API key
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as SessionWithUser;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Generate a secure random API key
    const token = `ask_${crypto.randomBytes(32).toString("hex")}`;

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        token,
        userId: session.user.id,
        serviceId: "default", // You might want to make this configurable
      },
      select: {
        id: true,
        name: true,
        token: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });

    return NextResponse.json(apiKey);
  } catch (error) {
    console.error("Error creating API key:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 