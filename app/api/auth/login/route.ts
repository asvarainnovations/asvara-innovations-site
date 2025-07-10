export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const valid = await compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // TODO: Issue JWT or session here
    return NextResponse.json({ user: { id: user.id, email: user.email, fullName: user.fullName } });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 