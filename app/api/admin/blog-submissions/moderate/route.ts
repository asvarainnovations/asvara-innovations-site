export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id, action } = await req.json();
    if (!id || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const status = action === "APPROVE" ? "APPROVED" : "REJECTED";
    const submission = await prisma.blogSubmission.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Error moderating blog submission:", error);
    return NextResponse.json({ error: "Failed to moderate blog submission" }, { status: 500 });
  }
} 