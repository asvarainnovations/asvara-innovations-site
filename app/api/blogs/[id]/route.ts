export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getSignedUrlForPublic } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
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
      let coverImage = null;
      if (blog.coverImage) {
        const { url } = await getSignedUrlForPublic(BUCKETS.BLOG_IMAGES, blog.coverImage);
        coverImage = url;
      }
      const attachments = await Promise.all((blog.attachments || []).map(async a => ({
        ...a,
        url: a.url ? (await getSignedUrlForPublic(BUCKETS.BLOG_ATTACHMENTS, a.url)).url : null,
      })));
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
      let coverImage = null;
      if (submission.coverImage) {
        const { url } = await getSignedUrlForPublic(BUCKETS.BLOG_IMAGES, submission.coverImage);
        coverImage = url;
      }
      const attachments = await Promise.all((submission.attachments || []).map(async a => ({
        ...a,
        url: a.url ? (await getSignedUrlForPublic(BUCKETS.BLOG_ATTACHMENTS, a.url)).url : null,
      })));
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