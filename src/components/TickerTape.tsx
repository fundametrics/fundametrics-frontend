import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TickerTape = () => {
    return null;
    // DISABLED AS PER USER REQUEST

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
        const interval = setInterval(fetchPrices, 60000 * 15); // 15 mins
        return () => clearInterval(interval);
    }, []);

    if (indices.length === 0) return null;

    // Double the indices to create a seamless loop
    const validIndices = indices.filter((i: any) => {
        const label = (i.id || i.label || '').toString().toUpperCase().trim();
        return ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY BANK', 'NIFTY IT', 'BSE SENSEX'].includes(label);
    });

    // If we have few items, add some spacing/variety or just loop twice for a cleaner look
    const displayIndices = validIndices.length > 0 ? [...validIndices, ...validIndices] : [];

    if (displayIndices.length === 0) return null;

    return (
        <div className="fixed top-14 lg:top-16 left-0 right-0 w-full bg-[#020617] overflow-hidden py-1 border-b border-slate-800 z-40">
            <div className="flex animate-ticker whitespace-nowrap">
                {displayIndices.map((idx, i) => (
                    <div key={`${idx.id}-${i}`} className="inline-flex items-center gap-6 px-12 border-r border-white/5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{idx.label}</span>
                        <span className="text-[11px] font-black text-white">
                            {idx.price ? idx.price.toLocaleString('en-IN') : '—'}
                        </span>
                        {idx.change !== undefined && (
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${idx.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {idx.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {idx.changePercent ? Math.abs(idx.changePercent).toFixed(2) : '0.00'}%
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

export default TickerTape;
