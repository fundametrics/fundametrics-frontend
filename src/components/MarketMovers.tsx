import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface MiniCompany {
    symbol: string;
    name?: string;
    price?: number;
    changePercent?: number;
}

const MarketMovers = () => {
    const [gainers, setGainers] = useState<MiniCompany[]>([]);
    const [losers, setLosers] = useState<MiniCompany[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch Top 5 Gainers (highest changePercent first, DESC order)
                const gainersRes = await api.getStocks(0, 5, 'changePercent', -1, {});

                // Fetch Top 5 Losers (lowest changePercent first, ASC order)
                const losersRes = await api.getStocks(0, 5, 'changePercent', 1, {});

                if (gainersRes && Array.isArray(gainersRes.companies)) {
                    // Filter out stocks with 0% change, but fallback to raw list if empty to avoid UI blankness
                    const companies = gainersRes.companies as any[];
                    const validGainers = companies.filter(c => c.changePercent && c.changePercent > 0);
                    setGainers(validGainers.length > 0 ? validGainers.slice(0, 5) : companies.slice(0, 5));
                }
                if (losersRes && Array.isArray(losersRes.companies)) {
                    const companies = losersRes.companies as any[];
                    const validLosers = companies.filter(c => c.changePercent && c.changePercent < 0);
                    setLosers(validLosers.length > 0 ? validLosers.slice(0, 5) : companies.slice(0, 5));
                }
            } catch (err) {
                console.error("Failed to fetch market movers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return null; // Or a skeleton, but for landing page silence is better than jank

    const MoverCard = ({ title, data, type }: { title: string, data: MiniCompany[], type: 'gainers' | 'losers' }) => (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    {type === 'gainers' ? <TrendingUp size={20} className="text-emerald-500" /> : <TrendingDown size={20} className="text-rose-500" />}
                    {title}
                </h3>
                <Link to="/stocks" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    View All <ArrowRight size={12} />
                </Link>
            </div>
            <div className="space-y-3">
                {data.map((company) => (
                    <Link key={company.symbol} to={`/stocks/${company.symbol}`} className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div>
                            <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{company.symbol}</div>
                            <div className="text-[10px] text-slate-400 font-bold truncate max-w-[120px]">{company.name || company.symbol}</div>
                        </div>
                        <div className={`text-right font-black text-xs ${type === 'gainers' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {company.changePercent ? (company.changePercent > 0 ? '+' : '') + company.changePercent.toFixed(2) + '%' : '—'}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MoverCard title="Top Gainers" data={gainers} type="gainers" />
                <MoverCard title="Top Losers" data={losers} type="losers" />
            </div>
        </section>
    );
};

export default MarketMovers;
