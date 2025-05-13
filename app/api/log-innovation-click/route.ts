import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    // TODO: Save to database or analytics service
    console.log('Innovation clicked:', url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log innovation click:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 