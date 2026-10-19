'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ServiceItem, ServiceDivision, Inquiry } from '@/types';
import { formatINR, formatSqFt, formatDate } from '@/lib/utils';
import { formatInquiryWhatsAppMessage, getWhatsAppUrl, ADMIN_WHATSAPP_NUMBER } from '@/lib/whatsapp';
import {
  Factory,
  Flame,
  Home,
  Plus,
  Edit2,
  Trash2,
  ClipboardList,
  Phone,
  Search,
  CheckCircle2,
  X,
  ArrowLeft,
  RefreshCw,
  LogOut,
  Layers,
  Settings,
  Key,
  Upload,
  Save,
  Check,
  AlertCircle,
  ImageIcon,
  Lock,
  UserCheck,
  Menu,
  Copy,
  MessageSquare,
  Send,
  Clock,
  MapPin,
  Building2,
  Ruler,
  DollarSign,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Views State
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'inquiries' | 'upload' | 'settings'>('services');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDiv, setFilterDiv] = useState<'all' | ServiceDivision>('all');

  // Dedicated Image Upload Center State
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; name: string; time: string }>>([
    { url: '/images/factory_tin_shed.jpg', name: 'factory_tin_shed.jpg', time: 'Initial' },
    { url: '/images/sport_academy_shed.jpg', name: 'sport_academy_shed.jpg', time: 'Initial' },
    { url: '/images/luxury_interior_work.jpg', name: 'luxury_interior_work.jpg', time: 'Initial' },
  ]);
  const [centerUploading, setCenterUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Settings & Password State
  const [settings, setSettings] = useState({
    banner_image: '/images/factory_tin_shed.jpg',
    phone: '9557323216',
    email: 'contact@royalproindustrial.com',
    company_name: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
    address: 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [settingsMsg, setSettingsMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingServiceImg, setUploadingServiceImg] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  // Service Modal state (Add or Edit) - Starting Rate removed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    division: 'welding_industrial' as ServiceDivision,
    tagline: '',
    description: '',
    imageUrl: '',
    materials: '',
    warranty: '',
  });

  // Check Auth on Mount
  useEffect(() => {
    const checkAuth = () => {
      const hasCookie = typeof document !== 'undefined' && document.cookie.includes('royalpro_admin_session');
      const hasStorage = typeof window !== 'undefined' && localStorage.getItem('royalpro_admin_logged_in') === 'true';
      if (hasCookie || hasStorage) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [srvRes, inqRes, setRes] = await Promise.all([
        fetch('/api/services', { cache: 'no-store' }),
        fetch('/api/inquiries', { cache: 'no-store' }),
        fetch('/api/admin/settings', { cache: 'no-store' }),
      ]);
      const srvData = await srvRes.json();
      const inqData = await inqRes.json();
      const setData = await setRes.json();

      if (srvData.success && srvData.data) setServices(srvData.data);
      if (inqData.success && inqData.data) setInquiries(inqData.data);
      if (setData.success && setData.data) setSettings((prev) => ({ ...prev, ...setData.data }));
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // Handle Login when logged out
  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('royalpro_admin_logged_in', 'true');
      }
      setIsAuthenticated(true);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Invalid username or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'royalpro_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('royalpro_admin_logged_in');
    }
    setIsAuthenticated(false);
  };

  // Handle Open Add Modal (No Starting Rate)
  const handleOpenAdd = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      division: 'welding_industrial',
      tagline: '',
      description: '',
      imageUrl: '/images/factory_tin_shed.jpg',
      materials: '',
      warranty: '',
    });
    setShowManualUrl(false);
    setIsModalOpen(true);
  };

  // Handle Open Edit Modal (No Starting Rate)
  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title,
      division: srv.division,
      tagline: srv.tagline || '',
      description: srv.description || '',
      imageUrl: srv.imageUrl || '',
      materials: srv.specs?.materials || '',
      warranty: srv.specs?.warranty || '',
    });
    setShowManualUrl(false);
    setIsModalOpen(true);
  };

  // Upload Service Image
  const handleUploadServiceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingServiceImg(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setServiceForm((prev) => ({ ...prev, imageUrl: data.url }));
        setUploadedImages((prev) => [
          { url: data.url, name: file.name, time: new Date().toLocaleTimeString() },
          ...prev,
        ]);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingServiceImg(false);
    }
  };

  // Upload from Dedicated Center
  const handleUploadCenterImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCenterUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setUploadedImages((prev) => [
          { url: data.url, name: file.name, time: new Date().toLocaleTimeString() },
          ...prev,
        ]);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setCenterUploading(false);
    }
  };

  // Copy Image Link
  const handleCopyLink = (url: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  // Save Service (Create or Update without starting rate)
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: serviceForm.title,
        division: serviceForm.division,
        tagline: serviceForm.tagline,
        description: serviceForm.description,
        startingRate: '',
        imageUrl: serviceForm.imageUrl,
        materials: serviceForm.materials,
        warranty: serviceForm.warranty,
      };

      if (editingService) {
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingService.id, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          loadData();
        } else {
          alert(data.error || 'Failed to update service');
        }
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          loadData();
        } else {
          alert(data.error || 'Failed to create service');
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving service');
    }
  };

  // Delete Service
  const handleDeleteService = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch {
      alert('Error deleting service');
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setPasswordMsg({ type: 'success', text: 'Password successfully changed!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMsg({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch {
      setPasswordMsg({ type: 'error', text: 'Network error updating password.' });
    }
  };

  // Upload Banner Image
  const handleUploadBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBanner(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setSettings((prev) => ({ ...prev, banner_image: data.url }));

        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ banner_image: data.url }),
        });

        setSettingsMsg({ type: 'success', text: 'New banner image uploaded and activated!' });
      } else {
        alert(data.error || 'Banner upload failed');
      }
    } catch (err) {
      console.error('Banner upload error:', err);
      alert('Banner upload failed.');
    } finally {
      setUploadingBanner(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMsg(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMsg({ type: 'success', text: 'Settings successfully updated!' });
      } else {
        setSettingsMsg({ type: 'error', text: data.error || 'Failed to save settings.' });
      }
    } catch {
      setSettingsMsg({ type: 'error', text: 'Error saving settings.' });
    }
  };

  // Handle Inquiry Status Update
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch {
      alert('Error updating inquiry status');
    }
  };

  // Handle Inquiry Deletion
  const handleDeleteInquiry = async (id: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete inquiry from "${clientName}"?`)) return;
    try {
      const res = await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } else {
        alert(data.error || 'Failed to delete inquiry');
      }
    } catch {
      alert('Error deleting inquiry');
    }
  };

  // Filter services
  const displayedServices = services
    .filter((s) => (filterDiv === 'all' ? true : s.division === filterDiv))
    .filter((s) => {
      if (!search.trim()) return true;
      return (
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      );
    });

  // -------------------------------------------------------------
  // VIEW 1: ADMIN LOGIN SCREEN (When Logged Out)
  // -------------------------------------------------------------
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
        <div className="w-full max-w-md">
          {/* Logo Only Header (As requested: "Sirf logo lgau okay") */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block p-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-xl mb-4 group" title="Royalpro Home">
              <img
                src="/images/royalpro_logo.png"
                alt="RP Golden Logo"
                className="w-24 h-24 rounded-full object-cover bg-slate-950 group-hover:scale-105 transition-transform"
              />
            </Link>
            <h1 className="text-2xl font-black font-royal text-slate-900 tracking-tight">
              Admin Portal Login
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Please enter your administrator credentials to manage services & inquiries
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            {loginError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleInlineLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In (Login)</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center text-xs">
              <Link href="/" className="text-slate-500 hover:text-amber-700 flex items-center gap-1 font-bold transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading Auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header with Toggle Bar (Only Logo) */}
      <div className="lg:hidden bg-slate-950 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" title="Royalpro Home">
          <img
            src="/images/royalpro_logo.png"
            alt="RP Golden Logo"
            className="w-10 h-10 rounded-full object-cover bg-slate-900 border border-amber-500/40"
          />
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-full bg-slate-800 text-slate-200 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside className={`w-full lg:w-72 bg-slate-950 text-slate-300 lg:min-h-screen flex flex-col justify-between p-5 border-r border-slate-800 shrink-0 sticky lg:top-0 z-30 transition-all ${
        mobileSidebarOpen ? 'block' : 'hidden lg:flex'
      }`}>
        <div>
          {/* Logo Only (Bada Sa Full Logo) */}
          <div className="flex items-center justify-center pb-5 border-b border-slate-800">
            <Link href="/" className="relative p-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-xl shadow-amber-500/20 block group" title="Royalpro Home">
              <img
                src="/images/royalpro_logo.png"
                alt="RP Golden Logo"
                className="w-24 h-24 rounded-full object-cover bg-slate-950 group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Sidebar Menu Items (MySQL Tables Tab Removed) */}
          <div className="mt-6 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 font-royal">
              Management Views
            </p>

            {/* Tab 1: Services Manager */}
            <button
              onClick={() => {
                setActiveTab('services');
                setMobileSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Services Manager</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'services' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {services.length}
              </span>
            </button>

            {/* Tab 2: Client Inquiries */}
            <button
              onClick={() => {
                setActiveTab('inquiries');
                setMobileSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ClipboardList className="w-4 h-4 text-indigo-400" />
                <span>Client Inquiries</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'inquiries' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {inquiries.length}
              </span>
            </button>

            {/* Tab 3: Dedicated Image Upload Center */}
            <button
              onClick={() => {
                setActiveTab('upload');
                setMobileSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Image Upload Center</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                New
              </span>
            </button>

            {/* Tab 4: Banner & Password Settings */}
            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-orange-400" />
                <span>Banner & Password</span>
              </div>
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 font-royal">
              Portal Shortcuts
            </p>

            <Link
              href="/"
              className="w-full py-2.5 px-3.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-2.5"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>View Website</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer with Logout Button */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-white">Administrator</p>
              <p className="text-[10px] text-slate-400">Active Session</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 transition-colors cursor-pointer border border-rose-500/20"
            title="Logout from Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-slate-50 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-lg font-black text-slate-900 font-royal uppercase">
              {activeTab === 'services' && 'Services Manager'}
              {activeTab === 'inquiries' && 'Client Inquiries & Quote Requests'}
              {activeTab === 'upload' && 'Image Upload Center'}
              {activeTab === 'settings' && 'Banner Image & Password Settings'}
            </h1>
            <p className="text-xs text-slate-500">
              Manage industrial factory tin shed & complete interior solutions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>

            {activeTab === 'services' && (
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Service
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 flex-1">

        {/* TAB 1: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex rounded-full bg-slate-100 p-1 gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setFilterDiv('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterDiv === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  All Services ({services.length})
                </button>
                <button
                  onClick={() => setFilterDiv('welding_industrial')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterDiv === 'welding_industrial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Welding Works
                </button>
                <button
                  onClick={() => setFilterDiv('interior_solution')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterDiv === 'interior_solution' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Services List
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search services by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Services Cards (No Starting Rate or Rupee displayed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    {srv.imageUrl && (
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
                        <img
                          src={srv.imageUrl}
                          alt={srv.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/factory_tin_shed.jpg';
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          srv.division === 'welding_industrial'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {srv.division === 'welding_industrial' ? 'Welding Work' : 'Services List'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 font-royal">{srv.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      ID: {srv.id.substring(0, 10)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="p-2 rounded-full text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id, srv.title)}
                        className="p-2 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-royal">
                  Client Inquiries & Quote Requests
                </h3>
                <p className="text-xs text-slate-500">
                  Live MySQL records synced with website forms & WhatsApp (Helpline: <strong className="text-amber-700">9557323216</strong>)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  Total Records: {inquiries.length}
                </span>
                <button
                  onClick={loadData}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  title="Refresh Inquiries"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <ClipboardList className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600">No client inquiries received yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    When visitors submit the quote or contact form on the website, they will appear here and on WhatsApp ({ADMIN_WHATSAPP_NUMBER}).
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => {
                  const clientWaUrl = getWhatsAppUrl(
                    `Hello ${inq.clientName}, Royalpro Industrial received your quote request for ${inq.serviceTitle}. We would like to discuss your requirements.`,
                    inq.phone
                  );
                  const forwardWaUrl = getWhatsAppUrl(
                    formatInquiryWhatsAppMessage(inq),
                    ADMIN_WHATSAPP_NUMBER
                  );

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-300 hover:shadow-sm transition-all space-y-3.5"
                    >
                      {/* Top Header: Client Name, Company, Status Badge & Time */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-black text-base text-slate-900 font-royal">
                            {inq.clientName}
                          </h4>
                          {inq.companyName && (
                            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                              {inq.companyName}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              inq.division === 'welding_industrial'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-indigo-100 text-indigo-900'
                            }`}
                          >
                            {inq.division === 'welding_industrial' ? 'Welding Shed' : 'Interior Solution'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : inq.status === 'quotation_sent'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {inq.status.replace('_', ' ')}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formatDate(inq.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Service Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                            Requested Service:
                          </span>
                          <span className="font-bold text-slate-900 block mt-0.5">
                            {inq.serviceTitle}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                            Dimensions & Area:
                          </span>
                          <span className="font-semibold text-slate-800 block mt-0.5">
                            {inq.plotLengthFeet && inq.plotWidthFeet
                              ? `${inq.plotLengthFeet} ft × ${inq.plotWidthFeet} ft (${inq.totalAreaSqFt || inq.plotLengthFeet * inq.plotWidthFeet} sq.ft)`
                              : inq.totalAreaSqFt
                              ? formatSqFt(inq.totalAreaSqFt)
                              : 'Site inspection required'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                            Estimated Budget:
                          </span>
                          <span className="font-black text-amber-700 block mt-0.5">
                            {inq.estimatedBudget ? formatINR(inq.estimatedBudget) : 'Pending quotation'}
                          </span>
                        </div>
                      </div>

                      {/* Contact & Location Strip */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-mono font-bold"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          {inq.phone}
                        </a>
                        {inq.email && (
                          <span className="text-slate-600 truncate">
                            📧 {inq.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {inq.location}
                        </span>
                      </div>

                      {/* Client Requirements Box */}
                      {inq.requirements && (
                        <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Client Notes / Requirements:
                          </span>
                          &quot;{inq.requirements}&quot;
                        </div>
                      )}

                      {/* Actions Toolbar */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                        {/* WhatsApp & Call Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={clientWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Chat with Client on WhatsApp
                          </a>

                          <a
                            href={forwardWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-700 shadow-sm active:scale-95 transition-all"
                            title="Forward complete inquiry details to official WhatsApp 9557323216"
                          >
                            <Send className="w-3.5 h-3.5 text-amber-400" />
                            Forward to 9557323216
                          </a>

                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs inline-flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-600" />
                            Call
                          </a>
                        </div>

                        {/* Status Toggle & Delete */}
                        <div className="flex items-center gap-1.5">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(inq.id, e.target.value as Inquiry['status'])
                            }
                            className="text-xs px-2.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-amber-500"
                          >
                            <option value="new">New</option>
                            <option value="quotation_sent">Quotation Sent</option>
                            <option value="closed">Closed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id, inq.clientName)}
                            className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DEDICATED IMAGE UPLOAD CENTER (image uplaod vala) */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-royal text-lg font-black text-slate-900">Upload New Images</h3>
                  <p className="text-xs text-slate-500">
                    Upload photos from your computer or phone. Uploaded images can be copied and used in services or banners.
                  </p>
                </div>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/60 rounded-3xl p-8 text-center transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleUploadCenterImage}
                  disabled={centerUploading}
                />

                {centerUploading ? (
                  <div className="py-6 flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="w-8 h-8 animate-spin text-amber-600" />
                    <span className="text-xs font-bold text-slate-800">Uploading photo to server...</span>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block font-royal">
                        Click or tap here to upload an image from your device
                      </span>
                      <span className="text-xs text-slate-500 block mt-1">
                        High Definition JPG, PNG, WEBP files supported
                      </span>
                    </div>
                    <span className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm mt-2 pointer-events-none">
                      Select Photo
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Uploaded Images Gallery */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h3 className="font-royal text-base font-bold text-slate-900 mb-4">
                Available & Recently Uploaded Images ({uploadedImages.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col justify-between">
                    <div className="relative w-full h-44 bg-slate-200">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-slate-800 truncate">{img.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono truncate mt-0.5">{img.url}</p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(img.url)}
                          className="w-full py-2 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          {copiedUrl === img.url ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-400" />
                              <span>Copy Image URL</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS, PASSWORD & BANNER MANAGEMENT */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* CARD 1: CHANGE ADMIN PASSWORD */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-royal text-lg font-black text-slate-900">Change Admin Password</h3>
                    <p className="text-xs text-slate-500">Update your dashboard security password</p>
                  </div>
                </div>

                {passwordMsg && (
                  <div
                    className={`p-3 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2 ${
                      passwordMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{passwordMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new strong password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-amber-500/20 transition-all cursor-pointer font-royal active:scale-98"
                  >
                    Save New Password
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Password is securely encrypted with <strong>bcrypt</strong> for safety.
              </div>
            </div>

            {/* CARD 2: UPLOAD & CHANGE WEBSITE BANNER */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-royal text-lg font-black text-slate-900">Upload Website Banner</h3>
                    <p className="text-xs text-slate-500">Change hero banner image anytime</p>
                  </div>
                </div>

                {settingsMsg && (
                  <div
                    className={`p-3 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2 ${
                      settingsMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{settingsMsg.text}</span>
                  </div>
                )}

                {/* Current Banner Preview */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Current Banner Image Preview
                  </label>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={settings.banner_image || '/images/factory_tin_shed.jpg'}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/factory_tin_shed.jpg';
                      }}
                    />
                    {uploadingBanner && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Uploading banner...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Upload File Button */}
                <div className="space-y-3">
                  <label className="w-full py-3 px-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingBanner ? 'Uploading...' : 'Choose & Upload New Banner Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadBanner}
                      disabled={uploadingBanner}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Uploaded banner is instantly applied to the live website.
              </div>
            </div>

            {/* CARD 3: EDIT COMPANY CONTACT DETAILS */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-royal text-lg font-black text-slate-900">Website Contact & Helpline Information</h3>
                  <p className="text-xs text-slate-500">Update company phone, email and address</p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Helpline Mobile Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-mono font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Company Header Name
                  </label>
                  <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Workshop & Facility Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="py-3 px-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-amber-500/20 transition-all cursor-pointer font-royal active:scale-98 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        </div>
      </div>

      {/* SERVICE MODAL (Add or Edit) - Starting Rate Removed & Image Upload Prominent */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-royal text-lg font-black text-slate-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <p className="text-xs text-slate-500">
                  Updates will immediately reflect on the live website.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Industrial Factory Tin Shed Work"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Division *
                </label>
                <select
                  value={serviceForm.division}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      division: e.target.value as ServiceDivision,
                    })
                  }
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="welding_industrial">Welding Work Services</option>
                  <option value="interior_solution">Services List</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  value={serviceForm.tagline}
                  onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                  placeholder="e.g. Structural Steel & Turnkey Execution"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Service Description
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, description: e.target.value })
                  }
                  placeholder="Describe the service execution, features and scope..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {/* IMAGE UPLOAD BOX (image uplaod vala) */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Service Image (Upload from Computer or Mobile)
                </label>

                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/60 rounded-2xl p-4 text-center transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleUploadServiceImage}
                    disabled={uploadingServiceImg}
                  />

                  {uploadingServiceImg ? (
                    <div className="py-4 flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
                      <span className="text-xs font-bold text-slate-700">Uploading photo...</span>
                    </div>
                  ) : serviceForm.imageUrl ? (
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src={serviceForm.imageUrl}
                          alt="Service Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Image Attached
                        </span>
                        <span className="text-xs text-slate-500 font-medium underline">
                          Click to choose different image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        Click here to select an image from your device
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Instant upload with live preview
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  >
                    {showManualUrl ? 'Hide manual image URL' : 'Or paste direct image URL'}
                  </button>
                </div>

                {showManualUrl && (
                  <input
                    type="text"
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                    placeholder="/images/factory_tin_shed.jpg"
                    className="w-full mt-1 px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-amber-500 font-mono"
                  />
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-full cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-full shadow-md shadow-amber-500/20 transition-all cursor-pointer font-royal active:scale-95"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
