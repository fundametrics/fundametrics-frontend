import type { FC } from 'react';
import type { ComputedMetric, Reliability } from '../types';
import MetricCardDense from './MetricCardDense';

interface ExecutiveSnapshotProps {
    metrics: ComputedMetric[];
    onExplain?: (metric: ComputedMetric) => void;
    reliability?: Reliability | null;
}

const ExecutiveSnapshot: FC<ExecutiveSnapshotProps> = ({ metrics, onExplain, reliability }) => {
    // Use first 8-12 metrics for the grid
    const displayMetrics = metrics.slice(0, 12);

    return (
        <div className="flex overflow-x-auto snap-x gap-3 lg:grid lg:grid-cols-4 xl:grid-cols-6 pb-4 sm:pb-0 hide-scroll">
            {displayMetrics.map((m, idx) => (
                <div key={idx} className="min-w-[70%] sm:min-w-0 snap-center">
                    <MetricCardDense
                        metric={m}
                        onClick={() => onExplain?.(m)}
                        reliability={reliability}
                    />
                </div>
            ))}
            {displayMetrics.length === 0 && (
                <div className="w-full py-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 snap-center shrink-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Insufficient Snapshot Data
                    </p>
                </div>
            )}
        </div>
    );
};

export default ExecutiveSnapshot;
