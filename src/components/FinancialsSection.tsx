import { useState, useMemo } from 'react';
import type { FC } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import type { ComputedMetric } from '../types';
import { ShieldCheck, TrendingUp, Table as TableIcon, BarChart3 } from 'lucide-react';
import FinancialTableCompact from './FinancialTableCompact';

interface FinancialsSectionProps {
  yearlyData?: Record<string, any[]>;
  fundametricsMetrics?: ComputedMetric[];
  onExplain?: (metric: ComputedMetric) => void;
  symbol: string;
}

const FinancialsSection: FC<FinancialsSectionProps> = ({
  yearlyData = {},
  fundametricsMetrics = [],
  onExplain,
}) => {
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [activeMetric, setActiveMetric] = useState<string>('revenue');

  // Transform yearlyData (Record<string, any[]>) into something Recharts likes
  // Usually yearlyData is { "revenue": [{period: "2024", value: 100}, ...], ... }
  const chartData = useMemo(() => {
    const periods = new Set<string>();
    Object.values(yearlyData).flat().forEach((d: any) => periods.add(d.period));

    return Array.from(periods).sort().map(period => {
      const entry: any = { period };
      Object.keys(yearlyData).forEach(metric => {
        const found = yearlyData[metric].find((d: any) => d.period === period);
        entry[metric] = found ? found.value : null;
      });
      return entry;
    });
  }, [yearlyData]);

  const tableMetrics = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'operating_profit', label: 'Operating Profit' },
    { key: 'net_income', label: 'Net Profit' },
    { key: 'eps', label: 'EPS' },
  ].filter(m => yearlyData[m.key]);

  const periods = chartData.map(d => d.period).reverse();

  return (
    <div className="space-y-6 pb-20">
      {/* Fundametrics Computed Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fundametricsMetrics.slice(10, 14).map((m, idx) => (
          <button
            key={idx}
            onClick={() => onExplain?.(m)}
            className="premium-card p-5 text-left hover:border-indigo-200 transition-colors group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.metric_name}</span>
              {m.trust_score?.grade && (
                <span className={`trust-badge ${m.trust_score.grade === 'A' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                  }`}>
                  {m.trust_score.grade}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {m.value !== null ? m.value.toLocaleString() : '—'}
              </span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">{m.unit}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Financials Container */}
      <div className="premium-card overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider underline decoration-indigo-200 decoration-2 underline-offset-4">Reported Financials (Consolidated)</h3>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setView('table')}
                className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${view === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                  <TableIcon size={12} /> Table
                </div>
              </button>
              <button
                onClick={() => setView('chart')}
                className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${view === 'chart' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                  <BarChart3 size={12} /> Chart
                </div>
              </button>
            </div>
          </div>

          {view === 'chart' && (
            <select
              value={activeMetric}
              onChange={(e) => setActiveMetric(e.target.value)}
              className="text-[11px] font-bold uppercase bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {tableMetrics.map(m => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          )}
        </div>

        <div className="p-4">
          {view === 'table' ? (
            <div className="space-y-4">
              <FinancialTableCompact
                yearlyData={yearlyData}
                fundametricsMetrics={fundametricsMetrics}
                onExplain={onExplain}
                metrics={[
                  { key: 'revenue', label: 'Revenue (Sales)' },
                  { key: 'expenses', label: 'Expenses' },
                  { key: 'operating_profit', label: 'Operating Profit (EBITDA)' },
                  { key: 'opm', label: 'OPM %' },
                  { key: 'other_income', label: 'Other Income' },
                  { key: 'interest', label: 'Interest' },
                  { key: 'depreciation', label: 'Depreciation' },
                  { key: 'pbt', label: 'Profit before tax' },
                  { key: 'tax_pct', label: 'Tax %' },
                  { key: 'net_income', label: 'Net Profit (PAT)' },
                  { key: 'eps', label: 'EPS in Rs' },
                  { key: 'dividend_payout_pct', label: 'Dividend Payout %' },
                ].filter(m => yearlyData[m.key])}
              />
            </div>
          ) : (
            <div className="h-[400px] p-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }}
                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl text-white z-50">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-800 pb-2">{label}</p>
                            <div className="space-y-3">
                              {payload.map((p: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between gap-10">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                      {p.name === activeMetric ? tableMetrics.find(m => m.key === activeMetric)?.label || p.name : p.name}:
                                    </span>
                                  </div>
                                  <span className="text-sm font-black text-white">
                                    {p.value !== null ? p.value.toLocaleString() : '—'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey={activeMetric}
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center gap-3">
          <ShieldCheck size={14} className="text-indigo-500" />
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
            All data points are extracted directly from official NSE/BSE filings (Consolidated).
            Integrity check performed via Fundametrics Audit Layer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialsSection;
