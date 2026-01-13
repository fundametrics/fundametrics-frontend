import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, TrendingUp, Activity, BarChart3, PieChart } from 'lucide-react';

const POPULAR_STOCKS = [
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'LICI',
    'KOTAKBANK', 'LT', 'BAJFINANCE', 'AXISBANK', 'ASIANPAINT', 'MARUTI', 'TITAN', 'SUNPHARMA', 'HCLTECH', 'ADANIENT'
];

interface TermContent {
    title: string;
    description: string;
    long_description: React.ReactNode;
    icon: any;
}

const GLOSSARY: Record<string, TermContent> = {
    '/pe-ratio': {
        title: 'Price-to-Earnings (P/E) Ratio',
        description: 'A valuation ratio of a company\'s current share price compared to its per-share earnings.',
        icon: TrendingUp,
        long_description: (
            <>
                <p>
                    The <strong>Price-to-Earnings Ratio</strong> (P/E Ratio) is one of the most widely used tools for valuing a company.
                    It answers the question: <em>"How much am I paying for every ₹1 of earnings?"</em>
                </p>
                <h3>How to Calculate PE Ratio</h3>
                <div className="p-4 bg-slate-100 rounded-lg font-mono text-sm my-4">
                    P/E Ratio = Market Price per Share / Earnings per Share (EPS)
                </div>
                <p>
                    A high P/E ratio could mean that a company's stock is over-valued, or else that investors are expecting high growth rates in the future.
                    Companies that have no earnings or that are losing money do not have a P/E ratio because there is nothing to put in the denominator.
                </p>
            </>
        )
    },
    '/roe': {
        title: 'Return on Equity (ROE)',
        description: 'A measure of financial performance calculated by dividing net income by shareholders\' equity.',
        icon: Activity,
        long_description: (
            <>
                <p>
                    <strong>Return on Equity (ROE)</strong> is a measure of a corporation's profitability in relation to stockholders’ equity.
                    It tells you how good the company is at generating returns on the investment it received from its shareholders.
                </p>
                <div className="p-4 bg-slate-100 rounded-lg font-mono text-sm my-4">
                    ROE = Net Income / Shareholders' Equity
                </div>
                <p>
                    A consistent and high ROE is often a sign of a high-quality business with a durable competitive advantage (moat).
                    Investors often look for companies with ROE greater than 15% over a period of 5-10 years.
                </p>
            </>
        )
    },
    '/roce': {
        title: 'Return on Capital Employed (ROCE)',
        description: 'A financial ratio that can be used in assessing a company\'s profitability and capital efficiency.',
        icon: BarChart3,
        long_description: (
            <>
                <p>
                    <strong>Return on Capital Employed (ROCE)</strong> is a financial ratio that measures a company's profitability and the efficiency with which its capital is employed.
                    Unlike ROE, which only looks at equity, ROCE considers debt as well.
                </p>
                <div className="p-4 bg-slate-100 rounded-lg font-mono text-sm my-4">
                    ROCE = EBIT / (Total Assets - Current Liabilities)
                </div>
                <p>
                    This makes ROCE exceptionally useful for analyzing capital-intensive sectors like power, telecom, and infrastructure, where companies carry significant debt.
                </p>
            </>
        )
    },
    '/debt-equity-ratio': {
        title: 'Debt-to-Equity Ratio',
        description: 'A ratio used to evaluate a company\'s financial leverage and solventy.',
        icon: PieChart,
        long_description: (
            <>
                <p>
                    The <strong>Debt-to-Equity (D/E) Ratio</strong> is calculated by dividing a company’s total liabilities by its shareholder equity.
                    It reflects how much debt a company is using to finance its assets relative to the value of shareholders’ equity.
                </p>
                <p className="mt-4">
                    A high D/E ratio is often associated with high risk; it means that a company has been aggressive in financing its growth with debt.
                    Generally, a D/E ratio below 1.0 is considered safe, though this varies by industry.
                </p>
            </>
        )
    },
    '/fundamental-analysis': {
        title: 'Fundamental Analysis',
        description: 'A method of evaluating a security in an attempt to measure its intrinsic value.',
        icon: BookOpen,
        long_description: (
            <>
                <p>
                    <strong>Fundamental analysis</strong> is a method of determining a stock's real or "fair market" value.
                    Fundamental analysts search for stocks that are currently trading at prices that are higher or lower than their real value.
                </p>
                <p className="mt-4">
                    This involves examining economic factors (Interest rates, GDP), industry trends, and company-specific data (Balance Sheets, P&L Statements).
                    The goal is to answer: <em>"Is this business a good long-term investment?"</em>
                </p>
            </>
        )
    }
};

const GlossaryPage = () => {
    const location = useLocation();
    const content = GLOSSARY[location.pathname];

    if (!content) {
        return <Navigate to="/stocks" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{content.title} - Definition & Analysis | Fundametrics</title>
                <meta name="description" content={`${content.description}. Learn how to analyze ${content.title} for Indian stocks.`} />
                <link rel="canonical" href={`https://fundametrics.in${location.pathname}`} />
            </Helmet>

            <div className="bg-white min-h-screen">
                <div className="w-full max-w-4xl mx-auto px-6 py-20">

                    <div className="mb-10 flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <content.icon size={32} />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Financial Glossary</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
                        {content.title}
                    </h1>

                    <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed mb-16">
                        {content.long_description}
                    </div>

                    {/* Internal Silo Linking */}
                    <div className="border-t border-slate-100 pt-16">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Analyze {content.title} for Top Stocks</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {POPULAR_STOCKS.map(symbol => (
                                <Link
                                    key={symbol}
                                    to={`/stocks/${symbol}`}
                                    className="p-3 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-between transition-all group"
                                >
                                    {symbol}
                                    <span className="text-slate-300 group-hover:text-indigo-500">→</span>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <Link to="/stocks" className="text-indigo-600 font-bold hover:underline">
                                View all 2000+ Stocks
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default GlossaryPage;
