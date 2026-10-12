import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Shield, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // If already logged in, automatically redirect to admin dashboard
  useEffect(() => {
    if (window.location.search.includes('sessionExpired=true')) {
      setError('Your session has expired or is invalid. Please log in to access the dashboard.');
    } else if (!authLoading && (isAuthenticated || user)) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your registered Email and Password.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#031d16] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      {/* Header & Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
        <Link to="/" className="inline-block transition-transform hover:scale-105 duration-200">
          <img 
            src="/zip-logo.png" 
            alt="Zainab International Public School" 
            className="h-20 w-auto mx-auto object-contain drop-shadow-lg" 
          />
        </Link>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Institutional CMS & CRM Portal</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
          Admin Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-emerald-300/80">
          Zainab International Public School (ZIPS)
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0b2920]/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-8 border border-emerald-500/20 shadow-black/50">
          
          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-500/15 border border-red-500/40 text-red-200 text-xs rounded-2xl flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200/90 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/70">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hkbinfotechofficial@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200/90 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-400/70 hover:text-amber-300 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-emerald-200/80 hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-emerald-950 border-emerald-600 text-amber-500 focus:ring-amber-400"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-amber-400/80 font-mono">Protected by JWT</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 active:scale-[0.99] shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 font-sans cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-emerald-950" />
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4 text-emerald-950" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-4 border-t border-emerald-500/20 text-center">
            <p className="text-[11px] text-emerald-300/60 mb-2">Quick Sign In Helper:</p>
            <button
              type="button"
              onClick={() => handleQuickDemo('hkbinfotechofficial@gmail.com', 'zips@123')}
              className="w-full py-2 px-3 bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-400/20 hover:border-amber-400/40 text-amber-300 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Configured Admin Credentials</span>
            </button>
          </div>

          {/* Return link */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-emerald-300/70 hover:text-amber-300 transition-colors inline-flex items-center gap-1">
              ← Return to School Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
