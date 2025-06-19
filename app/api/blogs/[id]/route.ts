import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseBlogImageBase = `${supabaseUrl}/storage/v1/object/public/blog-images/`;
  const supabaseAttachmentBase = `${supabaseUrl}/storage/v1/object/public/blog-attachments/`;
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
      const coverImage = blog.coverImage
        ? (blog.coverImage.startsWith("http")
            ? blog.coverImage
            : supabaseBlogImageBase + blog.coverImage)
        : null;
      const attachments = (blog.attachments || []).map(a => ({
        ...a,
        url: a.url.startsWith("http") ? a.url : supabaseAttachmentBase + a.url,
      }));
      return NextResponse.json({
        blog: {
          ...blog,
          coverImage,
          attachments,
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
      const coverImage = submission.coverImage
        ? (submission.coverImage.startsWith("http")
            ? submission.coverImage
            : supabaseBlogImageBase + submission.coverImage)
        : null;
      const attachments = (submission.attachments || []).map(a => ({
        ...a,
        url: a.url.startsWith("http") ? a.url : supabaseAttachmentBase + a.url,
      }));
      return NextResponse.json({
        blog: {
          ...submission,
          coverImage,
          attachments,
        },
      });
    }
    return new NextResponse('Blog post not found', { status: 404 });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 