import type { FC } from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { ComputedMetric } from '../types';
import { deriveTrendMetaFromDrift, trendTooltip } from '../utils/trendTooltip';

interface SnapshotStripProps {
    metrics: ComputedMetric[];
    onExplain: (metric: ComputedMetric) => void;
}

const SnapshotStrip: FC<SnapshotStripProps> = ({ metrics, onExplain }) => {
    const getGradeColor = (grade?: string) => {
        switch (grade) {
            case 'A': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'B': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'C': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'D': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    return (
        <div className="premium-card overflow-hidden">
            <div className="flex divide-x divide-slate-100 custom-scrollbar overflow-x-auto">
                {metrics.map((metric, idx) => (
                    <button
                        key={idx}
                        onClick={() => onExplain(metric)}
                        className="flex-1 min-w-[160px] p-4 text-left hover:bg-slate-50/50 transition-colors group focus:outline-none focus:bg-slate-50"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {metric.metric_name}
                            </span>
                            {metric.trust_score?.grade && (
                                <span className={`trust-badge ${getGradeColor(metric.trust_score.grade)}`}>
                                    {metric.trust_score.grade}
                                </span>
                            )}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {metric.value !== null ? metric.value.toLocaleString() : 'N/A'}
                                </span>
                                {metric.unit && (
                                    <span className="text-[10px] font-bold text-slate-300 uppercase">
                                        {metric.unit}
                                    </span>
                                )}
                            </div>
                            <TrendGlyph metric={metric} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const TrendGlyph = ({ metric }: { metric: ComputedMetric }) => {
    const { direction, emphasis, Icon, color } = getTrendGlyphPresentation(metric);
    const tooltip = trendTooltip(direction, {
        period: metric.period,
        metricName: metric.metric_name,
        emphasis,
    });

    return (
        <span
            className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 ${color}`}
            title={tooltip}
            aria-label={tooltip}
        >
            <Icon size={12} strokeWidth={2} />
        </span>
    );
};

const getTrendGlyphPresentation = (metric: ComputedMetric) => {
    const meta = deriveTrendMetaFromDrift(metric.drift);

    if (meta.emphasis === 'volatility') {
        return { direction: meta.direction, emphasis: meta.emphasis, Icon: AlertTriangle, color: 'text-amber-600' };
    }

    if (meta.direction === 'up') {
        return { direction: meta.direction, emphasis: meta.emphasis, Icon: ArrowUpRight, color: 'text-sky-600' };
    }

    if (meta.direction === 'down') {
        return { direction: meta.direction, emphasis: meta.emphasis, Icon: ArrowDownRight, color: 'text-slate-600' };
    }

    return { direction: meta.direction, emphasis: meta.emphasis, Icon: Minus, color: 'text-slate-400' };
};

export default SnapshotStrip;
