import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { logger } from '../utils/logger';
import { Search, ArrowRight, ShieldCheck, Activity, TrendingUp, Zap, Database, Globe, ChevronRight } from 'lucide-react';
import GlobalSearch from '../components/GlobalSearch';
import MarketIndices from '../components/MarketIndices';
import SEO from '../components/SEO';

interface CompanySummary {
  symbol: string;
  name: string;
  sector: string;
  currentPrice?: number;
}

const LandingPage = () => {
  const [stats, setStats] = useState({
    recentCompanies: [] as CompanySummary[],
    loading: true
  });

  useEffect(() => {
    const fetchFamousStocks = async () => {
      try {
        // Use NIFTY 50 to get famous stocks ensuring high quality data
        const nifty = await api.getIndexConstituents("NIFTY 50");

        let companies: CompanySummary[] = [];
        if (nifty.constituents) {
          companies = nifty.constituents.slice(0, 8).map((c: any) => ({
            symbol: c.symbol,
            name: c.name || c.symbol,
            sector: (c.sector && c.sector !== 'Unknown') ? c.sector : 'Bluechip',
            currentPrice: c.currentPrice
          }));
        }

        setStats({
          recentCompanies: companies,
          loading: false
        });
      } catch (err) {
        logger.error("Failed to load famous stocks", err);
        setStats(s => ({ ...s, loading: false }));
      }
    };
    fetchFamousStocks();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      <SEO
        title="Fundametrics | Verified Financial Intelligence"
        description="Institutional-grade financial terminal for Indian stocks. Pure data, zero bias."
      />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Radiant Gradient Top */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-24 pb-32 pt-12 lg:pt-20">

        {/* SECTION 1: HERO */}
        <section className="px-6 max-w-[1920px] mx-auto text-center flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-widest mb-10 shadow-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Verified NSE Market Data
          </div>

          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-slate-900 max-w-5xl">
            The Financial Terminal <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              For Modern India.
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-medium">
            Institutional-grade analysis for retail investors.
            <span className="text-slate-900 font-bold"> NSE Stocks.</span>
            Zero noise. Zero bias.
          </p>

          <div className="w-full max-w-2xl relative shadow-2xl shadow-blue-900/10 rounded-2xl">
            <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center gap-2">
              <div className="flex-1">
                <GlobalSearch variant="minimal" />
              </div>
            </div>
          </div>

          {/* Hero Features */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mt-16 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-blue-600" />
              Audit Traceable
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              Real-time Compute
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              Source Transparent
            </div>
          </div>
        </section>

        {/* SECTION 2: MARKET PULSE */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Market Overview</h2>
            <div className="h-px bg-slate-100 flex-1" />
          </div>
          <MarketIndices />
        </section>

        {/* SECTION 3: MARKET LEADERS STREAM */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
                Market Leaders
              </h2>
              <p className="text-slate-500 font-medium">Real-time valuation updates for top NSE constituents.</p>
            </div>
            <Link to="/stocks" className="group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all">
              View All
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.loading ? (
              // Skeleton Loaders
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[180px] bg-slate-50 border border-slate-100 rounded-2xl animate-pulse" />
              ))
            ) : (
              stats.recentCompanies.map((company) => (
                <Link key={company.symbol} to={`/stocks/${company.symbol}`}
                  className="group bg-white border border-slate-200 p-6 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[180px]">

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {company.symbol[0]}
                      </div>
                      <div className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">{company.symbol}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{company.sector}</div>
                    </div>
                    {company.currentPrice ? (
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">₹{company.currentPrice.toLocaleString('en-IN')}</div>
                        <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </div>
                      </div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[180px]">{company.name}</div>
                    <Activity size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* SECTION 4: SECTOR INTELLIGENCE (SEO Link Juice) */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Sector Intelligence</h2>
            <div className="h-px bg-slate-100 flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Banking', count: '42 Companies', icon: <TrendingUp className="text-blue-500" /> },
              { name: 'IT Services', count: '58 Companies', icon: <Zap className="text-amber-500" /> },
              { name: 'Automobile', count: '31 Companies', icon: <Activity className="text-emerald-500" /> },
              { name: 'Energy', count: '24 Companies', icon: <TrendingUp className="text-rose-500" /> },
              { name: 'Pharma', count: '45 Companies', icon: <ShieldCheck className="text-purple-500" /> },
              { name: 'Consumer', count: '62 Companies', icon: <TrendingUp className="text-indigo-500" /> },
            ].map((sector) => (
              <div key={sector.name} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-default group">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {sector.icon}
                </div>
                <div className="text-sm font-black text-slate-900 mb-1">{sector.name}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sector.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: INSTITUTIONAL COVERAGE */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none mb-6">
                  Verified Financial <br />
                  <span className="text-blue-400">Audit Trail.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                  Every data point on Fundametrics is derived directly from institutional sources with full audit traceability.
                  Clean data. No overrides.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-black text-white mb-1">638+</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">NSE Companies <br /> Tracked</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white mb-1">100%</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Verified <br /> Fact Feed</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL', 'SBIN', 'LICI', 'ITC', 'HINDUNILVR', 'LT', 'BAJFINANCE'].map(sym => (
                  <Link key={sym} to={`/stocks/${sym}`} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-black text-xs tracking-tighter transition-all">
                    {sym}
                  </Link>
                ))}
                <Link to="/stocks" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-black text-xs tracking-tighter transition-all">
                  View All Markets
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FOOTER SITEMAP (SEO Link Juice) */}
        <section className="px-6 max-w-[1920px] mx-auto border-t border-slate-100 pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Markets</h3>
              <div className="flex flex-col gap-3">
                <Link to="/indices/NIFTY%2050" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Nifty 50</Link>
                <Link to="/indices/NIFTY%20BANK" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Nifty Bank</Link>
                <Link to="/indices/SENSEX" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Sensex</Link>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Metrics</h3>
              <div className="flex flex-col gap-3">
                <Link to="/pe-ratio" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">P/E Ratio Analysis</Link>
                <Link to="/roe" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Return on Equity</Link>
                <Link to="/debt-equity-ratio" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Debt to Equity</Link>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Education</h3>
              <div className="flex flex-col gap-3">
                <Link to="/fundamental-analysis" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Fundamental Guide</Link>
                <Link to="/data-sources" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Data Verification</Link>
                <Link to="/glossary" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Financial Glossary</Link>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Company</h3>
              <div className="flex flex-col gap-3">
                <Link to="/about" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">About Fundametrics</Link>
                <Link to="/disclaimer" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Legal Disclaimer</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;
