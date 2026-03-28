import { useState, useCallback } from 'react';
import type { ExperimentParams, SimulationResult } from '../types';
import { mapKdaToSvgY, getBandOpacity, getBandThickness } from '../utils/gelRenderer';
import { generateElectropherogramData } from '../utils/electropherogram';

export function useSimulation() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const runSimulation = useCallback((params: ExperimentParams) => {
    const { protein, concentration } = params;

    // Generate gel bands
    const gelBands = Array.from({ length: params.numSamples }, () => ({
      yPosition: mapKdaToSvgY(protein.kDa),
      opacity: getBandOpacity(concentration),
      thickness: getBandThickness(concentration),
    }));

    // Loading control: use GAPDH (37 kDa) unless protein IS GAPDH, then use β-Actin (42 kDa)
    const loadingControlKda = protein.kDa === 37 ? 42 : 37;

    const { primary, loadingControl } = generateElectropherogramData(
      protein.kDa,
      concentration,
      loadingControlKda
    );

    setResult({
      gelBands,
      electropherogramData: primary,
      loadingControlData: loadingControl,
    });
    setHasRun(true);
  }, []);

  return { result, hasRun, runSimulation };
}
