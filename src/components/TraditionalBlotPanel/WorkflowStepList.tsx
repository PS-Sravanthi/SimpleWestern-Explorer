import React from 'react';
import type { ProtocolStep } from '../../types';

interface Props {
  steps: ProtocolStep[];
}

const STEP_ICONS = ['🧪', '⚡', '🔄', '🛡️', '🔬', '🧫', '📷'];

export const WorkflowStepList: React.FC<Props> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, i) => (
        <div
          key={step.step}
          className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
            step.painPoint ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50 border border-slate-100'
          }`}
        >
          <span className="text-base leading-none mt-0.5">{STEP_ICONS[i] ?? '•'}</span>
          <div className="flex-1 min-w-0">
            <div className={`font-medium truncate ${step.painPoint ? 'text-orange-700' : 'text-slate-700'}`}>
              {step.name}
            </div>
            <div className="text-slate-400">{step.duration}</div>
          </div>
          {step.painPoint && <span className="text-orange-500 text-xs shrink-0">⚠️</span>}
        </div>
      ))}
    </div>
  );
};
