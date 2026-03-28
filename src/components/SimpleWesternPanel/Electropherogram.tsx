import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ExperimentParams } from '../../types';
import { generateElectropherogramData } from '../../utils/electropherogram';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

interface Props {
  params: ExperimentParams | null;
  hasRun: boolean;
}

export const Electropherogram: React.FC<Props> = ({ params, hasRun }) => {
  const chartData = useMemo(() => {
    if (!params || !hasRun) return null;
    const lcKda = params.protein.kDa === 37 ? 42 : 37;
    const { primary, loadingControl } = generateElectropherogramData(params.protein.kDa, params.concentration, lcKda);
    return { primary, loadingControl };
  }, [params, hasRun]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-48 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-400">
        Run simulation to see electropherogram
      </div>
    );
  }

  const labels = chartData.primary.map(d => d.x);
  const lcName = params!.protein.kDa === 37 ? 'β-Actin (42 kDa)' : 'GAPDH (37 kDa)';

  const data = {
    labels,
    datasets: [
      {
        label: `${params!.protein.name} (${params!.protein.kDa} kDa)`,
        data: chartData.primary.map(d => d.y),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
      {
        label: `Loading Control: ${lcName}`,
        data: chartData.loadingControl.map(d => d.y),
        borderColor: '#16A34A',
        backgroundColor: 'rgba(22, 163, 74, 0.05)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { font: { size: 10 } } },
      title: {
        display: true,
        text: 'Electropherogram',
        font: { size: 12 },
        color: '#334155',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Molecular Weight (kDa)', font: { size: 10 }, color: '#64748b' },
        ticks: { font: { size: 9 }, maxTicksLimit: 12 },
      },
      y: {
        title: { display: true, text: 'Signal Intensity (RFU)', font: { size: 10 }, color: '#64748b' },
        ticks: { font: { size: 9 } },
        min: 0,
      },
    },
  };

  return (
    <div style={{ height: 220 }}>
      <Line data={data} options={options} />
    </div>
  );
};
