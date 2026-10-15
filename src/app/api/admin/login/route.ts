import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ApiResponse, AdminUser } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const admin: AdminUser = await db.loginAdmin(username, password);

    const response = NextResponse.json({
      success: true,
      message: 'Admin login successful',
      data: admin,
      timestamp: new Date().toISOString(),
    });

    // Set simple secure session cookie for admin
    response.cookies.set('royalpro_admin_session', JSON.stringify({ id: admin.id, username: admin.username }), {
      httpOnly: false, // accessible to client for greeting
      path: '/',
      maxAge: 86400 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid login credentials';
    return NextResponse.json(
      { success: false, error: msg, timestamp: new Date().toISOString() },
      { status: 401 }
    );
  }
}
