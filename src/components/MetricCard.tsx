import type { FC, ReactNode } from 'react';
import type { ComputedMetric } from '../types';

interface MetricCardProps {
  metric?: ComputedMetric;
  onExplain?: (metric: ComputedMetric) => void;
  // Legacy support
  label?: string;
  value?: ReactNode;
  helper?: string;
}

const MetricCard: FC<MetricCardProps> = ({ metric, onExplain, label, value, helper }) => {
  const displayLabel = metric?.metric_name ?? label;
  const displayValue = metric?.value ?? value;
  const displayUnit = metric?.unit ?? '';
  const trust_score = metric?.trust_score;
  const confidence = metric?.confidence;
  const drift = metric?.drift;

  const getTrustColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'B': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'C': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'D': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="group relative border border-neutral-100 rounded-3xl p-7 space-y-5 bg-white hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-500 ease-out">
      <div className="flex justify-between items-start">
        <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.2em]">{displayLabel}</p>
        {trust_score && (
          <div className={`px-3 py-1 rounded-full text-[9px] font-bold border ${getTrustColor(trust_score.grade)} transition-all shadow-sm`}>
            {trust_score.grade} GRADE
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-neutral-900 tracking-tight">
          {displayValue !== null && displayValue !== undefined ? displayValue.toLocaleString() : '—'}
        </span>
        {displayUnit && <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{displayUnit}</span>}
      </div>

      {(confidence !== undefined || drift?.drift_flag || metric) && (
        <div className="pt-5 border-t border-neutral-50 flex flex-col gap-3">
          {typeof confidence === 'number' && !isNaN(confidence) && (
            <div className="flex justify-between items-center text-[10px] font-medium">
              <span className="text-neutral-400 uppercase tracking-widest">Confidence</span>
              <span className="text-neutral-700 font-bold">{(confidence * 100).toFixed(0)}%</span>
            </div>
          )}

          {drift?.drift_flag && (
            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-2xl border border-rose-100/50">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[9px] font-bold text-rose-700 uppercase tracking-widest">Unusual Drift</span>
            </div>
          )}

          {metric && (
            <button
              onClick={() => onExplain?.(metric)}
              className="mt-1 w-full text-center py-2.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50/30 hover:bg-blue-50 rounded-2xl transition-all border border-blue-100/20 hover:border-blue-100"
            >
              Examine Trace
            </button>
          )}
        </div>
      )}

      {helper && !metric && (
        <p className="text-[10px] text-neutral-400 leading-relaxed font-medium mt-auto">{helper}</p>
      )}
    </div>
  );
};

export default MetricCard;
