import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prismadb';
import crypto from "crypto";

// GET /api/api-keys - Get all API keys for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

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
        key: true,
        createdAt: true,
        lastUsed: true,
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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Generate a secure random API key
    const key = `ask_${crypto.randomBytes(32).toString("hex")}`;

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key,
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true,
        lastUsed: true,
      },
    });

    return NextResponse.json(apiKey);
  } catch (error) {
    console.error("Error creating API key:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 