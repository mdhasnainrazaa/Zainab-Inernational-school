import React from 'react';
import { Phone, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export default function QuickActionBar({ onOpenEnquiry }) {
  const whatsappUrl = `https://wa.me/919411030100?text=${encodeURIComponent('Hello ZIPS Admissions Desk, I would like to enquire regarding admissions for session 2026-27.')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zips-green-950/95 backdrop-blur-md border-t border-zips-gold-500/30 shadow-2xl py-2 px-3">
      <div className="flex items-center justify-around gap-2 text-center">
        {/* Call School */}
        <a
          href={`tel:${SCHOOL_INFO.phones[0]}`}
          className="flex-1 flex flex-col items-center justify-center py-1 text-gray-200 hover:text-white"
        >
          <div className="w-8 h-8 rounded-full bg-zips-green-800/80 flex items-center justify-center text-zips-gold-400 mb-1 border border-zips-gold-500/20">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-gray-200 hover:text-white"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-700/80 flex items-center justify-center text-white mb-1 border border-emerald-400/30">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Apply Now Primary */}
        <button
          onClick={onOpenEnquiry}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zips-gold-600 to-zips-gold-400 text-zips-green-950 flex items-center justify-center mb-1 shadow-md animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zips-gold-300">Apply</span>
        </button>

        {/* Location / Directions */}
        <a
          href="https://maps.google.com/?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-gray-200 hover:text-white"
        >
          <div className="w-8 h-8 rounded-full bg-zips-green-800/80 flex items-center justify-center text-zips-gold-400 mb-1 border border-zips-gold-500/20">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Visit</span>
        </a>
      </div>
    </div>
  );
}
