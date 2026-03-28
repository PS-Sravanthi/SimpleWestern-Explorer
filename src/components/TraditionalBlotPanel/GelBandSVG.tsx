import React, { useMemo } from 'react';
import type { ExperimentParams } from '../../types';
import { mapKdaToSvgY, getBandOpacity, getBandThickness, getNoiseOpacity, getLadderBands } from '../../utils/gelRenderer';

interface Props {
  params: ExperimentParams | null;
  hasRun: boolean;
}

const SVG_WIDTH = 280;
const SVG_HEIGHT = 300;
const LANE_WIDTH = 24;
const LADDER_X = 20;

export const GelBandSVG: React.FC<Props> = ({ params, hasRun }) => {
  const ladderBands = getLadderBands(SVG_HEIGHT);

  const lanes = useMemo(() => {
    if (!params || !hasRun) return [];
    const numLanes = params.numSamples;
    const startX = LADDER_X + LANE_WIDTH + 8;
    const spacing = Math.min(LANE_WIDTH + 6, (SVG_WIDTH - startX - 10) / numLanes);
    return Array.from({ length: numLanes }, (_, i) => ({
      x: startX + i * spacing + LANE_WIDTH / 2,
      bandY: mapKdaToSvgY(params.protein.kDa, SVG_HEIGHT),
      opacity: getBandOpacity(params.concentration),
      thickness: getBandThickness(params.concentration),
      noiseOpacity: getNoiseOpacity(params.sampleType),
    }));
  }, [params, hasRun]);

  // Noise bands at random positions (seeded by lane index for stability)
  const noiseBands = useMemo(() => {
    if (!params || !hasRun) return [];
    return lanes.map((lane, li) => {
      const bands = [];
      for (let i = 0; i < 3; i++) {
        const pseudoRand = ((li * 31 + i * 17) % 100) / 100;
        const y = SVG_HEIGHT * 0.1 + pseudoRand * SVG_HEIGHT * 0.8;
        bands.push({ y, opacity: lane.noiseOpacity * 0.6, x: lane.x });
      }
      return bands;
    }).flat();
  }, [lanes, params, hasRun]);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{ background: '#1a1a2e', borderRadius: 8, display: 'block' }}
      >
        {/* Ladder lane */}
        <text x={LADDER_X + LANE_WIDTH / 2} y={12} textAnchor="middle" fontSize={7} fill="#aaa">Ladder</text>
        {ladderBands.map(lb => (
          <g key={lb.kDa}>
            <rect
              x={LADDER_X}
              y={lb.y - 2}
              width={LANE_WIDTH}
              height={3}
              fill="#E8E8E8"
              opacity={0.7}
              rx={1}
            />
            <text x={LADDER_X - 3} y={lb.y + 1} textAnchor="end" fontSize={6} fill="#aaa">{lb.kDa}</text>
          </g>
        ))}

        {/* Sample lane labels */}
        {lanes.map((lane, i) => (
          <text key={i} x={lane.x} y={12} textAnchor="middle" fontSize={7} fill="#aaa">S{i + 1}</text>
        ))}

        {/* Noise bands */}
        {noiseBands.map((nb, i) => (
          <rect
            key={`noise-${i}`}
            x={nb.x - LANE_WIDTH / 2}
            y={nb.y - 1}
            width={LANE_WIDTH}
            height={2}
            fill="#E8E8E8"
            opacity={nb.opacity}
            rx={1}
          />
        ))}

        {/* Main bands */}
        {lanes.map((lane, i) => (
          <rect
            key={`band-${i}`}
            x={lane.x - LANE_WIDTH / 2}
            y={lane.bandY - lane.thickness / 2}
            width={LANE_WIDTH}
            height={lane.thickness}
            fill="#E8E8E8"
            opacity={lane.opacity}
            rx={1}
          />
        ))}

        {/* Placeholder when not run */}
        {!hasRun && (
          <text x={SVG_WIDTH / 2} y={SVG_HEIGHT / 2} textAnchor="middle" fontSize={11} fill="#555" dy={0}>
            Run simulation to see gel
          </text>
        )}
      </svg>
      {hasRun && params && (
        <div className="text-xs text-slate-400 mt-1 text-center">
          {params.protein.name} ({params.protein.kDa} kDa) — {params.numSamples} lane{params.numSamples > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};
