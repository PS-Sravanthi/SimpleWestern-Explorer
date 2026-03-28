import React from 'react';
import protocols from '../data/protocols.json';
import type { ProtocolStep } from '../types';

export const WorkflowComparison: React.FC = () => {
  const traditional = protocols.traditional as ProtocolStep[];
  const simpleWestern = protocols.simpleWestern as ProtocolStep[];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">📊 Workflow Comparison</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1 text-sm font-semibold text-yellow-700">
          ⚡ Save up to ~22 hours per experiment
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Traditional row */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-orange-600 w-32 shrink-0">Traditional WB</span>
            <div className="flex gap-2 flex-wrap">
              {traditional.map(step => (
                <div
                  key={step.step}
                  className={`relative flex flex-col items-center cursor-pointer group`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform group-hover:scale-110 ${
                    step.painPoint
                      ? 'bg-orange-500 border-orange-600 text-white'
                      : 'bg-orange-100 border-orange-300 text-orange-700'
                  }`}>
                    {step.step}
                  </div>
                  <div className="text-xs text-center text-slate-500 mt-1 w-16 leading-tight hidden sm:block" style={{ fontSize: 9 }}>
                    {step.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                  {/* Connector */}
                  {step.step < traditional.length && (
                    <div className="absolute left-8 top-4 w-4 h-0.5 bg-orange-300" style={{ left: '100%', top: '50%', transform: 'translateY(-50%)' }} />
                  )}
                  {/* Inline tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10 bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg pointer-events-none">
                    {step.name}: {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simple Western row */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 w-32 shrink-0">Simple Western</span>
            <div className="flex gap-2 flex-wrap">
              {simpleWestern.map(step => (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform group-hover:scale-110 ${
                    step.manual
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-blue-500 border-blue-600 text-white'
                  }`}>
                    {step.step}
                  </div>
                  <div className="text-xs text-center text-slate-500 mt-1 w-16 leading-tight hidden sm:block" style={{ fontSize: 9 }}>
                    {step.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                  {/* Connector */}
                  {step.step < simpleWestern.length && (
                    <div className="absolute left-8 top-4 w-4 h-0.5 bg-blue-300" style={{ left: '100%', top: '50%', transform: 'translateY(-50%)' }} />
                  )}
                  {/* Inline tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10 bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg pointer-events-none">
                    {step.name}: {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
