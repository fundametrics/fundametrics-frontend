import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, Layers } from 'lucide-react';

const indicesList = [
    { id: 'NIFTY 50', label: 'Nifty 50', desc: 'Top 50 Blue Chip Companies' },
    { id: 'SENSEX', label: 'Sensex', desc: 'BSE Benchmark Index' },
    { id: 'BANK NIFTY', label: 'Bank Nifty', desc: 'Liquid Banking Stocks' }
];

const MarketIndices = () => {
    return (
        <section className="space-y-6" id="indices">
            <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Layers size={14} className="text-indigo-600" />
                        Core Indices
                    </h2>
                </div>
            </div>

            <div className="flex overflow-x-auto snap-x gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 hide-scroll">
                {indicesList.map((idx) => (
                    <Link
                        key={idx.id}
                        to={`/indices/${encodeURIComponent(idx.id)}`}
                        className="min-w-[85%] sm:min-w-0 snap-center bg-white border border-slate-200 p-6 md:p-8 rounded-2xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50 transition-all text-left group block"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center mb-4 md:mb-6 transition-colors">
                            <Activity size={20} className="md:w-6 md:h-6 text-slate-400 group-hover:text-indigo-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">{idx.label}</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2">{idx.desc}</p>

                        <div className="mt-6 md:mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500">
                            <span>View Constituents</span>
                            <ArrowUpRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MarketIndices;
