import type { FC } from 'react';
import type { ComputedMetric } from '../types';
import { ShieldCheck, ArrowRight, ArrowUpRight, ArrowDownRight, Minus, AlertTriangle } from 'lucide-react';
import { deriveTrendMetaFromDrift, trendTooltip } from '../utils/trendTooltip';

interface InsightTileProps {
    metric: ComputedMetric;
    onExplore: (metric: ComputedMetric) => void;
}

const getInsightNarrative = (metric: ComputedMetric) => {
    const name = metric.metric_name.toLowerCase();

    if (metric.value === null || metric.value === undefined) {
        return { headline: "Data Unavailable", sub: "Insufficient data to generate specific insights for this period." };
    }

    const val = metric.value;
    const drift = metric.drift;

    if (name.includes('roe')) {
        if (val > 25) return { headline: "Elite Capital Efficiency", sub: "Exceptional returns relative to equity base." };
        if (val > 15) return { headline: "Strong Capital Usage", sub: "Efficiently deploying shareholder capital for growth." };
        if (val > 10) return { headline: "Stable Capital Efficiency", sub: "Generating consistent but moderate equity returns." };
        return { headline: "Sub-par Efficiency", sub: "Equity returns are currently below institutional benchmarks." };
    }

    if (name.includes('pe ratio') || name.includes('p/e')) {
        if (val > 60) return { headline: "Hyper-Growth Pricing", sub: "Valuation requires sustained exceptional earnings growth." };
        if (val > 35) return { headline: "Premium Growth Valuation", sub: "Trading at a significant premium to broad market averages." };
        if (val > 15) return { headline: "Standard Market Pricing", sub: "Valuation is aligned with moderate growth expectations." };
        return { headline: "Undervalued / Conservative", sub: "Trading at a discount, potentially reflecting market caution." };
    }

    if (name.includes('debt to equity') || name.includes('d/e')) {
        if (val > 2) return { headline: "High Leverage Profile", sub: "Heavy reliance on debt capital; monitor interest coverage." };
        if (val > 1) return { headline: "Moderate Leverage", sub: "Balanced mix of debt and equity financing." };
        return { headline: "Conservative Capital Structure", sub: "Strong balance sheet with minimal reliance on external debt." };
    }

    if (name.includes('current ratio')) {
        if (val > 2) return { headline: "Robust Liquidity", sub: "Ample short-term assets to cover all maturing liabilities." };
        if (val > 1) return { headline: "Adequate Liquidity", sub: "Current assets sufficiently cover short-term obligations." };
        return { headline: "Liquidity Constraint", sub: "Strained working capital position; monitor cash flows." };
    }

    if (name.includes('roce')) {
        if (val > 20) return { headline: "High Operating Return", sub: "Generating superior returns on all capital employed." };
        if (val > 12) return { headline: "Efficient Operations", sub: "Capital is being deployed profitably across the business." };
        return { headline: "Low Asset Productivity", sub: "Return on employed capital is below the cost of capital." };
    }

    // Show actual value-based insights instead of drift warnings
    return { headline: "Stable Trajectory", sub: "Metric is within historical standard deviation ranges." };
};

const InsightTile: FC<InsightTileProps> = ({ metric, onExplore }) => {
    const { headline, sub } = getInsightNarrative(metric);

    return (
        <div className="premium-card p-5 group flex flex-col justify-between hover:border-indigo-200 transition-all cursor-default">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.metric_name}</h4>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {headline}
                        </p>
                    </div>
                    {metric.trust_score && (
                        <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            <ShieldCheck size={10} className="text-slate-400" />
                            <span className="text-[9px] font-bold text-slate-600">{metric.trust_score.grade}</span>
                        </div>
                    )}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed min-h-[32px]">
                    {sub}
                </p>

                <TrendInsight metric={metric} />
            </div>

            <button
                onClick={() => onExplore(metric)}
                className="mt-6 flex items-center justify-between p-2 rounded-lg bg-slate-50 group-hover:bg-indigo-50 transition-colors text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest"
            >
                Examine Trace
                <ArrowRight size={12} />
            </button>
        </div>
    );
};

const TrendInsight = ({ metric }: { metric: ComputedMetric }) => {
    const trendMeta = deriveTrendMetaFromDrift(metric.drift);
    const tooltip = trendTooltip(trendMeta.direction, {
        period: metric.period,
        metricName: metric.metric_name,
        emphasis: trendMeta.emphasis,
    });

    const { icon: Icon, label, tone } = (() => {
        if (trendMeta.emphasis === 'volatility') {
            return { icon: AlertTriangle, label: 'Volatility Detected', tone: 'text-amber-600' };
        }
        if (trendMeta.direction === 'up') {
            return { icon: ArrowUpRight, label: 'Improving Trend', tone: 'text-sky-600' };
        }
        if (trendMeta.direction === 'down') {
            return { icon: ArrowDownRight, label: 'Declining Trend', tone: 'text-slate-600' };
        }
        return { icon: Minus, label: 'Stable Trend', tone: 'text-slate-400' };
    })();

    return (
        <div className="flex items-center gap-2 pt-3 text-[11px] font-semibold text-slate-400" title={tooltip} aria-label={tooltip}>
            <span className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 ${tone}`}>
                <Icon size={12} strokeWidth={2} />
            </span>
            <span className="leading-tight">{label}</span>
        </div>
    );
};

export default InsightTile;
