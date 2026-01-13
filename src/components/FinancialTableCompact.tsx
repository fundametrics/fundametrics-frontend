import { FC, useState } from 'react';
import type { ComputedMetric, Reliability } from '../types';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface FinancialTableCompactProps {
    yearlyData?: Record<string, any[]>;
    fundametricsMetrics?: ComputedMetric[];
    onExplain?: (metric: ComputedMetric) => void;
    metrics: Array<{ key: string; label: string }>;
    reliability?: Reliability | null;
}

const MobileMetricRow = ({ metric, yearlyData, periods, isHighlighted }: {
    metric: { key: string, label: string },
    yearlyData: any,
    periods: string[],
    isHighlighted: (l: string) => boolean
}) => {
    const [showAll, setShowAll] = useState(false);

    // Default to showing only 3 periods unless expanded
    const displayedPeriods = showAll ? periods : periods.slice(0, 3);
    const hasMore = periods.length > 3;

    return (
        <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden open:shadow-md transition-shadow">
            <summary className="flex items-center justify-between px-4 py-3 bg-slate-50/50 cursor-pointer list-none select-none">
                <span className={`text-sm ${isHighlighted(metric.label) ? 'font-black text-slate-900' : 'font-medium text-slate-700'}`}>
                    {metric.label}
                </span>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-slate-900">
                        {yearlyData[metric.key]?.find((d: any) => d.period === periods[0])?.value?.toLocaleString() || '—'}
                    </span>
                    <ChevronDown size={14} className="text-slate-400 group-open:rotate-180 transition-transform" />
                </div>
            </summary>

            <div className="px-4 py-3 border-t border-slate-100 bg-white space-y-2">
                {displayedPeriods.map((period) => {
                    const dataPoint = yearlyData[metric.key]?.find((d: any) => d.period === period);
                    const val = dataPoint?.value;
                    return (
                        <div key={period} className="flex justify-between items-center text-xs border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                            <span className="font-bold text-slate-400">{period}</span>
                            <span className="font-mono text-slate-700">
                                {val !== undefined && val !== null ? val.toLocaleString(undefined, { maximumFractionDigits: 1 }) : '—'}
                            </span>
                        </div>
                    );
                })}

                {hasMore && !showAll && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAll(true);
                        }}
                        className="w-full mt-2 py-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
                    >
                        View Full History ({periods.length - 3} more)
                    </button>
                )}
            </div>
        </details>
    );
};

const FinancialTableCompact: FC<FinancialTableCompactProps> = ({
    yearlyData = {},
    fundametricsMetrics = [],
    onExplain,
    metrics,
    reliability
}) => {
    // Advanced sorting: TTM first, then chronological descending
    const periods = Array.from(
        new Set(Object.values(yearlyData).flat().map((d: any) => d.period))
    ).sort((a, b) => {
        if (a === 'TTM') return -1;
        if (b === 'TTM') return 1;

        const parsePeriod = (p: string) => {
            const parts = p.split(' ');
            if (parts.length === 2) {
                const monthMap: Record<string, string> = {
                    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
                    "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
                };
                // Format as YYYY-MM for lexicographical comparison
                return `${parts[1]}-${monthMap[parts[0]] || '00'}`;
            }
            // Fallback for year-only or unknown formats
            return p;
        };

        return parsePeriod(b).localeCompare(parsePeriod(a));
    });

    const isHighlighted = (label: string) => {
        const highlights = ['Revenue', 'EBITDA', 'Net Profit', 'EPS', 'Operating Profit', 'ROE', 'ROCE'];
        return highlights.some(h => label.includes(h));
    };

    const getMetricForCell = (metricKey: string, period: string) => {
        // Attempt to find detailed metric info in fundametricsMetrics if available
        return fundametricsMetrics.find(m =>
            m.metric_name.toLowerCase().includes(metricKey.toLowerCase()) &&
            m.period === period
        );
    };

    return (
        <>
            {/* Mobile Metric-First View */}
            <div className="md:hidden space-y-3">
                {metrics.map((m) => (
                    <MobileMetricRow
                        key={m.key}
                        metric={m}
                        yearlyData={yearlyData}
                        periods={periods}
                        isHighlighted={isHighlighted}
                    />
                ))}
            </div>

            {/* Desktop Table View - Premium Gutter Layout */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar border border-slate-200 rounded-[2.5rem] bg-slate-50/50 p-6 shadow-inner">
                <div className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm">
                    <table className="dense-table min-w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="sticky left-0 bg-slate-50 z-20 border-r border-slate-200 shadow-[4px_0_8px_rgba(0,0,0,0.02)] min-w-[200px]">
                                    Metric
                                </th>
                                {periods.map(p => (
                                    <th key={p} className="text-right border-l border-slate-100 font-black text-slate-400 uppercase tracking-[0.1em] text-[10px] py-4">
                                        {p}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((m, idx) => (
                                <tr
                                    key={m.key}
                                    className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-blue-50/30 transition-colors`}
                                >
                                    <td className={`sticky left-0 z-10 border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.02)] ${isHighlighted(m.label) ? 'font-bold text-slate-900 bg-inherit' : 'font-medium text-slate-600 bg-inherit'
                                        }`}>
                                        {m.label}
                                    </td>
                                    {periods.map(period => {
                                        const dataPoint = yearlyData[m.key]?.find((d: any) => d.period === period);
                                        const val = dataPoint?.value;
                                        const metricDetail = getMetricForCell(m.key, period);

                                        return (
                                            <td
                                                key={period}
                                                className={`text-right font-mono text-[12px] border-l border-slate-100/50 cursor-help group/cell ${val === null || val === undefined ? 'text-slate-300' : 'text-slate-700'
                                                    }`}
                                                title={metricDetail && typeof metricDetail.confidence === 'number' && !isNaN(metricDetail.confidence)
                                                    ? `Confidence: ${(metricDetail.confidence * 100).toFixed(0)}% | Source: ${metricDetail.source_provenance?.calculation_agent || 'Fundametrics Internal'}`
                                                    : undefined}
                                                onClick={() => metricDetail && onExplain?.(metricDetail)}
                                            >
                                                <div className="flex flex-col items-end">
                                                    <span>{val !== undefined && val !== null ? val.toLocaleString(undefined, { maximumFractionDigits: 1 }) : '—'}</span>
                                                    {metricDetail?.confidence !== undefined && (
                                                        <div className="h-0.5 w-full bg-slate-100 mt-0.5 rounded-full overflow-hidden opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                                            <div
                                                                className="h-full bg-emerald-400"
                                                                style={{ width: `${(metricDetail.confidence || 0) * 100}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default FinancialTableCompact;
