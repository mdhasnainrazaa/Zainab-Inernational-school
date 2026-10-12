import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import Logo from '../../assets/Logo';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowLogoutModal(false);
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Admission Inquiries (CRM)', path: '/admin/enquiries', icon: Users, badge: 'Active' },
    { name: 'Notice Board & Alerts', path: '/admin/notices', icon: Bell, badge: 'Live' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* 2. Left Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-zips-green-950 text-white flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } border-r border-zips-gold-500/20`}
      >
        <div>
          {/* Logo & Portal Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin/dashboard" className="block">
              <div className="flex items-center gap-2">
                <img src="/zip-logo.png" alt="ZIPS Logo" className="h-10 w-auto object-contain flex-shrink-0 drop-shadow-sm" />
                <div>
                  <h2 className="font-sans font-bold text-sm tracking-wide text-white">ZIPS Admin</h2>
                  <p className="text-[10px] text-zips-gold-400 font-medium">Management CMS</p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="px-5 py-3 bg-white/5 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zips-gold-600 text-zips-green-950 flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <div className="flex items-center gap-1 text-[10px] text-zips-gold-400 font-medium">
                <Shield className="w-3 h-3" />
                <span>{user?.role || 'SUPER_ADMIN'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zips-green-800 text-zips-gold-400 font-semibold border-l-4 border-zips-gold-400 shadow-sm'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-zips-gold-400' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zips-gold-500/20 text-zips-gold-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action Items */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-zips-gold-400" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-red-300 hover:text-white hover:bg-red-950/60 border border-transparent hover:border-red-500/30 transition-all cursor-pointer font-medium"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-sans font-bold text-zips-green-950">
              ZIPS Institutional Control Centre
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zips-green-900 bg-zips-green-50 hover:bg-zips-green-100 border border-zips-green-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zips-green-800" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* 4. Beautiful Centered Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-7 relative overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500"></div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100/80 border border-red-200 flex items-center justify-center flex-shrink-0 text-red-600 shadow-inner">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Confirm Sign Out
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Are you sure you want to end your administrative session? You will need to enter your credentials again to log back in.
                </p>
              </div>
            </div>

            {/* Current user badge */}
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-zips-green-900 text-zips-gold-400 flex items-center justify-center text-[10px] font-bold">
                  {user?.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <span className="text-xs font-semibold text-gray-700 truncate">{user?.email || 'Administrator'}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {user?.role || 'SUPER_ADMIN'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-semibold text-xs shadow-md shadow-red-900/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing Out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Yes, Sign Out</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
