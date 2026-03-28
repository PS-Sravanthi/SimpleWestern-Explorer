import React from 'react';
import protocols from '../../data/protocols.json';
import type { ExperimentParams } from '../../types';
import { GelBandSVG } from './GelBandSVG';
import { WorkflowStepList } from './WorkflowStepList';
import type { ProtocolStep } from '../../types';

interface Props {
  params: ExperimentParams | null;
  hasRun: boolean;
}

export const TraditionalBlotPanel: React.FC<Props> = ({ params, hasRun }) => {
  const steps = protocols.traditional as ProtocolStep[];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-bold text-orange-600">🧫 Traditional Western Blot</h2>

      <GelBandSVG params={params} hasRun={hasRun} />

      <div>
        <h3 className="text-sm font-semibold text-slate-600 mb-2">Protocol Steps</h3>
        <WorkflowStepList steps={steps} />
      </div>

      <div className="mt-auto rounded-lg bg-orange-50 border border-orange-200 px-3 py-2 text-xs text-orange-700 font-medium">
        ⏱ Total: ~1–2 days &nbsp;|&nbsp; 🖐 7 manual steps &nbsp;|&nbsp; ⚠️ High variability
      </div>
    </div>
  );
};
