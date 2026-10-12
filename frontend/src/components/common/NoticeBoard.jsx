import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BarChart3,
  Users,
  Bell,
  ChevronRight,
  X,
  Download,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import api from '../../services/api';
import { SCHOOL_INFO, SAMPLE_NOTICES } from '../../data/schoolData';

export default function NoticeBoard() {
  const [notices, setNotices] = useState(SAMPLE_NOTICES || []);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await api.getNotices();
      if (res && Array.isArray(res.notices) && res.notices.length > 0) {
        setNotices(res.notices);
      } else {
        setNotices(SAMPLE_NOTICES || []);
      }
    } catch (err) {
      console.warn('Live notices offline, using initial notices:', err.message);
      setNotices(SAMPLE_NOTICES || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Format date like "10 Dec 2026"
  const formatNoticeDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Select appropriate icon based on category
  const getNoticeIcon = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('academic') || cat.includes('exam') || cat.includes('result')) {
      return <BarChart3 className="w-5 h-5 text-emerald-900" />;
    }
    if (cat.includes('event') || cat.includes('ptm') || cat.includes('meeting')) {
      return <Users className="w-5 h-5 text-emerald-900" />;
    }
    if (cat.includes('holiday') || cat.includes('vacation')) {
      return <Calendar className="w-5 h-5 text-emerald-900" />;
    }
    return <Calendar className="w-5 h-5 text-emerald-900" />;
  };

  return (
    <section className="relative z-20 py-10 sm:py-16 bg-[#FDFCF7]">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* =========================================================================
            REALISTIC WOODEN CORK NOTICE BOARD FRAME
            ========================================================================= */}
        <div className="relative rounded-[2rem] p-3 sm:p-5 bg-gradient-to-br from-[#9C6634] via-[#75441B] to-[#542F10] shadow-[0_22px_60px_rgba(0,0,0,0.4)] border-4 border-[#422108]">
          {/* Subtle Outer Wood Grain Highlights */}
          <div className="absolute inset-1 rounded-[1.75rem] border border-amber-300/20 pointer-events-none"></div>

          {/* Inner Corkboard Surface */}
          <div
            className="rounded-[1.5rem] p-3 sm:p-5 bg-[#C58652] border-2 border-[#4A2207] shadow-[inset_0_4px_18px_rgba(0,0,0,0.45)] relative overflow-visible"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(100,50,15,0.18) 15%, transparent 15%), radial-gradient(circle, rgba(160,82,45,0.18) 15%, transparent 15%)`,
              backgroundSize: '8px 8px',
            }}
          >
            {/* 1. Dark Wood Header Plank */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#44220C] via-[#321706] to-[#44220C] border-2 border-[#6D3D18] shadow-[0_6px_14px_rgba(0,0,0,0.4)] px-3 sm:px-6 py-2.5 sm:py-3.5 mb-4 flex items-center justify-between gap-2 overflow-visible">
              {/* Left School Logo Emblem */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 p-1 shadow-md border-2 border-amber-400 flex items-center justify-center">
                  <img
                    src="/zip-logo.png"
                    alt="ZIPS Emblem"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Center Title: SCHOOL NOTICES */}
              <div className="flex-1 text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-sans">
                  <span>SCHOOL </span>
                  <span className="text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">NOTICES</span>
                </h2>
              </div>

              {/* Right Tilted Yellow Sticky Note with Red 3D Pushpin */}
              <div className="flex-shrink-0 relative">
                {/* 3D Red Pushpin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 shadow-[0_3px_6px_rgba(0,0,0,0.45)] border border-red-300 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/60 blur-[0.5px]"></div>
                </div>

                {/* Yellow Note */}
                <div className="transform rotate-6 sm:rotate-8 bg-gradient-to-br from-[#FFF9C4] to-[#FFF176] text-emerald-950 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-sm shadow-md border border-amber-300 text-center leading-tight select-none">
                  <span>STAY</span>
                  <br />
                  <span>UPDATED</span>
                </div>
              </div>
            </div>

            {/* 2. Pinned Creamy Paper Sheet */}
            <div className="bg-[#FFFDF4] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-amber-200/90 relative p-1 sm:p-2 min-h-[140px] flex flex-col justify-center">
              {/* Golden Thumbtacks in top corners */}
              <div className="absolute -top-2 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-md border border-amber-200 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
              </div>
              <div className="absolute -top-2 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-md border border-amber-200 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
              </div>

              {/* Notices List with Smooth Top-to-Bottom Marquee */}
              {loading ? (
                <div className="p-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading official notices...</span>
                </div>
              ) : notices.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500 font-medium">
                  No active circulars or notices posted right now. Please check back later!
                </div>
              ) : (
                <div className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-lg group/container">
                  {/* Subtle top & bottom gradient feather masks for smooth entry/exit */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#FFFDF4] to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#FFFDF4] to-transparent z-10 pointer-events-none"></div>

                  <div className="animate-marquee-vertical-down divide-y divide-amber-200/70">
                    {/* Render notices in duplicate so the infinite loop scrolls seamlessly */}
                    {[...notices, ...notices].map((notice, idx) => (
                      <div
                        key={`${notice._id || idx}-${idx}`}
                        onClick={() => setSelectedNotice(notice)}
                        className="p-3 sm:p-4 hover:bg-amber-100/60 transition-all rounded-lg flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        {/* Left Icon & Title */}
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                          {/* Green Category Icon Bubble */}
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-emerald-100/90 border border-emerald-300/80 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                            {getNoticeIcon(notice.category)}
                          </div>

                          {/* Title & Priority Badge */}
                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            <h4 className="text-xs sm:text-base font-bold text-gray-900 group-hover:text-emerald-950 transition-colors leading-snug">
                              {notice.title}
                            </h4>
                            {notice.priority === 'Urgent' ? (
                              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-2xs uppercase tracking-wider flex-shrink-0">
                                Urgent
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold shadow-2xs uppercase tracking-wider flex-shrink-0">
                                New
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Date & Dark Arrow */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <span className="text-xs sm:text-sm text-gray-700 font-medium whitespace-nowrap font-sans">
                            {formatNoticeDate(notice.publishDate)}
                          </span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-950 font-black group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FULL CIRCULAR DETAIL MODAL POPUP
          ========================================================================= */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl shadow-2xl border-4 border-zips-gold-400 p-6 sm:p-8 my-auto overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Close Button */}
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <img src="/zip-logo.png" alt="ZIPS Logo" className="h-12 w-auto object-contain flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-zips-gold-100 text-zips-gold-900 px-2.5 py-0.5 rounded-full border border-zips-gold-300">
                    {selectedNotice.category || 'Official Circular'}
                  </span>
                  {selectedNotice.priority === 'Urgent' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                      Urgent Alert
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-gray-700 mt-1">
                  Zainab International Public School • Rathgawan, Aligarh
                </h4>
              </div>
            </div>

            {/* Circular Title & Date */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-zips-green-950 mb-2 leading-tight">
                {selectedNotice.title}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zips-gold-600" />
                <span>
                  Published on:{' '}
                  {new Date(selectedNotice.publishDate || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="mx-1">•</span>
                <span>Target: {selectedNotice.targetAudience || 'All Parents & Students'}</span>
              </p>
            </div>

            {/* Full Content */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 mb-6 text-xs sm:text-sm text-zips-charcoal-800 leading-relaxed space-y-3 whitespace-pre-line">
              {selectedNotice.content}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 font-medium">
                Helpline:{' '}
                <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="font-bold text-zips-green-900 underline">
                  {SCHOOL_INFO.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                {selectedNotice.attachmentUrl && selectedNotice.attachmentUrl !== '#' && (
                  <a
                    href={selectedNotice.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
