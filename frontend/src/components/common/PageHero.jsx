import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHero({
  badge = "Zainab International Public School",
  title,
  subtitle,
  breadcrumb = [],
  bgImage = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80",
  imageClassName = "scale-105 md:scale-110 object-center",
}) {
  return (
    <div className="relative min-h-[290px] md:min-h-[360px] flex items-center justify-center overflow-hidden bg-zips-green-950 text-white pt-10 md:pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Increased Opacity & Clarity */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="ZIPS Campus Hero"
          className={`w-full h-full object-cover filter brightness-[0.78] contrast-[1.05] transition-transform duration-700 ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zips-green-950 via-zips-green-950/45 to-black/30"></div>
        {/* Subtle geometric gold accent */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-zips-gold-500/20 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Breadcrumb Navigation */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-zips-gold-300 mb-4 bg-zips-green-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-zips-gold-500/30">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-zips-gold-500" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Badge */}
        {badge && (
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-zips-gold-400 font-semibold">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
