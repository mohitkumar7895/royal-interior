'use client';

import React from 'react';
import { useEstimatorStore } from '@/stores/useEstimatorStore';
import { RoofingSheetType } from '@/types';
import { formatINR, formatSqFt } from '@/lib/utils';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Layers, DollarSign } from 'lucide-react';

interface ShedCostEstimatorProps {
  onPreFillInquiry: () => void;
}

export function ShedCostEstimator({ onPreFillInquiry }: ShedCostEstimatorProps) {
  const { lengthFeet, widthFeet, heightFeet, roofType, calculation, setDimensions, setRoofType } =
    useEstimatorStore();

  const roofingOptions: { id: RoofingSheetType; title: string; desc: string }[] = [
    {
      id: 'color_coated_galvalume',
      title: 'Galvalume Color Coated',
      desc: '0.50mm high tensile AZ-150 alloy, corrosion-resistant & premium aesthetics.',
    },
    {
      id: 'gi_corrugated_tin',
      title: 'Heavy GI Tin Corrugated',
      desc: 'Traditional galvanized zinc coated tin sheet, rugged & cost-effective.',
    },
    {
      id: 'insulated_sandwich_panel',
      title: 'Insulated PUF Panel',
      desc: 'Thermal & sound insulated sandwich panel for temperature-controlled units.',
    },
    {
      id: 'polycarbonate_transparent',
      title: 'Daylight Polycarbonate',
      desc: 'High impact UV-coated daylight translucent panels for 100% natural factory lighting.',
    },
  ];

  return (
    <div id="shed-estimator" className="my-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            Live Engineering Estimation
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Industrial Shed & Tin Roofing Cost Estimator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time material estimation based on live steel rates and industrial roofing standards.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Real-time calculation formula</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls: Dimensions & Roofing Selection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            1. Enter Plot Dimensions (in Feet)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Length */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Length (Feet)
              </label>
              <input
                type="number"
                min="20"
                max="1000"
                value={lengthFeet}
                onChange={(e) =>
                  setDimensions(Number(e.target.value) || 0, widthFeet, heightFeet)
                }
                className="w-full text-lg font-black bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">e.g. 100 ft length</span>
            </div>

            {/* Width */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Clear Width (Feet)
              </label>
              <input
                type="number"
                min="15"
                max="300"
                value={widthFeet}
                onChange={(e) =>
                  setDimensions(lengthFeet, Number(e.target.value) || 0, heightFeet)
                }
                className="w-full text-lg font-black bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">e.g. 50 ft span</span>
            </div>

            {/* Height */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Eave Height (Feet)
              </label>
              <input
                type="number"
                min="12"
                max="60"
                value={heightFeet}
                onChange={(e) =>
                  setDimensions(lengthFeet, widthFeet, Number(e.target.value) || 0)
                }
                className="w-full text-lg font-black bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">e.g. 22 ft height</span>
            </div>
          </div>

          {/* Roofing Material Selector */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              2. Select Tin / Roofing Sheet Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roofingOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRoofType(opt.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    roofType === opt.id
                      ? 'bg-amber-50 border-amber-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{opt.title}</span>
                    {roofType === opt.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output: Estimation Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                Live Cost Breakdown
              </span>
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                {formatSqFt(calculation.floorAreaSqFt)}
              </span>
            </div>

            {/* Total Estimated Cost */}
            <div className="mb-6 pb-6 border-b border-slate-800">
              <span className="text-xs text-slate-400">Total Approx Cost (Materials + Erection)</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                {formatINR(calculation.totalEstimatedCost)}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Approx Rate: <strong className="text-white">₹{calculation.pricePerSqFt} / sq.ft.</strong>
              </div>
            </div>

            {/* Itemized Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-slate-300">Structural Steel Framework:</span>
                <span className="font-bold text-white">{formatINR(calculation.steelStructureCost)}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-slate-300">Tin / Profile Roofing Sheets ({calculation.roofAreaSqFt} sq.ft.):</span>
                <span className="font-bold text-white">{formatINR(calculation.roofingSheetCost)}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-slate-300">Civil Anchors & Erection Labor:</span>
                <span className="font-bold text-white">{formatINR(calculation.erectionCivilCost)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Includes site visit, structural drawings & certified installation.</span>
            </div>
          </div>

          <button
            onClick={onPreFillInquiry}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            Lock This Estimate & Get Site Visit
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
