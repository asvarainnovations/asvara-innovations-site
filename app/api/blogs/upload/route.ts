import { NextRequest, NextResponse } from "next/server";
// import { uploadToSupabase } from '@/lib/supabase-upload'; // TODO: Implement
 
export async function POST(req: NextRequest) {
  // TODO: Parse multipart/form-data, upload to Supabase Storage
  // For now, just return a placeholder URL
  return NextResponse.json({ url: 'https://placehold.co/600x400' });
} 