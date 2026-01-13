
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Types
interface CompanyData {
    symbol: string;
    name: string;
    sector: string;
    description?: string;
    stats: {
        price: number;
        marketCap: number;
        pe: number;
        roe: number;
        roce: number;
        debtToEquity: number;
    };
    financials: {
        year: string;
        revenue: number;
        profit: number;
        margin: number;
    }[];
}

const CompanyPageRefactored: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Logic
    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // Replace with your actual API endpoint logic
                const response = await fetch(`https://fundametrics-backend.onrender.com/api/companies/${slug}`);
                if (!response.ok) throw new Error('Failed to fetch company data');
                const json = await response.json();

                // Transform API response to match our interface if necessary
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    // SEO Helper
    const getSEO = () => {
        if (!data) return { title: 'Company Analysis | Fundametrics', desc: 'Loading...' };
        return {
            title: `${data.symbol} Share Price, Fundamentals, Financials & Analysis | Fundametrics`,
            desc: `Analyze ${data.name} (${data.symbol}) fundamentals. View Balance Sheet, Profit & Loss, PE Ratio, ROE, and shareholding pattern. Detailed financial analysis.`,
            canonical: `https://fundametrics.in/company/${slug}`
        };
    };

    const seo = getSEO();

    // JSON-LD Schema
    const schemaData = data ? {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Corporation",
                "name": data.name,
                "tickerSymbol": `NSE:${data.symbol}`,
                "legalName": data.name,
                "url": `https://fundametrics.in/company/${data.symbol}`
            },
            {
                "@type": "FinancialProduct",
                "name": `${data.symbol} Stock Fundamentals`,
                "symbol": data.symbol,
                "exchangeTicker": `NSE:${data.symbol}`,
                "description": `Financial fundamentals and structural analysis of ${data.name}.`
            }
        ]
    } : null;

    if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Loading fundamentals...</div>;
    if (error || !data) return <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">Error: {error}</div>;

    return (
        <>
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.desc} />
                <link rel="canonical" href={seo.canonical} />
                {schemaData && <script type="application/ld+json">{JSON.stringify(schemaData)}</script>}
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-baseline gap-4 mb-2">
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{data.name}</h1>
                        <span className="text-xl font-bold text-slate-400">{data.symbol}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{data.sector}</p>
                </header>

                {/* Key Metrics Cards */}
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    <MetricCard label="Market Cap" value={`₹${(data.stats.marketCap / 1000).toFixed(2)}Cr`} />
                    <MetricCard label="P/E Ratio" value={data.stats.pe.toFixed(2)} />
                    <MetricCard label="ROE" value={`${data.stats.roe}%`} />
                    <MetricCard label="ROCE" value={`${data.stats.roce}%`} />
                    <MetricCard label="Current Price" value={`₹${data.stats.price}`} highlight />
                    <MetricCard label="Debt to Equity" value={data.stats.debtToEquity.toString()} />
                </section>

                {/* Financials Table */}
                <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">Annual Performance</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Year</th>
                                    <th className="px-6 py-3 text-right">Revenue</th>
                                    <th className="px-6 py-3 text-right">Net Profit</th>
                                    <th className="px-6 py-3 text-right">Margin %</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.financials.map((row) => (
                                    <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{row.year}</td>
                                        <td className="px-6 py-4 text-right text-slate-600">₹{row.revenue}</td>
                                        <td className="px-6 py-4 text-right text-emerald-600 font-bold">₹{row.profit}</td>
                                        <td className="px-6 py-4 text-right text-slate-600">{row.margin}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

// Internal Sub-components for cleanliness
const MetricCard: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
        <p className="text-xl font-black tracking-tight">{value}</p>
    </div>
);

export default CompanyPageRefactored;
