import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-zips-gold-100 text-zips-gold-800 border border-zips-gold-300/60 shadow-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zips-gold-500 animate-pulse"></span>
          {badge}
        </span>
      )}

      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight leading-[1.2] mt-2 mb-4 ${light ? 'text-white' : 'text-zips-green-950'}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-normal ${light ? 'text-gray-200' : 'text-zips-charcoal-700'}`}>
          {subtitle}
        </p>
      )}

      {/* Decorative Gold Flourish Line */}
      <div className={`mt-5 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-zips-gold-500 rounded-full"></div>
        <div className="w-2 h-2 rotate-45 bg-zips-gold-500 rounded-xs"></div>
        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-zips-gold-500 rounded-full"></div>
      </div>
    </motion.div>
  );
}
