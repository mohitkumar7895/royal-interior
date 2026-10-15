import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { executeQuery } from '@/lib/mysql';

export async function POST(request: Request) {
  try {
    const { username = 'admin', currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Both current password and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 4 characters.' },
        { status: 400 }
      );
    }

    // 1. Fetch admin record from MySQL royalpro_db
    const { rows } = await executeQuery<{ id: string; username: string; password_hash: string }>(
      'SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1',
      [username]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Admin account not found in database.' },
        { status: 404 }
      );
    }

    const admin = rows[0];

    // 2. Validate current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect. Please try again.' },
        { status: 401 }
      );
    }

    // 3. Hash new password and update in MySQL
    const newHash = await bcrypt.hash(newPassword, 10);
    await executeQuery('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, admin.id]);

    return NextResponse.json({
      success: true,
      message: 'Password successfully updated in royalpro_db database!',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error changing password';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
