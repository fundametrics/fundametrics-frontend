import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, Layers, TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../utils/api';

const MarketIndices = () => {
    const [indices, setIndices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await api.getIndicesPrices();
                setIndices(data);
            } catch (err) {
                console.error("Failed to fetch index prices", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrices();
        // Refresh every 2 minutes
        const interval = setInterval(fetchPrices, 120000);
        return () => clearInterval(interval);
    }, []);

    if (loading && indices.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 bg-slate-50 rounded-2xl border border-slate-100" />
                ))}
            </div>
        );
    }

    return (
        <section className="space-y-6" id="indices">
            <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Layers size={14} className="text-indigo-600" />
                        Core Indian Indices
                    </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Market Pulse
                </div>
            </div>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
                {(indices.length > 0 ? indices : []).map((idx) => (
                    <Link
                        key={idx.id}
                        to={`/indices/${encodeURIComponent(idx.id)}`}
                        className="w-full bg-white border border-slate-200 p-6 rounded-2xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50/50 transition-all text-left group block relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                                <Activity size={20} className="text-slate-400 group-hover:text-indigo-600" />
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-slate-900 tracking-tighter">
                                    {idx.price ? idx.price.toLocaleString('en-IN') : '—'}
                                </div>
                                {idx.change !== undefined && (
                                    <div className={`flex items-center justify-end gap-1 text-[11px] font-bold ${idx.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {idx.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {Math.abs(idx.change).toFixed(2)} ({Math.abs(idx.changePercent).toFixed(2)}%)
                                    </div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{idx.label}</h3>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">NSE Benchmark</p>

                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500">
                            <span>View Constituents</span>
                            <ArrowUpRight size={14} />
                        </div>

                        {/* Decorative background logo */}
                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                            <Activity size={100} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MarketIndices;
