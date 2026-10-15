import { Inquiry, ServiceDivision } from '@/types';

export interface InquiryInput {
  clientName: string;
  companyName?: string;
  phone: string;
  email?: string;
  division: ServiceDivision;
  serviceTitle: string;
  plotLengthFeet?: number;
  plotWidthFeet?: number;
  shedHeightFeet?: number;
  totalAreaSqFt?: number;
  estimatedBudget?: number;
  location: string;
  requirements?: string;
}

export class InquiryModel {
  static validate(data: Partial<InquiryInput>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.clientName || data.clientName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters');
    }

    if (!data.phone || !/^[0-9+ -]{7,15}$/.test(data.phone.trim())) {
      errors.push('Valid 10-digit mobile number is required');
    }

    if (!data.serviceTitle || data.serviceTitle.trim().length === 0) {
      errors.push('Please select a service from the list');
    }

    if (!data.location || data.location.trim().length < 2) {
      errors.push('City / Site location is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static createInstance(input: InquiryInput): Inquiry {
    let totalAreaSqFt = input.totalAreaSqFt;
    if (!totalAreaSqFt && input.plotLengthFeet && input.plotWidthFeet) {
      totalAreaSqFt = input.plotLengthFeet * input.plotWidthFeet;
    }

    return {
      id: 'inq_' + Math.random().toString(36).substring(2, 9),
      clientName: input.clientName.trim(),
      companyName: input.companyName?.trim() || undefined,
      phone: input.phone.trim(),
      email: input.email?.trim() || '',
      division: input.division || 'welding_industrial',
      serviceTitle: input.serviceTitle,
      plotLengthFeet: input.plotLengthFeet ? Number(input.plotLengthFeet) : undefined,
      plotWidthFeet: input.plotWidthFeet ? Number(input.plotWidthFeet) : undefined,
      shedHeightFeet: input.shedHeightFeet ? Number(input.shedHeightFeet) : undefined,
      totalAreaSqFt,
      estimatedBudget: input.estimatedBudget ? Number(input.estimatedBudget) : undefined,
      location: input.location.trim(),
      requirements: input.requirements?.trim() || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };
  }
}
