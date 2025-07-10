export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName } = await req.json();

    if (!fullName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const updatedUser = await prismadb.user.update({
      where: { email: session.user.email },
      data: { fullName },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 