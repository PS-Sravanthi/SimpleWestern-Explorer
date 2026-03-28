export interface Protein {
  id: string;
  name: string;
  kDa: number;
  commonControl: boolean;
}

export interface ProtocolStep {
  step: number;
  name: string;
  duration: string;
  manual: boolean;
  painPoint: boolean;
}

export interface SampleType {
  id: string;
  name: string;
  noiseFactor: number;
}

export interface ExperimentParams {
  sampleType: SampleType;
  protein: Protein;
  detectionMethod: 'chemiluminescence' | 'fluorescence';
  concentration: number;
  numSamples: number;
}

export interface GelBand {
  yPosition: number;
  opacity: number;
  thickness: number;
}

export interface SimulationResult {
  gelBands: GelBand[];
  electropherogramData: { x: number; y: number }[];
  loadingControlData: { x: number; y: number }[];
}
