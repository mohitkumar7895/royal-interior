'use client';

import React from 'react';
import { useInquiryStore } from '@/stores/useInquiryStore';
import { apiClient } from '@/lib/api-client';
import { useNotification } from '@/contexts/NotificationContext';
import { formatINR, formatSqFt, formatDate } from '@/lib/utils';
import { X, ClipboardList, MapPin, Phone, Clock, MessageSquare, Send } from 'lucide-react';
import { formatInquiryWhatsAppMessage, getWhatsAppUrl, ADMIN_WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { Inquiry } from '@/types';

export function InquiryAdminDrawer() {
  const { inquiries, isDrawerOpen, setDrawerOpen, setInquiries } = useInquiryStore();
  const { notify } = useNotification();

  if (!isDrawerOpen) return null;

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const updated = await apiClient.updateInquiryStatus(id, newStatus);
      setInquiries(
        inquiries.map((inq) => (inq.id === id ? { ...inq, status: updated.status } : inq))
      );
      notify({
        type: 'info',
        title: 'Status Updated',
        message: `Inquiry marked as ${newStatus}`,
      });
    } catch {
      notify({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not update status.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in text-slate-900">
      <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full flex flex-col justify-between p-6 shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <ClipboardList className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="text-base font-black text-slate-900">Client Inquiries (MySQL Synced)</h2>
                <p className="text-[11px] text-slate-500">
                  Real-time pipeline from Next.js Backend <code className="text-amber-700">/api/inquiries</code>
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inquiries list */}
          <div className="mt-4 space-y-3.5 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
            {inquiries.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <ClipboardList className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold text-slate-600">No inquiries yet</p>
                <p className="text-xs mt-1">Submit a quotation request from the form.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{inq.clientName}</h4>
                      {inq.companyName && (
                        <p className="text-xs text-amber-700 font-semibold">{inq.companyName}</p>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        inq.status === 'new'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : inq.status === 'quotation_sent'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {inq.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <a
                      href={`tel:${inq.phone}`}
                      className="flex items-center gap-1.5 hover:text-amber-700 font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-mono">{inq.phone}</span>
                    </a>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{inq.location}</span>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block">Division:</span>
                      <span className="font-semibold text-slate-800">
                        {inq.division === 'welding_industrial' ? 'All Welding Work' : 'Interior Solution'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Requested Service:</span>
                      <span className="font-bold text-amber-700 truncate block">
                        {inq.serviceTitle}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Area / Dimensions:</span>
                      <span className="font-semibold text-slate-800">
                        {inq.totalAreaSqFt ? formatSqFt(inq.totalAreaSqFt) : 'On Site Check'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Budget:</span>
                      <span className="font-bold text-slate-900">
                        {inq.estimatedBudget ? formatINR(inq.estimatedBudget) : 'Pending Quote'}
                      </span>
                    </div>
                  </div>

                  {inq.requirements && (
                    <p className="text-[11px] text-slate-600 italic">
                      &quot;{inq.requirements}&quot;
                    </p>
                  )}

                  {/* WhatsApp & Call Direct Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={getWhatsAppUrl(
                        `Hello ${inq.clientName}, Royalpro Industrial received your quote request for ${inq.serviceTitle}. We would like to discuss your site dimensions & requirements.`,
                        inq.phone
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] inline-flex items-center gap-1 shadow-2xs"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Chat on WhatsApp
                    </a>

                    <a
                      href={getWhatsAppUrl(formatInquiryWhatsAppMessage(inq), ADMIN_WHATSAPP_NUMBER)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-[10px] inline-flex items-center gap-1 border border-slate-700"
                      title="Send this inquiry to Royalpro WhatsApp (9557323216)"
                    >
                      <Send className="w-3 h-3 text-emerald-400" />
                      Forward to 9557323216
                    </a>
                  </div>

                  {/* Action status toggle */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(inq.createdAt)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStatusChange(inq.id, 'quotation_sent')}
                        className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                      >
                        Mark Quote Sent
                      </button>
                      <button
                        onClick={() => handleStatusChange(inq.id, 'closed')}
                        className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            Royalpro Industrial Factory Tin Shed Work & Interior Solution • MySQL Synced
          </p>
        </div>
      </div>
    </div>
  );
}
