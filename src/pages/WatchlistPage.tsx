import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, Trash2, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../utils/api';
import { useWatchlist } from '../hooks/useWatchlist';

interface CompanyListItem {
    symbol: string;
    name: string;
    sector: string;
    marketCap?: number;
    roe?: number;
    pe?: number;
}

const WatchlistPage = () => {
    const { watchlist, toggleWatchlist } = useWatchlist();
    const [companies, setCompanies] = useState<CompanyListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (watchlist.length > 0) {
            loadWatchlistData();
        } else {
            setCompanies([]);
            setLoading(false);
        }
    }, [watchlist]);

    const loadWatchlistData = async () => {
        try {
            const response = await api.getRegistry(0, 100).catch(err => {
                console.error('API call failed for watchlist', err);
                return { companies: [] };
            });

            if (response && Array.isArray(response.companies)) {
                const watchlistData = response.companies
                    .filter(c => watchlist.includes(c.symbol))
                    .map(c => ({
                        symbol: c.symbol,
                        name: c.name || c.symbol,
                        sector: c.sector || 'NSE Listed',
                        marketCap: c.marketCap || 0,
                        roe: c.roe || 0,
                        pe: c.pe || 0,
                    }));
                setCompanies(watchlistData);
            } else {
                setCompanies([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to load watchlist data:', error);
            setLoading(false);
        }
    };

    const handleClearWatchlist = () => {
        if (window.confirm('Clear all companies from your watchlist?')) {
            localStorage.removeItem('fundametrics_watchlist');
            window.location.reload();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Watchlist...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Bookmark className="text-indigo-600 fill-indigo-50" size={32} />
                            Your Watchlist
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Tracking {watchlist.length} companies across your sessions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {watchlist.length > 0 && (
                            <button
                                onClick={handleClearWatchlist}
                                className="px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Clear All
                            </button>
                        )}
                        <Link
                            to="/stocks"
                            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200"
                        >
                            Browse All
                        </Link>
                    </div>
                </div>

                {watchlist.length === 0 ? (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bookmark className="text-slate-300" size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Your watchlist is empty</h3>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">
                            Start adding companies to your watchlist to track them here. Click the <span className="font-bold text-slate-900">Bookmark</span> icon on any company page.
                        </p>
                        <Link to="/stocks" className="inline-block mt-8 text-indigo-600 font-bold hover:underline">
                            Explore companies →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {companies.map((company) => (
                            <div key={company.symbol} className="premium-card bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <Link to={`/stocks/${company.symbol}`} className="flex-1">
                                            <h3 className="text-xl font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                                {company.name}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5 line-clamp-1">
                                                {company.symbol}
                                            </p>
                                        </Link>
                                        <button
                                            onClick={() => toggleWatchlist(company.symbol)}
                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            title="Remove from watchlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Market Cap</span>
                                            <span className="text-sm font-mono font-black text-slate-900">₹{company.marketCap?.toLocaleString()}</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">ROE</span>
                                            <span className="text-sm font-mono font-black text-indigo-600">{company.roe?.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-50">
                                        <Link
                                            to={`/stocks/${company.symbol}`}
                                            className="flex items-center justify-between text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] group/link"
                                        >
                                            View Terminal Details
                                            <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center transform group-hover/link:translate-x-1 transition-transform">
                                                <TrendingUp size={10} className="text-white" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;
