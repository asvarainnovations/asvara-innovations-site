import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.authorName || !data.authorEmail || !data.title || !data.excerpt || !data.content || !data.consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.authorEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (data.excerpt.length > 200) {
      return NextResponse.json({ error: 'Excerpt too long (max 200 chars)' }, { status: 400 });
    }
    // Store only the path after the bucket for coverImage
    const coverImage = data.coverImageUrl
      ? data.coverImageUrl.replace(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/`, '')
      : undefined;
    // Store only the path after the bucket for attachments
    const attachments = data.attachmentUrls?.map((url: string) => ({
      url: url.replace(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-attachments/`, ''),
      type: 'file',
    })) || [];
    const submission = await prisma.blogSubmission.create({
      data: {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        socialProfile: data.socialProfile,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags,
        coverImage,
        consent: data.consent,
        status: 'PENDING',
        attachments: {
          create: attachments,
        },
      },
    });
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error submitting blog:', error);
    return NextResponse.json({ error: 'Failed to submit blog' }, { status: 500 });
  }
} 