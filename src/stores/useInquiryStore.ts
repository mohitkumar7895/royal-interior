import { create } from 'zustand';
import { Inquiry } from '@/types';

interface InquiryState {
  inquiries: Inquiry[];
  isDrawerOpen: boolean;
  isInquiryModalOpen: boolean;
  setInquiries: (inquiries: Inquiry[]) => void;
  addInquiry: (inquiry: Inquiry) => void;
  setDrawerOpen: (open: boolean) => void;
  setInquiryModalOpen: (open: boolean) => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  inquiries: [],
  isDrawerOpen: false,
  isInquiryModalOpen: false,
  setInquiries: (inquiries) => set({ inquiries }),
  addInquiry: (inquiry) =>
    set((state) => ({ inquiries: [inquiry, ...state.inquiries] })),
  setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  setInquiryModalOpen: (isInquiryModalOpen) => set({ isInquiryModalOpen }),
}));
