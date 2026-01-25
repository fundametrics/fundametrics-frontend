import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, ChevronRight, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { api } from '../utils/api';
import { logger } from '../utils/logger';

const MarketIndices = () => {
    const [indices, setIndices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await api.getIndicesPrices();
                setIndices(data);
            } catch (err) {
                logger.error("Failed to fetch index prices", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Check every min
        return () => clearInterval(interval);
    }, []);

    if (loading && indices.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white border border-slate-200 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(indices.length > 0 ? indices.filter((i: any) => ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY IT'].includes(i.id || i.label)) : [
                { id: 'NIFTY 50', label: 'NIFTY 50', symbol: '^NSEI' },
                { id: 'SENSEX', label: 'SENSEX', symbol: '^BSESN' },
                { id: 'BANK NIFTY', label: 'BANK NIFTY', symbol: '^NSEBANK' }
            ]).slice(0, 3).map((idx) => {
                const isPositive = (idx.change || 0) >= 0;

                return (
                    <Link
                        key={idx.id}
                        to={`/indices/${encodeURIComponent(idx.id)}`}
                        className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{idx.label}</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-black tracking-tighter text-slate-900">
                                        {idx.price ? idx.price.toLocaleString('en-IN') : '—'}
                                    </span>
                                </div>
                            </div>
                            {idx.price ? (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(idx.changePercent || 0).toFixed(2)}%
                                </div>
                            ) : (
                                <div className="px-2 py-1 bg-slate-50 text-slate-400 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <Clock size={10} />
                                    Wait Feed
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${idx.price ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    {idx.price ? 'Live Trading' : 'Feed Offline'}
                                </span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>

                        {/* Decorative accent */}
                        <div className={`absolute top-0 right-0 w-1 h-full ${idx.price ? (isPositive ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-100'}`} />
                    </Link>
                )
            })}
        </div>
    );
};

export default MarketIndices;
