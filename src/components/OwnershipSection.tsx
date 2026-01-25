import type { FC } from 'react';
import type { ShareholdingBlock } from '../types';
import { TrendingUp, TrendingDown, Minus, PieChart, ShieldCheck, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface OwnershipSectionProps {
  shareholding?: ShareholdingBlock | null;
  periodLabel?: string;
}

const OwnershipSection: FC<OwnershipSectionProps> = ({ shareholding, periodLabel }) => {
  if (!shareholding || shareholding.status !== 'available') {
    return (
      <div className="premium-card p-12 text-center text-slate-400 bg-white border border-slate-200">
        <p className="text-sm font-medium">Ownership disclosures not available for this period.</p>
      </div>
    );
  }

  const latestHistory = shareholding.history?.[0];
  const previousHistory = shareholding.history?.[1];

  // Prepare chart data (reversed to show chronological order left-to-right)
  const chartData = shareholding.history
    ? [...shareholding.history]
      .filter(h => {
        const year = parseInt(h.period?.match(/(\d{4})/)?.[1] || "0");
        return year >= 2020;
      })
      .reverse()
      .map(h => ({
        period: h.period,
        Promoters: h.promoter || 0,
        FIIs: h.fii || 0,
        DIIs: h.dii || 0,
        Public: h.public || 0
      }))
    : [];

  const categories = [
    { key: 'promoter', label: 'Promoters' },
    { key: 'fii', label: 'FIIs' },
    { key: 'dii', label: 'DIIs' },
    { key: 'public', label: 'Public' },
  ] as const;

  const data = latestHistory ? categories.map(cat => {
    const value = latestHistory[cat.key] ?? 0;
    const prevValue = previousHistory?.[cat.key] ?? value;
    const delta = value - prevValue;
    return { ...cat, value, delta };
  }) : [];

  return (
    <div className="space-y-8" id="ownership">
      {/* Historical Trend Chart */}
      <div className="premium-card p-8 bg-white border border-slate-200 shadow-xl shadow-slate-100/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none flex items-center gap-3">
              <Activity size={18} className="text-indigo-600" />
              Historical Pattern (5 Years)
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">2020 — 2025 Trend Evolution</p>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Source: SEBI Disclosures
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
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
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.stroke }} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{p.name}:</span>
                              </div>
                              <span className="text-sm font-black text-white">
                                {p.value !== null ? p.value.toFixed(2) : '—'}%
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
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              <Line
                type="monotone"
                dataKey="Promoters"
                stroke="#4f46e5"
                strokeWidth={4}
                dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="FIIs"
                stroke="#0f172a"
                strokeWidth={3}
                dot={{ r: 3, fill: '#0f172a', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="DIIs"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 3, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="Public"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2, fill: '#94a3b8', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">

        {/* Main Holding Table */}
        <div className="lg:col-span-3 premium-card overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-100/50">
          <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PieChart size={18} className="text-indigo-600" />
              <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Equity Distribution</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{periodLabel || 'Latest Reporting'}</span>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-black uppercase border border-emerald-100">
                <ShieldCheck size={10} /> Verified
              </div>
            </div>
          </div>

          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Stakeholder Category</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Holding (%)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">QoQ Shift</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Trend Logic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.map((row) => (
                  <tr key={row.key} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 leading-none">{row.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{row.key === 'promoter' ? 'Strategic Control Group' : 'Institutional/Public Ledger'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono text-sm font-black text-slate-900">
                      {row.value.toFixed(2)}%
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className={`inline-flex items-center gap-1 font-mono text-[11px] font-black px-2 py-1 rounded-lg ${row.delta > 0 ? 'text-emerald-600 bg-emerald-50' :
                        row.delta < 0 ? 'text-rose-600 bg-rose-50' :
                          'text-slate-400 bg-slate-50'
                        }`}>
                        {row.delta > 0 ? <TrendingUp size={12} /> : row.delta < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                        {Math.abs(row.delta).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-2 w-full max-w-[120px] bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${row.key === 'promoter' ? 'bg-indigo-600' :
                            row.key === 'fii' ? 'bg-slate-900' :
                              row.key === 'dii' ? 'bg-indigo-400' : 'bg-slate-300'
                            }`}
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Stats Card */}
        <div className="space-y-6">
          <div className="premium-card p-6 bg-slate-900 text-white flex flex-col justify-between h-48 group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <div className="relative z-10">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 block">Institutional Power</span>
              <h3 className="text-3xl font-black tracking-tight leading-none">
                {((data.find(d => d.key === 'fii')?.value || 0) + (data.find(d => d.key === 'dii')?.value || 0)).toFixed(1)}%
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Combined FII + DII Stake</p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Retail Exposure</span>
              <span className="text-sm font-black">{(data.find(d => d.key === 'public')?.value || 0).toFixed(1)}%</span>
            </div>
          </div>

          <div className="premium-card p-6 bg-white border border-slate-200">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Holding Quality</span>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-slate-100 rounded-lg overflow-hidden flex">
                <div className="h-full bg-indigo-600" style={{ width: `${data.find(d => d.key === 'promoter')?.value || 0}%` }} title="Promoters" />
                <div className="h-full bg-slate-900 border-l border-white/20" style={{ width: `${data.find(d => d.key === 'fii')?.value || 0}%` }} title="FIIs" />
                <div className="h-full bg-indigo-400 border-l border-white/20" style={{ width: `${data.find(d => d.key === 'dii')?.value || 0}%` }} title="DIIs" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-[9px] font-black text-slate-500 uppercase">Promoters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
                <span className="text-[9px] font-black text-slate-500 uppercase">FIIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Narrative Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shareholding.insights && shareholding.insights.length > 0 ? (
          shareholding.insights.map((insight, idx) => (
            <div key={idx} className="premium-card p-5 bg-white border border-slate-200 hover:border-indigo-200 transition-colors shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                <Activity size={14} className="text-indigo-600" />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">{insight.title}</h4>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">{insight.description}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">No ownership anomalies detected.</p>
          </div>
        )}
      </div>

      {/* Historical Table View */}
      <div className="premium-card overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-100/50">
        <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-indigo-600" />
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Shareholding History Table</h3>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest sticky left-0 bg-slate-50 z-10">Period</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Promoters (%)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">FIIs (%)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">DIIs (%)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Public (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shareholding.history?.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-black text-slate-900 sticky left-0 bg-inherit z-10">{h.period}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-700 text-right">{(h.promoter || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-700 text-right">{(h.fii || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-700 text-right">{(h.dii || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-700 text-right">{(h.public || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnershipSection;
