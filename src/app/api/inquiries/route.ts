import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { InquiryModel, InquiryInput } from '@/models/inquiry.model';
import { ApiResponse, Inquiry } from '@/types';

// GET /api/inquiries - Fetch all inquiries
export async function GET() {
  try {
    const inquiries = await db.getInquiries();
    const response: ApiResponse<Inquiry[]> = {
      success: true,
      data: inquiries,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch inquiries';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - Submit a new client quote inquiry
export async function POST(req: NextRequest) {
  try {
    const body: InquiryInput = await req.json();

    // Model validation
    const validation = InquiryModel.validate(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(', '),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const newInquiry = InquiryModel.createInstance(body);
    await db.addInquiry(newInquiry);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. RoyalPro engineering team will contact you shortly.',
        data: newInquiry,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process inquiry';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// PATCH /api/inquiries - Update inquiry status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and Status are required', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const updated = await db.updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found', timestamp: new Date().toISOString() },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      data: updated,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update status';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
