import type { FC } from 'react';
import type { ComputedMetric } from '../types';
import GrowthTile from './GrowthTile';

interface GrowthSummaryProps {
    metrics: ComputedMetric[];
}

const GrowthSummary: FC<GrowthSummaryProps> = ({ metrics }) => {
    const getMetric = (name: string) => metrics.find(m => m.metric_name === name);

    const salesMetrics = [
        { label: 'Sales Growth', horizon: '10Y', metric: 'Sales Growth (10Y)' },
        { label: 'Sales Growth', horizon: '5Y', metric: 'Sales Growth (5Y)' },
        { label: 'Sales Growth', horizon: '3Y', metric: 'Sales Growth (3Y)' },
        { label: 'Sales Growth', horizon: '1Y', metric: 'Sales Growth (1Y)' },
    ].map(cfg => ({ ...cfg, data: getMetric(cfg.metric) })).filter(m => m.data?.value !== null && m.data?.value !== undefined);

    const profitMetrics = [
        { label: 'Profit Growth', horizon: '10Y', metric: 'Profit Growth (10Y)' },
        { label: 'Profit Growth', horizon: '5Y', metric: 'Profit Growth (5Y)' },
        { label: 'Profit Growth', horizon: '3Y', metric: 'Profit Growth (3Y)' },
        { label: 'Profit Growth', horizon: '1Y', metric: 'Profit Growth (1Y)' },
    ].map(cfg => ({ ...cfg, data: getMetric(cfg.metric) })).filter(m => m.data?.value !== null && m.data?.value !== undefined);

    const roeMetrics = [
        { label: 'ROE', horizon: '10Y', metric: 'ROE (10Y)' },
        { label: 'ROE', horizon: '5Y', metric: 'ROE (5Y)' },
        { label: 'ROE', horizon: '3Y', metric: 'ROE (3Y)' },
        { label: 'ROE', horizon: 'Last Year', metric: 'ROE' },
    ].map(cfg => ({ ...cfg, data: getMetric(cfg.metric) })).filter(m => m.data?.value !== null && m.data?.value !== undefined);

    if (salesMetrics.length === 0 && profitMetrics.length === 0 && roeMetrics.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salesMetrics.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <div className="w-1 h-3 bg-indigo-600 rounded-full" />
                        Compounded Sales
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {salesMetrics.map((m, i) => (
                            <GrowthTile
                                key={i}
                                label={m.label}
                                horizon={m.horizon}
                                value={m.data?.value ?? null}
                                confidence={m.data?.confidence ?? undefined}
                                grade={m.data?.trust_score?.grade}
                                direction={m.data?.drift?.magnitude ? (m.data.drift.magnitude > 0 ? 'up' : 'down') : undefined}
                            />
                        ))}
                    </div>
                </div>
            )}

            {profitMetrics.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <div className="w-1 h-3 bg-emerald-600 rounded-full" />
                        Compounded Profit
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {profitMetrics.map((m, i) => (
                            <GrowthTile
                                key={i}
                                label={m.label}
                                horizon={m.horizon}
                                value={m.data?.value ?? null}
                                confidence={m.data?.confidence ?? undefined}
                                grade={m.data?.trust_score?.grade}
                                direction={m.data?.drift?.magnitude ? (m.data.drift.magnitude > 0 ? 'up' : 'down') : undefined}
                            />
                        ))}
                    </div>
                </div>
            )}

            {roeMetrics.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <div className="w-1 h-3 bg-amber-500 rounded-full" />
                        Return on Equity
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {roeMetrics.map((m, i) => (
                            <GrowthTile
                                key={i}
                                label={m.label}
                                horizon={m.horizon}
                                value={m.data?.value ?? null}
                                confidence={m.data?.confidence ?? undefined}
                                grade={m.data?.trust_score?.grade}
                                direction={m.data?.drift?.magnitude ? (m.data.drift.magnitude > 0 ? 'up' : 'down') : undefined}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrowthSummary;
