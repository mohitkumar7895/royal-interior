import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ApiResponse, ServiceItem } from '@/types';

// POST /api/admin/services - Add a new service
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.division) {
      return NextResponse.json(
        { success: false, error: 'Title and Division are required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const newService = await db.addService({
      division: body.division,
      title: body.title.trim(),
      slug,
      tagline: body.tagline?.trim() || '',
      description: body.description?.trim() || '',
      features: Array.isArray(body.features) ? body.features : [],
      specs: body.specs || { materials: '', warranty: '', finishOrGrade: '', workScope: '' },
      startingRate: body.startingRate || undefined,
      badge: body.badge || undefined,
      imageUrl: body.imageUrl || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Service "${newService.title}" created successfully in MySQL database`,
        data: newService,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('[Error in POST /api/admin/services]:', err);
    const msg = err instanceof Error ? `${err.message} (${err.stack})` : String(err);
    return NextResponse.json(
      { success: false, error: msg, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// PUT /api/admin/services - Edit existing service
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const updated = await db.updateService(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Service not found', timestamp: new Date().toISOString() },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Service "${updated.title}" updated successfully in MySQL`,
      data: updated,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update service';
    return NextResponse.json(
      { success: false, error: msg, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/services?id=... - Delete service
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const deleted = await db.deleteService(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Service not found', timestamp: new Date().toISOString() },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Service ${id} deleted successfully from MySQL`,
      data: { id },
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete service';
    return NextResponse.json(
      { success: false, error: msg, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
