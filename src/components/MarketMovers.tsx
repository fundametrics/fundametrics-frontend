import { useEffect, useState } from 'react';
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
        // Mock data for Market Movers (since real-time % changes require live price updates)
        const mockGainers: MiniCompany[] = [
            { symbol: 'ADANIPORTS', name: 'Adani Ports & Special Economic Zone Ltd', changePercent: 5.23 },
            { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', changePercent: 4.87 },
            { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', changePercent: 3.92 },
            { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', changePercent: 3.45 },
            { symbol: 'COALINDIA', name: 'Coal India Ltd', changePercent: 2.98 }
        ];

        const mockLosers: MiniCompany[] = [
            { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', changePercent: -4.12 },
            { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Ltd', changePercent: -3.67 },
            { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Ltd', changePercent: -2.89 },
            { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life Insurance Company Ltd', changePercent: -2.34 },
            { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', changePercent: -1.98 }
        ];

        setGainers(mockGainers);
        setLosers(mockLosers);
        setLoading(false);
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
