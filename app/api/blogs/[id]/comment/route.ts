import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { author, content } = await req.json();
    if (!author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const comment = await prisma.blogComment.create({
      data: {
        postId: params.id,
        author,
        content,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
} 