import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, Layers, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const indicesList = [
    { id: 'NIFTY 50', label: 'Nifty 50', desc: 'Top 50 Blue Chip Companies', constituents: 50 },
    { id: 'SENSEX', label: 'Sensex', desc: 'BSE Benchmark Index', constituents: 30 },
    { id: 'BANK NIFTY', label: 'Bank Nifty', desc: 'Liquid Banking Stocks', constituents: 12 },
    { id: 'NIFTY IT', label: 'Nifty IT', desc: 'Technology Sector Leaders', constituents: 10 },
    { id: 'NIFTY AUTO', label: 'Nifty Auto', desc: 'Automobile Industry Index', constituents: 15 },
    { id: 'NIFTY PHARMA', label: 'Nifty Pharma', desc: 'Pharmaceutical Stocks', constituents: 10 }
];

const IndicesListPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="NSE Indices - Nifty 50, Sensex, Bank Nifty & More | Fundametrics"
                description="Browse all major NSE and BSE indices including Nifty 50, Sensex, Bank Nifty, Nifty IT, Auto, and Pharma. View constituents and sector-wise breakdowns."
                canonical="https://fundametrics.in/indices/"
            />

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">
                            Market Indices
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                            <Layers size={10} />
                            NSE & BSE Benchmarks
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <TrendingUp size={14} className="text-blue-600" />
                        {indicesList.length} Indices
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="w-full px-6 py-8 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {indicesList.map((idx) => (
                        <Link
                            key={idx.id}
                            to={`/indices/${encodeURIComponent(idx.id)}`}
                            className="group bg-white border border-slate-200 p-6 md:p-8 rounded-2xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-1 transition-all text-left block"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center mb-6 transition-colors">
                                <Activity size={24} className="text-slate-400 group-hover:text-indigo-600" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors mb-2">
                                {idx.label}
                            </h3>

                            <p className="text-sm text-slate-500 font-medium mb-4">
                                {idx.desc}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {idx.constituents} Constituents
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <Layers size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                                About Market Indices
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Market indices track the performance of a group of stocks representing a particular market segment.
                                Click any index above to view its constituent companies, sector breakdown, and individual stock fundamentals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndicesListPage;
