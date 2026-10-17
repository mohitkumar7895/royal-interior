'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import { apiClient } from '@/lib/api-client';

export default function ContactPage() {
  const { notify } = useNotification();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    division: 'welding_industrial',
    location: '',
    requirements: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.phone) {
      notify({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide at least your Name and Phone Number.',
      });
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.submitInquiry({
        clientName: form.clientName,
        phone: form.phone,
        email: form.email,
        division: form.division as any,
        serviceTitle: 'General Direct Contact Request',
        location: form.location,
        requirements: form.requirements,
      });

      setSubmitted(true);
      notify({
        type: 'success',
        title: 'Contact Request Received',
        message: 'Our project engineer will contact you shortly on ' + form.phone,
      });
    } catch (err: any) {
      notify({
        type: 'error',
        title: 'Submission Failed',
        message: err.message || 'Error submitting contact form',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => {}} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">Contact Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Helpline & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Immediate On-Site Support
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-royal text-slate-900 tracking-tight">
                Get In Touch With Royalpro Engineers
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with our master fabricators and architectural designers for free site survey, shed structural drawing, and turnkey interior estimates.
              </p>
            </div>

            {/* Direct Calling & WhatsApp Cards */}
            <div className="space-y-3">
              <a
                href="tel:9557323216"
                className="p-5 rounded-2xl bg-white border border-amber-300 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block font-royal">
                    Direct Mobile & Calling
                  </span>
                  <span className="text-lg font-black text-slate-950 font-mono">9557323216</span>
                  <span className="text-[11px] text-slate-500 block">Available 24/7 for industrial emergencies</span>
                </div>
              </a>

              <a
                href="https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20am%20looking%20for%20industrial%20shed%20or%20interior%20work"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block font-royal">
                    Instant WhatsApp Chat
                  </span>
                  <span className="text-base font-black text-white">Click To Chat on 9557323216</span>
                  <span className="text-[11px] text-emerald-100 block">Send drawings, photos & site measurements</span>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Email Helpline
                  </span>
                  <span className="text-sm font-bold text-slate-900">contact@royalproindustrial.com</span>
                  <span className="text-[11px] text-slate-500 block">Official engineering & billing inquiries</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Plant & Workshop Facility
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-snug">
                    Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009
                  </span>
                  <span className="text-[11px] text-slate-500 block">Delhi NCR • Ghaziabad • Noida • Uttar Pradesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Site Survey Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold font-royal text-slate-900 mb-1">
                Book a Free On-Site Inspection
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill the details below and an engineer will call you back within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-900 font-royal">Thank You! Request Received</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    We have logged your inspection request in our database. Our technical team is reviewing your requirements and will connect via <strong>{form.phone}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        clientName: '',
                        phone: '',
                        email: '',
                        division: 'welding_industrial',
                        location: '',
                        requirements: '',
                      });
                    }}
                    className="inline-flex px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.clientName}
                        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. info@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service Type *</label>
                      <select
                        value={form.division}
                        onChange={(e) => setForm({ ...form, division: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium bg-white"
                      >
                        <option value="welding_industrial">Welding Work Services (Factory Tin Sheds / Heavy Steel)</option>
                        <option value="interior_solution">Services List (Office / Luxury Home / Shop Interiors)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Site Location / City</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Faridabad, Manesar, Greater Noida, Sonipat"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Requirements & Details</label>
                    <textarea
                      rows={4}
                      value={form.requirements}
                      onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder="Mention plot size, shed height, office seating, or modular kitchen details..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Request for Free Survey'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
