import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TickerTape = () => {
    const [indices, setIndices] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await api.getIndicesPrices();
                setIndices(data);
            } catch (err) {
                // Silent fail for ticker
            }
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000 * 5); // 5 mins
        return () => clearInterval(interval);
    }, []);

    if (indices.length === 0) return null;

    // Double the indices to create a seamless loop (Filtered for Indian Markets)
    const validIndices = indices.filter((i: any) => {
        const label = (i.id || i.label || '').toString().toUpperCase().trim();
        return ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY BANK', 'NIFTY IT', 'BSE SENSEX'].includes(label);
    });
    // Strict filter: usage of validIndices ONLY. Never fallback to full list.
    const indianIndices = [...validIndices, ...validIndices, ...validIndices];
    console.log('[Ticker] Filtered:', indianIndices.length, 'Total:', indices.length);

    return (
        <div className="w-full bg-slate-900 overflow-hidden py-2 border-b border-slate-800 relative z-50">
            <div className="flex animate-ticker whitespace-nowrap">
                {indianIndices.map((idx, i) => (
                    <div key={`${idx.id}-${i}`} className="inline-flex items-center gap-4 px-8 border-r border-slate-800">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{idx.label}</span>
                        <span className="text-xs font-black text-white ml-1">
                            {idx.price ? idx.price.toLocaleString('en-IN') : '—'}
                        </span>
                        {idx.change !== undefined && (
                            <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${idx.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {idx.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(idx.changePercent).toFixed(2)}%
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

export default TickerTape;
