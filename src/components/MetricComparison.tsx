import { useState } from 'react';
import { api } from '../utils/api';
import type { ComputedMetric } from '../types';

interface MetricComparisonProps {
    metricA: ComputedMetric;
    metricB: ComputedMetric;
}

const MetricComparison = ({ metricA, metricB }: MetricComparisonProps) => {
    const [checking, setChecking] = useState(false);
    const [result, setResult] = useState<{ comparable: boolean; reason: string | null } | null>(null);

    const performCheck = async () => {
        setChecking(true);
        try {
            const res = await api.checkComparison(metricA, metricB);
            setResult(res);
        } catch (e) {
            setResult({ comparable: false, reason: "Verification service unavailable." });
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-50 pb-6">
                <h3 className="text-lg font-bold text-neutral-900">Integrity Check</h3>
                <button
                    onClick={performCheck}
                    disabled={checking}
                    className="px-6 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-neutral-800 disabled:opacity-50 transition-all"
                >
                    {checking ? 'Verifying...' : 'Check Comparability'}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Base Metric</p>
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <p className="font-bold text-neutral-900">{metricA.metric_name}</p>
                        <p className="text-xs text-neutral-500">{metricA.period}</p>
                        <div className="mt-2 text-[10px] font-bold text-blue-600">TRUST: {metricA.trust_score?.grade}</div>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Target Metric</p>
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <p className="font-bold text-neutral-900">{metricB.metric_name}</p>
                        <p className="text-xs text-neutral-500">{metricB.period}</p>
                        <div className="mt-2 text-[10px] font-bold text-blue-600">TRUST: {metricB.trust_score?.grade}</div>
                    </div>
                </div>
            </div>

            {result && (
                <div className={`mt-6 p-6 rounded-2xl border transition-all animate-in fade-in slide-in-from-top-2 ${result.comparable
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-900'
                        : 'bg-rose-50 border-rose-100 text-rose-900'
                    }`}>
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${result.comparable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide">
                                {result.comparable ? 'Valid Comparison' : 'Comparison Blocked'}
                            </p>
                            <p className="text-xs mt-1 leading-relaxed opacity-80">
                                {result.reason || 'This comparison is statistically valid based on scope and unit alignment.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetricComparison;
