import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ApiResponse, Project, ServiceDivision } from '@/types';

// GET /api/projects?division=welding_industrial | interior_solution
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const division = searchParams.get('division') as ServiceDivision | null;

    const projects = await db.getProjects(division || undefined);
    const response: ApiResponse<Project[]> = {
      success: true,
      data: projects,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch projects';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
