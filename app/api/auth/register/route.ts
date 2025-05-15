import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, fullName },
      select: { id: true, email: true, fullName: true, createdAt: true },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
} 