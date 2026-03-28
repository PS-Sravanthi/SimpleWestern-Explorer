import React from 'react';
import type { ProtocolStep } from '../../types';

interface Props {
  steps: ProtocolStep[];
}

const STEP_ICONS = ['🧪', '🗂️', '🤖', '💻'];

export const WorkflowStepList: React.FC<Props> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, i) => (
        <div
          key={step.step}
          className="flex items-start gap-2 p-2 rounded-lg text-xs bg-blue-50 border border-blue-100"
        >
          <span className="text-base leading-none mt-0.5">{STEP_ICONS[i] ?? '•'}</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-blue-700 truncate">{step.name}</div>
            <div className="text-slate-400">{step.duration}</div>
          </div>
          {!step.manual && <span className="text-green-500 text-xs shrink-0">🤖</span>}
        </div>
      ))}
    </div>
  );
};
