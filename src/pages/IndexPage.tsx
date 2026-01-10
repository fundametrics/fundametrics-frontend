import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { ArrowLeft, TrendingUp, Layers, Activity } from 'lucide-react';

interface Constituent {
    symbol: string;
    name: string;
    sector: string;
    currentPrice?: number;
}

const IndexPage = () => {
    const { indexId } = useParams<{ indexId: string }>();
    const [constituents, setConstituents] = useState<Constituent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConstituents = async () => {
            if (!indexId) return;
            setLoading(true);
            setError(null);
            try {
                // Decode URI component because params like "NIFTY 50" might be encoded
                const cleanId = decodeURIComponent(indexId);
                const data = await api.getIndexConstituents(cleanId);
                setConstituents(data.constituents);
            } catch (err) {
                console.error('Failed to fetch constituents:', err);
                setError('Failed to load companies for this index. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchConstituents();
    }, [indexId]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Simple Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">
                                {decodeURIComponent(indexId || '')}
                            </h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                <Layers size={10} />
                                Constituent Breakdown
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="w-full px-6 py-8 max-w-[1920px] mx-auto">
                {error ? (
                    <div className="p-12 text-center bg-white border border-slate-200 rounded-xl">
                        <p className="text-slate-500 font-medium">{error}</p>
                        <Link to="/" className="text-indigo-600 font-bold mt-4 inline-block">Return Home</Link>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="h-32 bg-white rounded-xl border border-slate-200 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {constituents.length === 0 ? (
                            <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl text-slate-400">
                                <p className="text-sm font-bold uppercase tracking-widest">No constituents found for this index.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {constituents.map((item) => (
                                    <Link
                                        key={item.symbol}
                                        to={`/stocks/${item.symbol}`}
                                        className="group bg-white border border-slate-200 p-5 rounded-xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50/50 hover:-translate-y-1 transition-all flex flex-col justify-between h-[160px]"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <span className="text-lg font-black text-slate-900 group-hover:text-indigo-600 uppercase transition-colors tracking-tight">
                                                    {item.symbol}
                                                </span>
                                                <Activity size={14} className="text-slate-300 group-hover:text-indigo-400" />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-2 mt-2 leading-relaxed">
                                                {(item.name && item.name.toUpperCase() !== 'UNKNOWN') ? item.name : item.symbol}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span
                                                    className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate w-full block"
                                                    title={(item.sector && item.sector !== 'Unknown') ? item.sector : 'Market Weighted'}
                                                >
                                                    {(item.sector && item.sector !== 'Unknown') ? item.sector : 'Market Weighted'}
                                                </span>
                                                {item.currentPrice && (
                                                    <span className="text-sm font-bold text-slate-900 mt-1">
                                                        ₹{item.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                )}
                                            </div>
                                            <TrendingUp size={12} className="text-emerald-500 mb-auto mt-1" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexPage;
