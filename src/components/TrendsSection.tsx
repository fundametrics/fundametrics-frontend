import type { FC } from 'react';
import type { ComputedMetric } from '../types';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { deriveTrendMetaFromDrift, trendTooltip } from '../utils/trendTooltip';

interface TrendsSectionProps {
    metrics: ComputedMetric[];
}

const TrendsSection: FC<TrendsSectionProps> = ({ metrics }) => {
    const getTrendMetadata = (metric: ComputedMetric) => {
        const meta = deriveTrendMetaFromDrift(metric.drift);

        if (meta.emphasis === 'volatility') {
            return { text: 'Volatility Detected', color: 'text-amber-600', icon: AlertCircle, bg: 'bg-amber-50', tooltipMeta: meta };
        }

        if (meta.direction === 'up') {
            return { text: 'Improving', color: 'text-emerald-600', icon: TrendingUp, bg: 'bg-emerald-50', tooltipMeta: meta };
        }

        if (meta.direction === 'down') {
            return { text: 'Declining', color: 'text-rose-600', icon: TrendingDown, bg: 'bg-rose-50', tooltipMeta: meta };
        }

        return { text: 'Stable', color: 'text-slate-500', icon: Minus, bg: 'bg-slate-50', tooltipMeta: meta };
    };

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.filter(m => m.drift).map((metric, idx) => {
                const meta = getTrendMetadata(metric);
                const tooltip = trendTooltip(meta.tooltipMeta.direction, {
                    period: metric.period,
                    metricName: metric.metric_name,
                    emphasis: meta.tooltipMeta.emphasis,
                });
                const confidencePct = ((metric.confidence ?? 0) * 100).toFixed(0);
                return (
                    <div key={idx} className="premium-card p-5 space-y-4" title={tooltip} aria-label={tooltip}>
                        <div className="flex justify-between items-start">
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                {metric.metric_name}
                            </h4>
                            <div className={`p-2 rounded-xl ${meta.bg}`}>
                                <meta.icon size={14} className={meta.color} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xl font-bold text-slate-900">{meta.text}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {metric.drift?.reason || `Historical variance analyzed with ${confidencePct}% confidence.`}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Integrity Snap</span>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500"
                                        style={{ width: `${confidencePct}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600">{confidencePct}%</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendsSection;
