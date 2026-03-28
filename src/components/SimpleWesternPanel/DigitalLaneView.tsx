import React from 'react';
import type { ExperimentParams } from '../../types';
import { mapKdaToSvgY, getBandOpacity, getBandThickness } from '../../utils/gelRenderer';

interface Props {
  params: ExperimentParams | null;
  hasRun: boolean;
}

const SVG_HEIGHT = 140;
const SVG_WIDTH = 60;
const BAND_X = SVG_WIDTH / 2;
const LANE_WIDTH = 30;

export const DigitalLaneView: React.FC<Props> = ({ params, hasRun }) => {
  if (!hasRun || !params) {
    return (
      <div className="flex flex-col items-center">
        <svg width={SVG_WIDTH} height={SVG_HEIGHT} style={{ background: '#0f172a', borderRadius: 6, display: 'block' }}>
          <text x={SVG_WIDTH / 2} y={SVG_HEIGHT / 2} textAnchor="middle" fontSize={7} fill="#555">—</text>
        </svg>
        <div className="text-xs text-slate-400 mt-1">Digital Lane</div>
      </div>
    );
  }

  const bandY = mapKdaToSvgY(params.protein.kDa, SVG_HEIGHT);
  const opacity = getBandOpacity(params.concentration);
  const thickness = getBandThickness(params.concentration);

  // Loading control band
  const lcKda = params.protein.kDa === 37 ? 42 : 37;
  const lcY = mapKdaToSvgY(lcKda, SVG_HEIGHT);

  return (
    <div className="flex flex-col items-center">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} style={{ background: '#0f172a', borderRadius: 6, display: 'block' }}>
        <text x={BAND_X} y={10} textAnchor="middle" fontSize={7} fill="#aaa">Digital</text>
        {/* Main band */}
        <rect
          x={BAND_X - LANE_WIDTH / 2}
          y={bandY - thickness / 2}
          width={LANE_WIDTH}
          height={thickness}
          fill="#60A5FA"
          opacity={opacity}
          rx={2}
        />
        {/* Loading control band */}
        <rect
          x={BAND_X - LANE_WIDTH / 2}
          y={lcY - 3}
          width={LANE_WIDTH}
          height={3}
          fill="#34D399"
          opacity={0.7}
          rx={1}
        />
        <text x={3} y={bandY + 1} fontSize={5} fill="#60A5FA">{params.protein.kDa}k</text>
        <text x={3} y={lcY + 1} fontSize={5} fill="#34D399">{lcKda}k</text>
      </svg>
      <div className="text-xs text-slate-400 mt-1">Digital Lane</div>
    </div>
  );
};
