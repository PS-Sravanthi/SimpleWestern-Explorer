import type { SampleType } from '../types';

// Map kDa to SVG Y position (log scale, 10-250 kDa maps to SVG height)
export function mapKdaToSvgY(kDa: number, svgHeight: number = 300): number {
  const minKda = 10;
  const maxKda = 250;
  const logMin = Math.log(minKda);
  const logMax = Math.log(maxKda);
  const logKda = Math.log(kDa);
  const normalized = (logKda - logMin) / (logMax - logMin);
  // Higher kDa = lower Y (top of gel)
  return normalized * svgHeight * 0.85 + svgHeight * 0.05;
}

export function normalizeConcentration(concentration: number): number {
  const min = 0.1;
  const max = 5.0;
  return (concentration - min) / (max - min);
}

export function getBandOpacity(concentration: number): number {
  const norm = normalizeConcentration(concentration);
  return 0.3 + norm * 0.7;
}

export function getBandThickness(concentration: number): number {
  return 4 + concentration * 1.5;
}

export function getNoiseOpacity(sampleType: SampleType): number {
  return sampleType.noiseFactor * (0.5 + Math.random() * 0.5);
}

// Generate ladder bands (standard molecular weight markers)
export const LADDER_KDA = [10, 15, 20, 25, 37, 50, 75, 100, 150, 250];

export function getLadderBands(svgHeight: number = 300) {
  return LADDER_KDA.map(kDa => ({
    kDa,
    y: mapKdaToSvgY(kDa, svgHeight),
  }));
}
