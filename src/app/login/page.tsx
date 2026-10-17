'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('royalpro_admin_logged_in', 'true');
      }

      router.push('/admin');
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Big Full Royalpro Logo */}
        <Link href="/" className="inline-block p-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-xl mb-4 group" title="Royalpro Home">
          <img
            src="/images/royalpro_logo.png"
            alt="Royalpro Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-slate-950 group-hover:scale-105 transition-transform"
          />
        </Link>
        <h1 className="text-2xl font-black font-royal text-slate-900 tracking-tight">
          Admin Portal Login
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Authorized access to manage services, client inquiries & banner
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200 sm:px-10">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 font-royal">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to enter the Royalpro management dashboard.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 space-y-0.5">
              <p className="font-bold flex items-center gap-1 text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Default Admin Credentials:
              </p>
              <p>Username: <code className="font-mono font-bold">admin</code> | Password: <code className="font-mono font-bold">admin123</code></p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer font-royal"
            >
              {loginLoading ? (
                'Signing In...'
              ) : (
                <>
                  Sign In to Admin Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500">
            <Link href="/" className="hover:text-amber-700 font-bold flex items-center gap-1 transition-colors">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
