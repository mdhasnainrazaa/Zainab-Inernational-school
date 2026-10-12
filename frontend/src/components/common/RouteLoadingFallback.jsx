import React from 'react';

export default function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-3 border-zips-gold-500/20 border-t-zips-gold-500 animate-spin"></div>
      </div>
      <p className="mt-4 text-xs font-semibold text-zips-green-950 uppercase tracking-widest animate-pulse">
        Loading ZIPS Experience...
      </p>
    </div>
  );
}
