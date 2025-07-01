import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { deleteFile } from '@/app/lib/supabase/storage';

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.careerSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching career submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const submission = await prisma.careerSubmission.findUnique({ where: { id } });
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // Delete file from Supabase Storage
    if (submission.resumeUrl) {
      // Extract path from public URL
      const match = submission.resumeUrl.match(/\/storage\/v1\/object\/public\/resumes\/(.+)$/);
      if (match && match[1]) {
        await deleteFile('resumes', match[1]);
      }
    }
    // Delete DB entry
    await prisma.careerSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting career submission:', error);
    return NextResponse.json({ error: 'Failed to delete submission.' }, { status: 500 });
  }
} 