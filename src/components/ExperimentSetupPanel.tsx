import React, { useState } from 'react';
import proteins from '../data/proteins.json';
import sampleTypes from '../data/sampleTypes.json';
import type { ExperimentParams, Protein, SampleType } from '../types';
import { trackSimulationRun } from '../utils/analytics';

interface Props {
  onRunSimulation: (params: ExperimentParams) => void;
}

export const ExperimentSetupPanel: React.FC<Props> = ({ onRunSimulation }) => {
  const [sampleType, setSampleType] = useState<SampleType>(sampleTypes[0] as SampleType);
  const [protein, setProtein] = useState<Protein>(proteins[0] as Protein);
  const [detectionMethod, setDetectionMethod] = useState<'chemiluminescence' | 'fluorescence'>('chemiluminescence');
  const [concentration, setConcentration] = useState<number>(1.0);
  const [numSamples, setNumSamples] = useState<number>(4);

  const handleRun = () => {
    const params: ExperimentParams = { sampleType, protein, detectionMethod, concentration, numSamples };
    trackSimulationRun({ proteinId: protein.id, concentration, numSamples, sampleTypeId: sampleType.id });
    onRunSimulation(params);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-bold text-slate-800">⚗️ Experiment Setup</h2>

      {/* Sample Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Sample Type</label>
        <select
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sampleType.id}
          onChange={e => setSampleType(sampleTypes.find(s => s.id === e.target.value) as SampleType)}
        >
          {sampleTypes.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Target Protein */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Target Protein</label>
        <select
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={protein.id}
          onChange={e => setProtein(proteins.find(p => p.id === e.target.value) as Protein)}
        >
          {proteins.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.kDa} kDa)</option>
          ))}
        </select>
      </div>

      {/* Detection Method */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Detection Method</label>
        <div className="flex gap-4">
          {(['chemiluminescence', 'fluorescence'] as const).map(method => (
            <label key={method} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="detectionMethod"
                value={method}
                checked={detectionMethod === method}
                onChange={() => setDetectionMethod(method)}
                className="accent-blue-600"
              />
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Concentration Slider */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Protein Concentration: <span className="text-blue-600 font-semibold">{concentration.toFixed(1)} mg/mL</span>
        </label>
        <input
          type="range"
          min={0.1}
          max={5.0}
          step={0.1}
          value={concentration}
          onChange={e => setConcentration(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>0.1 mg/mL</span>
          <span>5.0 mg/mL</span>
        </div>
      </div>

      {/* Number of Samples */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Samples</label>
        <select
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={numSamples}
          onChange={e => setNumSamples(parseInt(e.target.value))}
        >
          {[1, 4, 8, 12, 24].map(n => (
            <option key={n} value={n}>{n} sample{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Run Button */}
      <button
        onClick={handleRun}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
      >
        ▶ Run Simulation
      </button>
    </div>
  );
};
