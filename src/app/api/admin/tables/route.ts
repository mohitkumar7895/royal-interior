import { NextResponse } from 'next/server';
import { getDatabaseInspectorData } from '@/lib/mysql';

export async function GET() {
  try {
    const data = await getDatabaseInspectorData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to inspect tables';
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
