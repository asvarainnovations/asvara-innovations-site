import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();
    // TODO: Integrate with payment/subscription backend
    console.log('Subscription requested for plan:', plan);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process subscription:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 