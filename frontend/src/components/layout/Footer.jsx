import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  FileText,
  Download,
} from 'lucide-react';
import Logo from '../../assets/Logo';
import { SCHOOL_INFO, VISION_MISSION } from '../../data/schoolData';

export default function Footer({ onOpenEnquiry }) {
  return (
    <footer className="bg-zips-green-950 text-white pt-16 pb-12 border-t-2 border-zips-gold-500/40 relative overflow-hidden">
      {/* Background Decorative Crest Glow */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-zips-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Call to Action Box */}
        <div className="bg-gradient-to-r from-zips-green-900 to-zips-green-800 rounded-2xl p-6 sm:p-8 mb-12 border border-zips-gold-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-zips-gold-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Admissions Open for Session {SCHOOL_INFO.academicSession}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-white">
              Give Your Child the Gift of World-Class Education & Character
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Nursery to Class IX • Rathgawan, Aligarh • Inquire today or download the official offline admission form.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-zips-green-950 bg-gradient-to-r from-zips-gold-400 to-zips-gold-500 hover:brightness-105 shadow-lg transition-all"
            >
              Apply Online Now
            </button>
            <a
              href="/ZIPS-Admission-Form.pdf"
              download="ZIPS-Admission-Form.pdf"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-zips-gold-400/80 text-zips-gold-300 hover:bg-zips-gold-500 hover:text-zips-green-950 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Admission Form (PDF)</span>
            </a>
            <a
              href={`tel:${SCHOOL_INFO.phones[0]}`}
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/10 text-white transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-zips-gold-400" />
              <span>{SCHOOL_INFO.phones[0]}</span>
            </a>
          </div>
        </div>

        {/* Clean 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 text-sm">
          {/* Col 1: Brand & Philosophy (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo light={true} />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm pt-2">
              "We are a school with an Indian mind, an Indian heart and an Indian soul; a school that celebrates the culture of excellence and is an embodiment of values."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SCHOOL_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SCHOOL_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SCHOOL_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SCHOOL_INFO.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-zips-gold-500 hover:text-zips-green-950 flex items-center justify-center transition-all shadow-sm"
                aria-label="Official Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (matching Header Navbar) (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans text-base font-bold text-zips-gold-400 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-zips-gold-300 transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Campus Facilities
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Activities & Sports
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-zips-gold-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Admissions</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-zips-gold-500 text-zips-green-950 font-bold">2026-27</span>
                </Link>
              </li>
              <li>
                <a
                  href="/ZIPS-Admission-Form.pdf"
                  download="ZIPS-Admission-Form.pdf"
                  className="hover:text-zips-gold-300 transition-colors inline-flex items-center gap-1 text-zips-gold-400 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Admission Form (PDF)</span>
                </a>
              </li>
              <li>
                <Link to="/fees" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-zips-gold-300 transition-colors inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Location & Contact (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-sans text-base font-bold text-zips-gold-400 uppercase tracking-wider">
              Campus & Contact
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zips-gold-400 flex-shrink-0 mt-0.5" />
                <span>Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, U.P., India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zips-gold-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="block hover:text-white transition-colors">{SCHOOL_INFO.phones[0]}</a>
                  <a href={`tel:${SCHOOL_INFO.phones[1]}`} className="block hover:text-white transition-colors">{SCHOOL_INFO.phones[1]}</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zips-gold-400 flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white break-all transition-colors">{SCHOOL_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs pt-1">
                <Clock className="w-3.5 h-3.5 text-zips-gold-500" />
                <span>Mon – Sat: 8:00 AM – 3:30 PM</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-zips-gold-500/30 text-zips-gold-400 hover:bg-zips-gold-500 hover:text-zips-green-950 font-medium text-xs transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff / Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Zainab International Public School (ZIPS). All Rights Reserved.</p>
          <div>
            <Link to="/admin/login" className="text-zips-gold-400 hover:text-zips-gold-300 font-medium transition-colors">
              Staff / Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
