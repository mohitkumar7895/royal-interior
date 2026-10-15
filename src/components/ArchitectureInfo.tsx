'use client';

import React from 'react';
import { Layers, Database, Boxes, Code2, Cpu, Globe } from 'lucide-react';

export function ArchitectureInfo() {
  const modules = [
    {
      title: 'types/',
      tag: 'TypeScript Core',
      desc: 'Shared interfaces for Project, ServiceItem, Inquiry, ShedCalculation, and AdminUser.',
      icon: Code2,
      color: 'bg-blue-50/70 border-blue-200 text-blue-700',
    },
    {
      title: 'models/',
      tag: 'Data & Validation',
      desc: 'InquiryModel (phone & dimension validation) and ShedEstimatorModel (real-time steel cost calculations).',
      icon: Cpu,
      color: 'bg-purple-50/70 border-purple-200 text-purple-700',
    },
    {
      title: 'lib/',
      tag: 'MySQL & Backend',
      desc: 'MySQL pool (mysql.ts), schema.sql, RoyalProDatabase singleton with CRUD & fallback.',
      icon: Database,
      color: 'bg-emerald-50/70 border-emerald-200 text-emerald-700',
    },
    {
      title: 'stores/',
      tag: 'Zustand State',
      desc: 'useEstimatorStore (live interactive shed cost calculator) and useInquiryStore (quote inquiries management).',
      icon: Boxes,
      color: 'bg-amber-50/70 border-amber-200 text-amber-700',
    },
    {
      title: 'app/admin/',
      tag: 'Admin Dashboard',
      desc: 'Admin Register, Login, and full CRUD dashboard to Add, Edit & Delete Services into MySQL database.',
      icon: Layers,
      color: 'bg-rose-50/70 border-rose-200 text-rose-700',
    },
    {
      title: 'app/api/',
      tag: 'Backend Routes',
      desc: 'Fullstack Next.js API endpoints (/api/services, /api/inquiries, /api/admin/services) connected to MySQL.',
      icon: Globe,
      color: 'bg-indigo-50/70 border-indigo-200 text-indigo-700',
    },
  ];

  return (
    <div className="my-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            RoyalPro Fullstack Code Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete mixed Next.js structure: lib, models, contexts, stores, types, admin & MySQL database
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold self-start sm:self-auto">
          ● MySQL / phpMyAdmin Connected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className={`p-4 rounded-2xl border ${m.color} transition-all duration-200 hover:shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-slate-700" />
                  {m.title}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {m.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
