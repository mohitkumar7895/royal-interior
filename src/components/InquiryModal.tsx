'use client';

import React, { useState, useEffect } from 'react';
import { InquiryInput, InquiryModel } from '@/models/inquiry.model';
import { apiClient } from '@/lib/api-client';
import { useInquiryStore } from '@/stores/useInquiryStore';
import { useNotification } from '@/contexts/NotificationContext';
import { ServiceItem, ServiceDivision } from '@/types';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { X, Send, AlertCircle, Phone, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: ServiceItem | null;
}

export function InquiryModal({ isOpen, onClose, preSelectedService }: InquiryModalProps) {
  const { addInquiry } = useInquiryStore();
  const { notify } = useNotification();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [division, setDivision] = useState<ServiceDivision>(
    preSelectedService?.division || 'welding_industrial'
  );

  const [formData, setFormData] = useState<InquiryInput>({
    clientName: '',
    companyName: '',
    phone: '',
    email: '',
    division: preSelectedService?.division || 'welding_industrial',
    serviceTitle: preSelectedService?.title || weldingServices[0].title,
    plotLengthFeet: undefined,
    plotWidthFeet: undefined,
    shedHeightFeet: undefined,
    totalAreaSqFt: undefined,
    estimatedBudget: undefined,
    location: '',
    requirements: '',
  });

  useEffect(() => {
    if (preSelectedService) {
      setDivision(preSelectedService.division);
      setFormData((prev) => ({
        ...prev,
        division: preSelectedService.division,
        serviceTitle: preSelectedService.title,
      }));
    }
  }, [preSelectedService]);

  const currentServicesList =
    division === 'welding_industrial' ? weldingServices : interiorServices;

  const handleDivisionChange = (newDiv: ServiceDivision) => {
    setDivision(newDiv);
    const firstService =
      newDiv === 'welding_industrial' ? weldingServices[0].title : interiorServices[0].title;
    setFormData((prev) => ({
      ...prev,
      division: newDiv,
      serviceTitle: firstService,
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = InquiryModel.validate(formData);
    if (!validation.isValid) {
      setFormError(validation.errors.join(', '));
      return;
    }

    try {
      setLoading(true);
      const createdInquiry = await apiClient.submitInquiry(formData);
      addInquiry(createdInquiry);

      notify({
        type: 'success',
        title: 'Inquiry Submitted Successfully!',
        message: `Thank you ${formData.clientName}. Our engineering supervisor will call you on ${formData.phone} shortly.`,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setFormError(msg);
      notify({
        type: 'error',
        title: 'Submission Error',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-slate-900">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 px-2.5 py-1 rounded bg-amber-50 border border-amber-200">
            Instant Quotation & Site Visit
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Book Service / Request Quotation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Direct Helpline: <strong className="text-amber-600">9557323216</strong> • Free on-site survey & estimate
          </p>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Division Selector Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Select Service Category:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => handleDivisionChange('welding_industrial')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  division === 'welding_industrial'
                    ? 'bg-amber-500 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Welding Work (15)
              </button>
              <button
                type="button"
                onClick={() => handleDivisionChange('interior_solution')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  division === 'interior_solution'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Complete Interior (17)
              </button>
            </div>
          </div>

          {/* Specific Service Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Select Specific Work / Service *
            </label>
            <select
              value={formData.serviceTitle}
              onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
              className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900 font-medium"
            >
              {currentServicesList.map((srv) => (
                <option key={srv.id} value={srv.title}>
                  #{srv.number} {srv.title}
                </option>
              ))}
            </select>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Ramesh Patel"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9557323216"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Site Location & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Site Location / City *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Industrial Area / Home Address"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Company / Shop Name (Optional)
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Royal Industries"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
              />
            </div>
          </div>

          {/* Optional Approx Area in Sq Ft */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Approx Area (Sq. Ft.)
              </label>
              <input
                type="number"
                min="10"
                value={formData.totalAreaSqFt || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalAreaSqFt: Number(e.target.value) || undefined,
                  })
                }
                placeholder="e.g. 2500"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Expected Budget (₹)
              </label>
              <input
                type="number"
                min="1000"
                value={formData.estimatedBudget || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedBudget: Number(e.target.value) || undefined,
                  })
                }
                placeholder="e.g. 150000"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Project Description / Specific Requirements
            </label>
            <textarea
              rows={2}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Tell us what you need (e.g. tin shed height, wooden flooring, modular kitchen layout)..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <a
              href="tel:9557323216"
              className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:underline font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" /> Call 9557323216
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-xs font-black rounded-full text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 transition-all shadow-md shadow-amber-500/25 flex items-center gap-2"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
