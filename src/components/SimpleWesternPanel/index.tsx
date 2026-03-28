import React from 'react';
import protocols from '../../data/protocols.json';
import type { ExperimentParams, ProtocolStep } from '../../types';
import { Electropherogram } from './Electropherogram';
import { DigitalLaneView } from './DigitalLaneView';
import { WorkflowStepList } from './WorkflowStepList';

interface Props {
  params: ExperimentParams | null;
  hasRun: boolean;
}

export const SimpleWesternPanel: React.FC<Props> = ({ params, hasRun }) => {
  const steps = protocols.simpleWestern as ProtocolStep[];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-bold text-blue-600">⚡ Simple Western (Jess/Abby)</h2>

      <div className="flex gap-3 items-start">
        <div className="flex-1 min-w-0">
          <Electropherogram params={params} hasRun={hasRun} />
        </div>
        <DigitalLaneView params={params} hasRun={hasRun} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-600 mb-2">Protocol Steps</h3>
        <WorkflowStepList steps={steps} />
      </div>

      <div className="mt-auto rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs text-blue-700 font-medium">
        ⏱ Total: ~3–5 hours &nbsp;|&nbsp; 🤖 4 steps (mostly automated) &nbsp;|&nbsp; ✅ Quantitative & reproducible
      </div>
    </div>
  );
};
