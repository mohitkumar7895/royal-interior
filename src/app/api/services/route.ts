import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ApiResponse, ServiceItem, ServiceDivision } from '@/types';

// GET /api/services?division=welding_industrial | interior_solution
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const division = searchParams.get('division') as ServiceDivision | null;

    const services = await db.getServices(division || undefined);
    const response: ApiResponse<ServiceItem[]> = {
      success: true,
      data: services,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch services';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
