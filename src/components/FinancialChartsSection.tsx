import { FC, useState } from 'react';
import type { Reliability } from '../types';
import { AlertCircle, Clock } from 'lucide-react';
import {
    ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend, AreaChart, Area, LineChart
} from 'recharts';

interface FinancialChartsSectionProps {
    yearlyData: Record<string, any[]>;
    reliability?: Reliability | null;
}

const FinancialChartsSection: FC<FinancialChartsSectionProps> = ({ yearlyData, reliability }) => {
    const [activeTab, setActiveTab] = useState('revenue');

    // Common Periods Extraction
    const periods = Array.from(new Set(
        Object.values(yearlyData).flat().map((d: any) => d.period)
    )).sort();

    const chartData = periods.map(period => {
        const entry: any = { period };
        Object.keys(yearlyData).forEach(key => {
            const found = yearlyData[key].find((d: any) => d.period === period);
            entry[key] = found ? found.value : null;
        });
        return entry;
    });

    const renderChartContainer = (title: string, children: React.ReactNode) => (
        <div className="premium-card p-4 sm:p-6 flex flex-col h-[300px] sm:h-[380px] bg-white border border-slate-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1">{title}</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Yearly Financial Trend</span>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%" minHeight={100}>
                    {children as any}
                </ResponsiveContainer>
            </div>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl text-white z-50">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-800 pb-2">{label}</p>
                    <div className="space-y-3">
                        {payload.map((p: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between gap-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{p.name}:</span>
                                </div>
                                <span className="text-sm font-black text-white">
                                    {p.value !== null ? (typeof p.value === 'number' ? p.value.toLocaleString(undefined, { maximumFractionDigits: 1 }) : p.value) : '—'}
                                    {p.unit || ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    const charts = {
        revenue: (
            renderChartContainer("Revenue & Net Profit Trend", (
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', fontWeight: '900', paddingTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                    <Bar dataKey="revenue" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} name="Rev" />
                    <Line type="monotone" dataKey="net_income" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} name="Profit" />
                </ComposedChart>
            ))
        ),
        margins: (
            renderChartContainer("Operating & Net Margins (%)", (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorOpm" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '900', paddingTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                    <Area type="monotone" dataKey="operating_profit_margin" stroke="#10b981" fillOpacity={1} fill="url(#colorOpm)" name="OPM %" strokeWidth={2} />
                    <Area type="monotone" dataKey="net_profit_margin" stroke="#6366f1" fillOpacity={0.05} fill="#6366f1" name="NPM %" strokeWidth={2} />
                </AreaChart>
            ))
        ),
        capital: (
            renderChartContainer("Capital Structure Evolution", (
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '10px', fontWeight: '900', paddingTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                    <Bar dataKey="reserves" stackId="a" fill="#1e293b" name="Equity" radius={[0, 0, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="borrowings" stackId="a" fill="#94a3b8" name="Debt" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </ComposedChart>
            ))
        ),
        efficiency: (
            renderChartContainer("Profitability & Efficiency Trends", (
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '900', paddingTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                    <Line type="stepAfter" dataKey="roe" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} name="ROE %" />
                    <Line type="stepAfter" dataKey="roce" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} name="ROCE %" />
                </LineChart>
            ))
        )
    };

    const tabs = [
        { id: 'revenue', label: 'Growth' },
        { id: 'margins', label: 'Margins' },
        { id: 'capital', label: 'Debt' },
        { id: 'efficiency', label: 'Ratios' },
    ];

    return (
        <div className="space-y-6">
            {/* Mobile Tabs */}
            <div className="flex lg:hidden bg-slate-100 p-1 rounded-lg overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-[80px] py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${activeTab === tab.id
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Mobile View (Active Tab Only) */}
            <div className="block lg:hidden">
                {charts[activeTab as keyof typeof charts]}
            </div>

            {/* Desktop View (Grid) */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
                {charts.revenue}
                {charts.margins}
                {charts.capital}
                {charts.efficiency}
            </div>

            <div className="premium-card p-6 bg-slate-50 border-slate-200 border-dashed text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Historical Data Trends</span>
            </div>
        </div>
    );
};

export default FinancialChartsSection;
