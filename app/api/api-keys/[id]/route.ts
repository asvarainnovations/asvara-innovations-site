export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from '@/lib/prismadb';
import { Session } from "next-auth";
import type { NextRequest } from "next/server";

interface SessionWithUser extends Session {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

type UserWithId = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

// DELETE /api/api-keys/[id] - Delete an API key
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    const user = session?.user as UserWithId | undefined;
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id,
      },
    });

    if (!apiKey) {
      return new NextResponse("API key not found", { status: 404 });
    }

    if (apiKey.userId !== user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.apiKey.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting API key:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 