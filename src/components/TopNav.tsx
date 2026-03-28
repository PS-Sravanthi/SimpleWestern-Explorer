import React from 'react';
import { trackCTAClick } from '../utils/analytics';

export const TopNav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">🧬</span>
          <span className="text-xl font-bold text-slate-800">Simple Western Explorer</span>
        </div>
        <button
          onClick={() => {
            trackCTAClick('Request a Demo - TopNav');
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          Request a Demo
        </button>
      </div>
    </nav>
  );
};
