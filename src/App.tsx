import React from 'react';
import { TopNav } from './components/TopNav';
import { ExperimentSetupPanel } from './components/ExperimentSetupPanel';
import { TraditionalBlotPanel } from './components/TraditionalBlotPanel';
import { SimpleWesternPanel } from './components/SimpleWesternPanel';
import { WorkflowComparison } from './components/WorkflowComparison';
import { CTABar } from './components/CTABar';
import { useSimulation } from './hooks/useSimulation';
import type { ExperimentParams } from './types';

function App() {
  const { hasRun, runSimulation } = useSimulation();
  const [lastParams, setLastParams] = React.useState<ExperimentParams | null>(null);

  const handleRunSimulation = (params: ExperimentParams) => {
    setLastParams(params);
    runSimulation(params);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <TopNav />

      <main className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Three-panel layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExperimentSetupPanel onRunSimulation={handleRunSimulation} />
          <TraditionalBlotPanel params={lastParams} hasRun={hasRun} />
          <SimpleWesternPanel params={lastParams} hasRun={hasRun} />
        </div>

        {/* Workflow comparison stepper */}
        <WorkflowComparison />

        {/* CTA footer */}
        <CTABar />
      </main>

      <footer className="text-center text-xs text-slate-400 py-4 mt-2">
        © 2024 Bio-Techne · Simple Western Explorer · MVP Demo
      </footer>
    </div>
  );
}

export default App;
