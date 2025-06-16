import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/authOptions';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });
    }
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error moderating blog post:', error);
    return NextResponse.json({ error: 'Failed to moderate blog post' }, { status: 500 });
  }
} 