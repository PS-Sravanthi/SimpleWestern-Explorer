// Generate a Gaussian peak for the electropherogram
export function gaussianPeak(
  x: number,
  center: number,
  height: number,
  sigma: number = 3
): number {
  return height * Math.exp(-0.5 * Math.pow((x - center) / sigma, 2));
}

export function generateElectropherogramData(
  proteinKda: number,
  concentration: number,
  loadingControlKda: number | null
): { primary: { x: number; y: number }[]; loadingControl: { x: number; y: number }[] } {
  const points: { x: number; y: number }[] = [];
  const loadingPoints: { x: number; y: number }[] = [];

  const minKda = 10;
  const maxKda = 250;
  const step = 1;

  const norm = (concentration - 0.1) / (5.0 - 0.1);
  const peakHeight = 500 + norm * 4500; // 500 to 5000 RFU
  const baseline = 50;
  const sigma = 3;

  const lcHeight = 1500; // fixed loading control height

  for (let kDa = minKda; kDa <= maxKda; kDa += step) {
    const primary = baseline + gaussianPeak(kDa, proteinKda, peakHeight, sigma);
    points.push({ x: kDa, y: Math.round(primary) });

    const lc = loadingControlKda
      ? baseline + gaussianPeak(kDa, loadingControlKda, lcHeight, sigma)
      : baseline;
    loadingPoints.push({ x: kDa, y: Math.round(lc) });
  }

  return { primary: points, loadingControl: loadingPoints };
}
