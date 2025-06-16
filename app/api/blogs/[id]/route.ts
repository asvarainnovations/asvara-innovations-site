import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    // Try to find an approved blog post first
    const blog = await prismadb.blogPost.findUnique({
      where: { id },
      include: {
        author: true,
        attachments: true,
      },
    });
    if (blog) {
      return NextResponse.json({
        blog: {
          ...blog,
          attachments: blog.attachments?.map(a => ({ url: a.url, type: a.type })) || [],
        },
      });
    }
    // If not found, try BlogSubmission (for pending/rejected)
    const submission = await prismadb.blogSubmission.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    });
    if (submission) {
      return NextResponse.json({
        blog: {
          ...submission,
          attachments: submission.attachments?.map(a => ({ url: a.url, type: a.type })) || [],
        },
      });
    }
    return new NextResponse('Blog post not found', { status: 404 });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 