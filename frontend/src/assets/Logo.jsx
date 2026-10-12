import React from 'react';

export default function Logo({
  className = "",
  light = false,
  showText = true,
  showTagline = true,
  imgClassName = "h-12 sm:h-14 md:h-16 w-auto max-w-none",
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official ZIPS Logo Image - Fully Visible without circle crop */}
      <img
        src="/zip-logo.webp"
        alt="Zainab International Public School"
        width="64"
        height="64"
        loading="eager"
        decoding="async"
        className={`object-contain flex-shrink-0 drop-shadow-sm ${imgClassName}`}
      />

      {/* Typography Unit */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`font-sans text-base sm:text-lg md:text-xl font-extrabold tracking-wide uppercase leading-tight ${light ? 'text-white' : 'text-zips-green-950'}`}>
              Zainab
            </span>
            <span className="text-zips-gold-500 font-sans text-base sm:text-lg md:text-xl font-extrabold uppercase leading-tight">
              International
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${light ? 'text-zips-gold-300' : 'text-zips-green-800'}`}>
              Public School
            </span>
            <span className="text-xs text-zips-gold-500 font-bold">•</span>
            <span className={`text-[10px] sm:text-[11px] font-medium tracking-normal ${light ? 'text-gray-300' : 'text-zips-charcoal-600'}`}>
              Aligarh
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-zips-gold-600 tracking-wider mt-0.5">
              "Rise & Shine"
            </span>
          )}
        </div>
      )}
    </div>
  );
}
