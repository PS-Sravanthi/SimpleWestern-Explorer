export function trackCTAClick(ctaName: string): void {
  console.log(`CTA clicked: ${ctaName}`);
}

export function trackSimulationRun(params: Record<string, unknown>): void {
  console.log('Simulation run:', params);
}
