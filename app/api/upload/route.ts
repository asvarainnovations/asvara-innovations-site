import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // For demonstration, just log the file names
    // In a real implementation, you would parse the FormData and process the files
    console.log('Received file upload request');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to upload files:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 