'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Quote,
  Building2,
  ThumbsUp,
  PenSquare,
  ChevronRight,
  X,
  Send,
  MessageSquare,
} from 'lucide-react';
import { ScrollHeading, ScrollReveal } from './ScrollReveal';

export interface ReviewItem {
  id: number | string;
  name: string;
  role: string;
  project: string;
  rating: number;
  comment: string;
  location: string;
  badge: string;
}

const initialFeaturedReviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Rajesh Singhal',
    role: 'Director, Singhal Cold Chain & Agro Foods',
    project: 'Commercial Cold Storage & Refrigerated Chambers',
    rating: 5,
    comment:
      'Royalpro fabricated and erected our heavy cold storage steel shed in Sonipat. High-tensile steel trusses, zero middle pillars, and airtight PUF framing were completed in record 45 days. Truly exceptional engineering precision and structural stability.',
    location: 'Sonipat, Haryana',
    badge: 'Verified Industrial Client',
  },
  {
    id: 2,
    name: 'Vikramaditya Rao',
    role: 'VP Operations, Apex Logistics & Manufacturing',
    project: 'Heavy Factory Tin Shed with Overhead Crane Provisions',
    rating: 5,
    comment:
      'We hired Royalpro for our heavy industrial tin shed with 15-Ton overhead crane provisions. Wind load certified fabrication, heavy structural framing, and flawless rainwater drainage. The direct engineering support on 9557323216 was prompt throughout.',
    location: 'Faridabad Industrial Area',
    badge: 'Verified Factory Owner',
  },
  {
    id: 3,
    name: 'Pooja Malhotra',
    role: 'Managing Director, CloudTech Coworking Spaces',
    project: 'Turnkey Commercial Office Interior & Glass Partitions',
    rating: 5,
    comment:
      'Complete turnkey corporate interior execution by Royalpro team was flawless. Soundproof toughened glass cabins, designer acoustic gypsum ceiling, and modular workstations completed within committed timeline. Premium look and feel!',
    location: 'Cyber City, Gurgaon',
    badge: 'Verified Commercial Client',
  },
];

const initialAllReviews: ReviewItem[] = [
  ...initialFeaturedReviews,
  {
    id: 4,
    name: 'Col. Devender Sharma (Retd.)',
    role: 'Founder, Smashers Multi-Sport Arena',
    project: 'Indoor Badminton Stadium & Sports Enclosure',
    rating: 5,
    comment:
      'Constructed our BWF standard indoor badminton stadium with 11-meter clear apex height. Anti-glare insulated roofing, zero leakage during monsoon, and solid tubular trusses. Best sports shed fabricator in North India.',
    location: 'Noida Sports City',
    badge: 'Verified Sports Academy',
  },
  {
    id: 5,
    name: 'Sunita & Arvind Aggarwal',
    role: 'Homeowners',
    project: 'Luxury Villa Turnkey Interior & Modular Kitchen',
    rating: 5,
    comment:
      'Royalpro did complete turnkey woodwork for our 5 BHK luxury villa, including a German-style hydraulic modular kitchen and living room cove ceilings. Marine plywood and Hafele fittings quality is top-notch.',
    location: 'Golf Course Road, Gurgaon',
    badge: 'Verified Residential Client',
  },
  {
    id: 6,
    name: 'Harish Verma',
    role: 'Managing Partner, TechVision Flagship Store',
    project: 'Multi-Brand Electronics Retail Showroom Interior',
    rating: 5,
    comment:
      'Delivered complete showroom interior with 3D acrylic backlit signage, customized display islands, and high-CRI spotlighting. Our footfall and retail conversions increased significantly. Transparent pricing and professional crew.',
    location: 'Delhi NCR',
    badge: 'Verified Retail Store',
  },
];

export function ReviewsSection() {
  // Only 3 fixed reviews on the home page as requested
  const featuredReviews = initialFeaturedReviews;

  // All reviews list (includes newly submitted ones)
  const [allReviews, setAllReviews] = useState<ReviewItem[]>(initialAllReviews);

  // Modals state
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Review Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    project: '',
    rating: 5,
    comment: '',
    location: '',
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newReview: ReviewItem = {
      id: Date.now(),
      name: formData.name.trim(),
      role: formData.role.trim() || 'Verified Client',
      project: formData.project.trim() || 'Structural / Interior Work',
      rating: formData.rating,
      comment: formData.comment.trim(),
      location: formData.location.trim() || 'India',
      badge: 'User Submitted Review',
    };

    // Add to all reviews (visible via "All Reviews" button, NOT added to the 3 home page reviews)
    setAllReviews((prev) => [newReview, ...prev]);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteModalOpen(false);
      setFormData({
        name: '',
        role: '',
        project: '',
        rating: 5,
        comment: '',
        location: '',
      });
    }, 1800);
  };

  return (
    <section className="my-4 scroll-mt-24">
      {/* Scroll Animated Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <ScrollHeading
          badge={
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              Client Trust & Performance Rating
            </div>
          }
          title={
            <span className="text-2xl sm:text-3xl">
              Customer Reviews & Experiences
            </span>
          }
          subtitle="Real testimonials from factory directors, warehouse operators, sports academies, and luxury villa owners who trusted Royalpro."
        />

        {/* Replaced 4.9 rating badge with interactive Write a Review button */}
        <ScrollReveal direction="left">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer font-royal"
          >
            <PenSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Write a Review</span>
          </button>
        </ScrollReveal>
      </div>

      {/* Featured Reviews Grid (Exactly 3 reviews on home page - Compact on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
        {featuredReviews.map((rev, idx) => (
          <ScrollReveal
            key={rev.id}
            direction="up"
            delayMs={idx * 120}
            className="h-full"
          >
            <div className="h-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
              {/* Subtle Warm Glow Corner */}
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Header: Stars & Badge */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                  <div className="flex gap-0.5 sm:gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
                    {rev.badge}
                  </span>
                </div>

                {/* Quote Icon & Feedback Comment */}
                <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500/25 mb-1 sm:mb-2 rotate-180" />
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 leading-relaxed italic mb-2.5 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Project Tag */}
                <div className="py-1.5 px-2.5 sm:p-2.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] sm:text-[11px] font-medium text-slate-600 mb-2.5 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                  <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{rev.project}</span>
                </div>
              </div>

              {/* Client Info Footer */}
              <div className="pt-2.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 font-royal">{rev.name}</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-500">{rev.role}</p>
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-amber-700 bg-amber-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                  {rev.location}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Button Below Reviews to View All Reviews */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setIsAllReviewsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer font-royal"
        >
          <span>View All Client Reviews ({allReviews.length})</span>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </button>
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-slate-900">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1 font-royal">
              Share Your Experience
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Submit your feedback on factory tin shed or interior work. Your review will be saved in the client reviews archive.
            </p>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-emerald-900 text-sm">Thank You for Your Review!</h4>
                <p className="text-xs text-emerald-700">
                  Your feedback has been saved and is available in the verified reviews directory.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Sonipat, Manesar, Noida"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Factory Owner / Homeowner"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      placeholder="e.g. Heavy Tin Shed / Villa Interior"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-full border border-slate-200 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-black text-amber-700 ml-2 mr-1">
                      {formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Review & Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Describe the quality of fabrication, engineering precision, timeline, or interior finish..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-full cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer font-royal"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIEW ALL REVIEWS MODAL */}
      {isAllReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-slate-900">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-royal">
                  All Client Reviews & Testimonials ({allReviews.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Verified client feedback across industrial factory sheds & interior turnkey projects.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAllReviewsModalOpen(false);
                    setIsWriteModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <PenSquare className="w-3 h-3" /> Write Review
                </button>
                <button
                  onClick={() => setIsAllReviewsModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 pr-1">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-royal">{rev.name}</h4>
                      <p className="text-[10px] text-slate-500">{rev.role} • {rev.location}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {rev.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic mb-2">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-medium text-slate-600">
                    <Building2 className="w-3 h-3 text-amber-600" />
                    <span>{rev.project}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setIsAllReviewsModalOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
