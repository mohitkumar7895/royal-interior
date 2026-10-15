'use client';

import React, { useState, useEffect } from 'react';
import { Database, Server, Table, RefreshCw, X, CheckCircle, ExternalLink, Search, Shield, Layers, FileText } from 'lucide-react';

interface ColumnInfo {
  field: string;
  type: string;
  null: string;
  key: string;
  default: string | null;
  extra: string;
}

interface TableInfo {
  tableName: string;
  rowCount: number;
  columns: ColumnInfo[];
  sampleRows: Record<string, unknown>[];
}

interface DatabaseData {
  databaseName: string;
  isConnected: boolean;
  host: string;
  port: number;
  tables: TableInfo[];
}

interface DatabaseTablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DatabaseTablesModal({ isOpen, onClose }: DatabaseTablesModalProps) {
  const [data, setData] = useState<DatabaseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState<string>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'rows' | 'schema'>('rows');

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tables');
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error('Failed to load table inspector:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTables();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTable = data?.tables.find((t) => t.tableName === activeTable) || data?.tables[0];

  const filteredRows = currentTable?.sampleRows.filter((row) => {
    if (!searchQuery.trim()) return true;
    return Object.values(row).some((val) =>
      String(val || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex items-center justify-between border-b border-slate-700/60">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-black tracking-tight text-white uppercase font-serif">
                  MySQL Database: <span className="text-amber-400 font-mono">royalpro_db</span>
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {data?.isConnected ? 'Active & Live Connected' : 'Ready (Simulation Fallback)'}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                <span>Host: <strong className="text-white font-mono">{data?.host || 'localhost'}:{data?.port || 3306}</strong></span>
                <span>•</span>
                <span>Database: <strong className="text-amber-300 font-mono">royalpro_db</strong></span>
                <span>•</span>
                <span>phpMyAdmin Compatible</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=royalpro_db"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
              title="Open phpMyAdmin in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open phpMyAdmin</span>
            </a>

            <button
              onClick={fetchTables}
              disabled={loading}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Refresh Tables"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Table Selector Tabs */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Tables:</span>
            {data?.tables.map((t) => (
              <button
                key={t.tableName}
                onClick={() => {
                  setActiveTable(t.tableName);
                  setSearchQuery('');
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTable === t.tableName
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="font-mono">{t.tableName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    activeTable === t.tableName ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t.rowCount} rows
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-200 p-0.5 border border-slate-300 text-xs">
              <button
                onClick={() => setActiveTab('rows')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'rows' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Data Rows ({currentTable?.rowCount || 0})
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'schema' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table Schema ({currentTable?.columns.length || 0} cols)
              </button>
            </div>

            {activeTab === 'rows' && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${activeTable}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-44 sm:w-56"
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Body / Table View */}
        <div className="flex-1 overflow-auto p-6 bg-slate-50">
          {loading && !data ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mb-3" />
              <p className="text-sm font-semibold">Connecting to MySQL `royalpro_db`...</p>
            </div>
          ) : activeTab === 'schema' ? (
            /* SCHEMA VIEW */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  Structure & Schema for: <span className="font-mono text-amber-700 font-bold">{activeTable}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Engine: InnoDB • Collation: utf8mb4_unicode_ci
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-4">Field Name</th>
                      <th className="py-2.5 px-4">Data Type</th>
                      <th className="py-2.5 px-4">Null</th>
                      <th className="py-2.5 px-4">Key</th>
                      <th className="py-2.5 px-4">Default</th>
                      <th className="py-2.5 px-4">Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {currentTable?.columns.map((c) => (
                      <tr key={c.field} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                          {c.key === 'PRI' && <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded font-sans font-bold">PK</span>}
                          {c.key === 'UNI' && <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1 rounded font-sans font-bold">UK</span>}
                          {c.field}
                        </td>
                        <td className="py-2.5 px-4 text-indigo-700 font-semibold">{c.type}</td>
                        <td className="py-2.5 px-4 text-slate-500">{c.null}</td>
                        <td className="py-2.5 px-4 text-amber-700 font-bold">{c.key || '-'}</td>
                        <td className="py-2.5 px-4 text-slate-500">{c.default === null ? 'NULL' : String(c.default)}</td>
                        <td className="py-2.5 px-4 text-slate-400">{c.extra || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* ROWS DATA VIEW */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    Table Records: <span className="font-mono text-amber-700 font-bold">{activeTable}</span>
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                    Showing {filteredRows.length} of {currentTable?.rowCount || 0}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Click any cell to copy or inspect
                </span>
              </div>

              {filteredRows.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">
                  No records match your search query in table <span className="font-mono">{activeTable}</span>.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-700 font-bold shadow-2xs">
                      <tr>
                        {currentTable?.columns.map((c) => (
                          <th key={c.field} className="py-2.5 px-3 whitespace-nowrap">
                            {c.field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                          {currentTable?.columns.map((col) => {
                            const val = row[col.field];
                            const isImage = col.field === 'image_url' && val;
                            const isStatus = col.field === 'status' || col.field === 'is_active';

                            return (
                              <td key={col.field} className="py-2.5 px-3 max-w-xs truncate text-slate-800">
                                {isImage ? (
                                  <div className="flex items-center gap-2">
                                    {/* Thumbnail Preview */}
                                    <img
                                      src={String(val)}
                                      alt="preview"
                                      className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                                      onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                      }}
                                    />
                                    <span className="font-mono text-[11px] text-slate-500 truncate max-w-[120px]">
                                      {String(val)}
                                    </span>
                                  </div>
                                ) : isStatus ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                                    {String(val)}
                                  </span>
                                ) : typeof val === 'object' && val !== null ? (
                                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                                    {JSON.stringify(val).slice(0, 35)}...
                                  </span>
                                ) : (
                                  <span className="font-mono text-[11px]">
                                    {val === null || val === undefined ? (
                                      <span className="text-slate-300 italic">NULL</span>
                                    ) : (
                                      String(val)
                                    )}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Database: <strong className="text-slate-900 font-mono">royalpro_db</strong> on localhost:3306</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Close Table Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
