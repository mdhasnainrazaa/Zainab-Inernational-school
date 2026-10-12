import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Search,
  BookOpen,
  Calendar,
  Building,
  Award,
  HelpCircle,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Shield,
  LayoutDashboard,
  Download,
} from 'lucide-react';
import Logo from '../../assets/Logo';
import { SCHOOL_INFO } from '../../data/schoolData';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Campus', path: '/facilities' },
    { name: 'Activities', path: '/activities' },
    { name: 'Admissions', path: '/admissions', badge: '2026-27' },
    { name: 'Fee Structure', path: '/fees' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="relative w-full z-40">
      {/* 1. Top Utility Notification Bar (Desktop & Tablet) */}
      <div className="bg-zips-green-950 text-white border-b border-zips-gold-500/20 py-1.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left contact info */}
          <div className="flex items-center gap-4 text-gray-300">
            <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="flex items-center gap-1.5 hover:text-zips-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-zips-gold-500" />
              <span>{SCHOOL_INFO.phones[0]}</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a href={`mailto:${SCHOOL_INFO.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-zips-gold-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-zips-gold-500" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
          </div>

          {/* Right campus address & social media icons */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-zips-gold-500" />
              <span>Behind CDF, Rathgawan, Aligarh</span>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-2 text-gray-300">
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="text-[11px] text-gray-400 font-medium hidden md:inline">Follow Us:</span>
              <a
                href={SCHOOL_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-zips-gold-500 hover:text-zips-green-950 flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={SCHOOL_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-zips-gold-500 hover:text-zips-green-950 flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={SCHOOL_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-zips-gold-500 hover:text-zips-green-950 flex items-center justify-center transition-all duration-200"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-white/98 backdrop-blur-md shadow-sm py-2 border-b border-zips-green-100 transition-all duration-300 w-full relative z-40">
        <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-1 sm:gap-2 xl:gap-4">
            {/* School Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <Logo light={false} imgClassName="h-9 sm:h-10 md:h-11 w-auto" />
            </Link>

            {/* Desktop Navigation Links - Single Clean Line */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-nowrap flex-shrink min-w-0">
              {navLinks.map((item) => (
                <div key={item.name} className="relative group flex-shrink-0">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-medium transition-colors whitespace-nowrap text-zips-charcoal-900 hover:text-zips-green-900 hover:bg-zips-green-50 ${
                      location.pathname === item.path ? 'text-zips-green-900 font-bold bg-zips-green-50' : ''
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-zips-gold-600 group-hover:text-zips-green-900 group-hover:rotate-180 transition-transform duration-200 flex-shrink-0" />
                    )}
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-zips-gold-500 text-zips-green-950 rounded-full leading-none whitespace-nowrap ml-0.5">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-2xl border-2 border-zips-gold-300 p-2 overflow-hidden ring-1 ring-black/5">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-3 py-2 rounded-lg text-xs font-semibold text-zips-charcoal-800 hover:bg-zips-green-50 hover:text-zips-green-900 transition-colors whitespace-nowrap"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Action Button */}
            <div className="hidden lg:flex items-center flex-shrink-0 pl-1">
              <button
                onClick={onOpenEnquiry}
                className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-zips-green-950 bg-gradient-to-r from-zips-gold-400 via-zips-gold-500 to-zips-gold-400 hover:brightness-105 shadow-sm transition-all whitespace-nowrap border border-zips-gold-300 flex-shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 flex-shrink-0" />
                <span>Apply Now</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenEnquiry}
                className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-zips-gold-500 text-zips-green-950 sm:hidden whitespace-nowrap"
              >
                Apply
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg transition-colors text-zips-green-950 hover:bg-gray-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061D17] text-white border-t-2 border-zips-gold-400 border-b border-zips-gold-500/40 max-h-[85vh] overflow-y-auto shadow-2xl p-4 sm:p-6 z-50">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <div key={item.name} className="border-b border-white/10 py-1.5">
                <div className="flex items-center justify-between">
                  {item.dropdown ? (
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className={`text-base font-bold transition-colors py-1.5 flex items-center gap-2 text-left flex-1 ${
                        location.pathname.startsWith(item.path) ? 'text-zips-gold-400 font-black' : 'text-white hover:text-zips-gold-300'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-zips-gold-500 text-zips-green-950 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-bold transition-colors py-1.5 flex items-center gap-2 flex-1 ${
                        location.pathname === item.path ? 'text-zips-gold-400 font-black' : 'text-white hover:text-zips-gold-300'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-zips-gold-500 text-zips-green-950 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                  {item.dropdown && (
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className="p-2 text-zips-gold-400 hover:text-white rounded-lg transition-colors bg-white/5 border border-white/10"
                      aria-label={`Toggle ${item.name} submenu`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSubmenu === item.name ? 'rotate-180 text-zips-gold-300' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.dropdown && openSubmenu === item.name && (
                  <div className="pl-3 mt-1.5 space-y-1 bg-[#030E0B] p-3 rounded-xl border-l-2 border-zips-gold-400">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs font-semibold text-gray-200 hover:text-zips-gold-300 py-1.5 transition-colors"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/15 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 bg-gradient-to-r from-zips-gold-400 via-zips-gold-500 to-zips-gold-400 hover:brightness-105 text-zips-green-950 font-black text-xs sm:text-sm rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-zips-green-950" />
              <span>Apply for Admission 2026-27</span>
            </button>
            <a
              href="/ZIPS-Admission-Form.pdf"
              download="ZIPS-Admission-Form.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-zips-gold-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-zips-gold-400/40 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Admission Form (PDF)</span>
            </a>
            <div className="text-center text-xs text-gray-300 font-medium">
              Admissions Helpline:{' '}
              <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="text-zips-gold-400 font-bold underline">
                {SCHOOL_INFO.phones[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
