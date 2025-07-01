import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/app/lib/supabase/storage';
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const linkedin = formData.get('linkedin') as string;
    const portfolio = formData.get('portfolio') as string;
    const cover = formData.get('cover') as string;
    const resume = formData.get('resume') as File | null;

    if (!name || !email || !resume || !phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Upload resume to Supabase storage
    const { url: resumeUrl, error: uploadError } = await uploadFile(
      resume,
      'resumes', // Supabase bucket name
      'careers'
    );
    if (uploadError || !resumeUrl) {
      return NextResponse.json({ error: 'Resume upload failed.' }, { status: 500 });
    }

    // Store submission in DB (using Prisma)
    const submission = await prisma.careerSubmission.create({
      data: {
        name,
        email,
        phone,
        position,
        linkedin,
        portfolio,
        cover,
        resumeUrl,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Career submission error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 