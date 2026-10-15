import { ApiResponse, Project, ServiceItem, Inquiry, ServiceDivision } from '@/types';
import { InquiryInput } from '@/models/inquiry.model';

export const apiClient = {
  async getServices(division?: ServiceDivision): Promise<ServiceItem[]> {
    const url = division ? `/api/services?division=${encodeURIComponent(division)}` : '/api/services';
    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<ServiceItem[]> = await res.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to fetch services');
    }
    return json.data;
  },

  async getProjects(division?: ServiceDivision): Promise<Project[]> {
    const url = division ? `/api/projects?division=${encodeURIComponent(division)}` : '/api/projects';
    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<Project[]> = await res.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to fetch projects');
    }
    return json.data;
  },

  async getInquiries(): Promise<Inquiry[]> {
    const res = await fetch('/api/inquiries', { cache: 'no-store' });
    const json: ApiResponse<Inquiry[]> = await res.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to fetch inquiries');
    }
    return json.data;
  },

  async submitInquiry(data: InquiryInput): Promise<Inquiry> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<Inquiry> = await res.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to submit inquiry');
    }
    return json.data;
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
    const res = await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const json: ApiResponse<Inquiry> = await res.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to update inquiry status');
    }
    return json.data;
  },
};
