import type { FC } from 'react';
import type { ComputedMetric, Reliability } from '../types';
import TrendIndicator from './TrendIndicator';
import { Clock } from 'lucide-react';

interface MetricCardDenseProps {
    metric: ComputedMetric;
    onClick?: () => void;
    reliability?: Reliability | null;
}

const MetricCardDense: FC<MetricCardDenseProps> = ({ metric, onClick, reliability }) => {
    const {
        metric_name,
        value,
        unit,
        confidence,
        trust_score,
        drift
    } = metric;

    const trendDirection = drift?.magnitude ? (drift.magnitude > 0 ? 'up' : (drift.magnitude < 0 ? 'down' : 'flat')) : undefined;
    const trendText = drift?.reason || (trendDirection === 'up' ? 'Upward trend' : trendDirection === 'down' ? 'Downward movement' : 'Stable');

    return (
        <div
            onClick={onClick}
            className={`premium-card p-4 flex flex-col justify-between h-full bg-white border border-slate-200 hover:border-slate-400 group cursor-pointer transition-all shadow-sm hover:shadow-xl hover:shadow-slate-200/50 ${confidence && confidence < 0.5 ? 'opacity-60' : ''}`}
        >
            <div className="flex justify-between items-start gap-2 mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors truncate" title={metric_name}>
                    {metric_name}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                    <TrendIndicator direction={trendDirection as any} text={trendText} />
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                        {value !== null && value !== undefined ? (typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 1 }) : value) : '—'}
                    </span>
                    {unit && (
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            {unit}
                        </span>
                    )}
                </div>

                {typeof confidence === 'number' && !isNaN(confidence) && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-700" style={{ width: `${confidence * 100}%` }} />
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{(confidence * 100).toFixed(0)}% Coverage</span>
                        </div>
                        {drift?.change_pct !== undefined && drift.change_pct !== null && !isNaN(drift.change_pct) && (
                            <span className={`text-[10px] font-black ${drift.change_pct > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {drift.change_pct > 0 ? `+${drift.change_pct}%` : `${drift.change_pct}%`}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCardDense;
