import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { logger } from '../utils/logger';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Activity,
  TrendingUp,
  Zap,
  Database,
  Globe,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Search as SearchIcon,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import GlobalSearch from '../components/GlobalSearch';
import MarketIndices from '../components/MarketIndices';
import TickerTape from '../components/TickerTape';
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
        const nifty = await api.getIndexConstituents("NIFTY 50");
        let companies: CompanySummary[] = [];
        if (nifty.constituents) {
          companies = nifty.constituents.slice(0, 12).map((c: any) => ({
            symbol: c.symbol,
            name: c.name || c.symbol,
            sector: (c.sector && c.sector !== 'Unknown') ? c.sector : 'Bluechip',
            currentPrice: c.currentPrice
          }));
        }
        setStats({ recentCompanies: companies, loading: false });
      } catch (err) {
        logger.error("Failed to load famous stocks", err);
        setStats(s => ({ ...s, loading: false }));
      }
    };
    fetchFamousStocks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      <SEO
        title="Terminal | Fundametrics | Indian Stock Intelligence"
        description="Institutional-grade financial terminal for NSE stocks. Verified data, zero noise."
      />

      {/* Top Ticker Tape */}
      <TickerTape />

      <div className="relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />

        {/* Hero Dashboard Section */}
        <header className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-[1920px] mx-auto overflow-hidden text-center flex flex-col items-center">
          <div className="max-w-4xl space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600/5 border border-indigo-100 text-indigo-700 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Institutional Data Feed Active
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] text-slate-900 px-2">
              The Financial Terminal <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
                For Modern India.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Real-time institutional-grade intelligence for retail investors.
              <span className="text-slate-900 font-bold"> Pure facts. No noise.</span>
            </p>

            <div className="w-full max-w-2xl mx-auto pt-4 group px-4">
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-indigo-200/20 p-2 focus-within:border-indigo-500 focus-within:shadow-indigo-200/40 transition-all duration-500">
                <GlobalSearch variant="minimal" />
              </div>
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2"><Database size={14} className="text-indigo-600" /> Audit Traceable</div>
                <div className="flex items-center gap-2"><Zap size={14} className="text-amber-500" /> Real-time Compute</div>
                <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Verified Sourcing</div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 px-6 max-w-[1920px] mx-auto space-y-24 pb-32">

          {/* MARKET PULSE SECTION */}
          <section id="market-pulse">
            <div className="flex items-center justify-between mb-10 overflow-hidden border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-indigo-600 rounded text-white shadow-sm shadow-indigo-200">
                  <Activity size={14} />
                </div>
                <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em]">Global Indices Overview</h2>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Market Pulse Live</span>
              </div>
            </div>
            <MarketIndices />
          </section>

          {/* MARKET LEADERS SECTION */}
          <section id="leaders">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-2">
                  <Zap size={10} className="text-amber-500" />
                  Real-time Valuation
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[calc(-0.02em)] text-slate-900 leading-none">Market Leaders</h2>
                <p className="text-slate-500 font-medium tracking-tight text-sm">Real-time snapshots of Bluechip performance markers.</p>
              </div>
              <Link to="/stocks" className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 shadow-xl shadow-slate-200 text-white rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:shadow-indigo-100 transition-all duration-300">
                Access All Markets <ChevronRight size={16} className="group-hover:translate-x-1 duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {stats.loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-slate-200" />
                ))
              ) : (
                stats.recentCompanies.map((company) => (
                  <Link
                    key={company.symbol}
                    to={`/stocks/${company.symbol}`}
                    className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between h-48"
                  >
                    {/* Sector Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-wider">
                        {company.sector}
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-1 group-hover:text-indigo-600 transition-colors">
                        {company.symbol}
                      </h3>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide truncate">
                        {company.name}
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      {company.currentPrice ? (
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Current Price</div>
                            <div className="text-2xl font-black text-slate-900 tracking-tight">
                              ₹{company.currentPrice.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded text-[8px] text-emerald-600 font-bold uppercase">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Updating Price...</span>
                        </div>
                      )}
                    </div>
                  </Link>

                ))
              )}
            </div>
          </section>

          {/* SECTOR INTELLIGENCE */}
          <section id="sectors">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10"><Globe size={200} /></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight mb-4 leading-tight">Sectoral <br /><span className="text-indigo-400">Intelligence.</span></h3>
                    <p className="text-slate-300 font-medium leading-relaxed mb-8">
                      Deep-dive into specialized market sectors with real-time performance tracking and growth metrics.
                    </p>
                  </div>
                  <Link to="/stocks" className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-colors">
                    Explore Heatmaps <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {[
                  { name: 'Financials', tag: 'Banking/Insurance', icon: <TrendingUp className="text-blue-500" />, gradient: 'from-blue-50 to-blue-100/50' },
                  { name: 'Technology', tag: 'IT Services', icon: <Zap className="text-amber-500" />, gradient: 'from-amber-50 to-amber-100/50' },
                  { name: 'Automobile', tag: 'Manufacturing', icon: <Activity className="text-emerald-500" />, gradient: 'from-emerald-50 to-emerald-100/50' },
                  { name: 'Healthcare', tag: 'Pharma', icon: <ShieldCheck className="text-rose-500" />, gradient: 'from-rose-50 to-rose-100/50' },
                  { name: 'Energy', tag: 'Oil & Gas', icon: <TrendingUp className="text-indigo-500" />, gradient: 'from-indigo-50 to-indigo-100/50' },
                  { name: 'Consumer', tag: 'FMCG/Retail', icon: <TrendingUp className="text-orange-500" />, gradient: 'from-orange-50 to-orange-100/50' },
                ].map((sector) => (
                  <div key={sector.name} className={`p-7 bg-gradient-to-br ${sector.gradient} border-2 border-slate-200 rounded-3xl hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer group`}>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all">
                      {sector.icon}
                    </div>
                    <div className="text-xl font-black text-slate-900 mb-1.5 tracking-tight">{sector.name}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{sector.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>


        </main >
      </div >
    </div >
  );
};

export default LandingPage;
