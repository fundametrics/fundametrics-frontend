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
        <header className="relative z-10 px-6 pt-20 pb-24 max-w-[1920px] mx-auto overflow-hidden text-center flex flex-col items-center">
          <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600/5 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Institutional Data Feed Active
            </div>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900">
              The Financial Terminal <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
                For Modern India.
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Real-time institutional-grade intelligence for retail investors.
              <span className="text-slate-900 font-bold"> Pure facts. No noise.</span>
            </p>

            <div className="w-full max-w-2xl mx-auto pt-4 group">
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-indigo-200/20 p-2 focus-within:border-indigo-500 focus-within:shadow-indigo-200/40 transition-all duration-500">
                <GlobalSearch variant="minimal" />
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-2">
                  <Zap size={10} className="text-amber-500" />
                  Real-time Valuation
                </div>
                <h2 className="text-5xl font-black tracking-[calc(-0.02em)] text-slate-900 leading-none">Market Leaders</h2>
                <p className="text-slate-500 font-medium tracking-tight text-sm">Real-time snapshots of Bluechip performance markers.</p>
              </div>
              <Link to="/stocks" className="group flex items-center gap-3 px-8 py-4 bg-slate-900 shadow-xl shadow-slate-200 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:shadow-indigo-100 transition-all duration-300">
                Access All Markets <ChevronRight size={16} className="group-hover:translate-x-1 duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stats.loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl animate-pulse border border-slate-200" />
                ))
              ) : (
                stats.recentCompanies.map((company) => (
                  <Link
                    key={company.symbol}
                    to={`/stocks/${company.symbol}`}
                    className="group relative bg-gradient-to-br from-white via-white to-slate-50/30 border-2 border-slate-200/60 p-7 rounded-3xl hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-56 overflow-hidden backdrop-blur-sm"
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-indigo-50/0 to-indigo-100/0 group-hover:from-indigo-50/50 group-hover:via-indigo-50/30 group-hover:to-indigo-100/20 transition-all duration-700 pointer-events-none" />

                    {/* Background Visual Element */}
                    <div className="absolute -bottom-8 -right-8 text-slate-200/40 group-hover:text-indigo-200/60 group-hover:scale-125 transition-all duration-700 pointer-events-none">
                      <BarChart3 size={180} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[9px] font-black text-indigo-600 uppercase tracking-[0.15em]">
                          <span className="w-1 h-1 rounded-full bg-indigo-500" />
                          {company.sector}
                        </div>
                        <div className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-none">
                          {company.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-3">
                      {company.currentPrice ? (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">₹{company.currentPrice.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-12 flex items-center">
                          <div className="px-3 py-2 bg-amber-50 rounded-xl border-2 border-amber-200/60">
                            <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                              Updating...
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-3 flex justify-between items-center border-t-2 border-slate-100 group-hover:border-indigo-100 transition-colors">
                        <div className="text-[11px] font-bold text-slate-500 truncate max-w-[180px] tracking-tight">
                          {company.name}
                        </div>
                        <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          <ArrowUpRight size={16} strokeWidth={2.5} />
                        </div>
                      </div>
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


        </main>
      </div>
    </div>
  );
};

export default LandingPage;
