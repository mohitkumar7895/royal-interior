import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ApiResponse, AdminUser } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || username.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Username must be at least 3 characters', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const newAdmin: AdminUser = await db.registerAdmin(username, email, password);

    return NextResponse.json(
      {
        success: true,
        message: 'Admin registered successfully. You can now login.',
        data: newAdmin,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json(
      { success: false, error: msg, timestamp: new Date().toISOString() },
      { status: 400 }
    );
  }
}
