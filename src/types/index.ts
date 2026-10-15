export type ServiceDivision = 'welding_industrial' | 'interior_solution';

export type RoofingSheetType =
  | 'color_coated_galvalume'
  | 'gi_corrugated_tin'
  | 'polycarbonate_transparent'
  | 'insulated_sandwich_panel';

export interface ShedCalculation {
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  roofType: RoofingSheetType;
  floorAreaSqFt: number;
  roofAreaSqFt: number;
  steelStructureCost: number;
  roofingSheetCost: number;
  erectionCivilCost: number;
  totalEstimatedCost: number;
  pricePerSqFt: number;
}

export interface ServiceItem {
  id: string;
  division: ServiceDivision;
  number: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  specs: {
    materials: string;
    warranty: string;
    finishOrGrade: string;
    workScope: string;
  };
  startingRate?: string;
  badge?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'superadmin' | 'admin' | 'staff';
  createdAt: string;
}

export interface Project {
  id: string;
  division: ServiceDivision;
  title: string;
  clientName: string;
  location: string;
  coveredAreaSqFt: number;
  specDetails: string;
  completionDate: string;
  status: 'completed' | 'in_progress';
  imageUrl?: string;
}

export interface Inquiry {
  id: string;
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
  status: 'new' | 'contacted' | 'quotation_sent' | 'closed';
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}
