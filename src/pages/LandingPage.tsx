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
import { useWatchlist } from '../hooks/useWatchlist';
import { useRecentActivity } from '../hooks/useRecentActivity';

interface CompanySummary {
  symbol: string;
  name: string;
  sector: string;
  currentPrice?: number;
}

const LandingPage = () => {
  const { watchlist } = useWatchlist();
  const { recentStocks } = useRecentActivity();

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-manrope selection:bg-indigo-600 selection:text-white pb-20">
      <SEO
        title="Fundametrics Terminal | Indian Market Intelligence"
        description="Institutional-grade financial terminal for NSE stocks. Verified data, zero noise."
      />

      <div className="relative overflow-hidden">
        {/* Modern Terminal Halo Backdrop */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Hero Section - Reduced Margins & Premium Spacing */}
        <header className="relative z-10 px-6 pt-12 sm:pt-20 pb-20 max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm transition-all hover:border-indigo-200 group">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-indigo-700 uppercase tracking-[0.15em] font-manrope">
                Professional Market Intel Active
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] text-slate-900">
              The Financial Terminal <br />
              <span className="text-indigo-600">For Modern India.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Institutional-grade data for the discerning investor. <br className="hidden sm:block" />
              <span className="text-slate-900 font-bold">Pure facts. Zero bias. No noise.</span>
            </p>

            <div className="w-full max-w-2xl mx-auto pt-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[22px] blur opacity-10 group-focus-within:opacity-25 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-indigo-100/20 p-2 focus-within:border-indigo-500/50 focus-within:shadow-2xl focus-within:shadow-indigo-500/10 transition-all duration-300">
                  <GlobalSearch variant="minimal" />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Database size={14} strokeWidth={2.5} /></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audit Verified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg"><Zap size={14} strokeWidth={2.5} /></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg"><ShieldCheck size={14} strokeWidth={2.5} /></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Feeds</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 px-6 max-w-7xl mx-auto space-y-32">

          {/* USER DASHBOARD QUICK-GRID */}
          {(watchlist.length > 0 || recentStocks.length > 0) && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="bg-slate-900 rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                      Your Terminal
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-none uppercase italic">Workspace Monitor</h3>
                    <p className="text-slate-400 font-medium text-sm">Quick analysis access for your priority assets.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {watchlist.length > 0 && (
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Priority (Watchlist)</h4>
                        <div className="flex flex-wrap gap-2">
                          {watchlist.slice(0, 5).map(s => (
                            <Link key={s} to={`/company/${s}`} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/10">{s}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {recentStocks.length > 0 && (
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Inquiries</h4>
                        <div className="flex flex-wrap gap-3">
                          {recentStocks.slice(0, 6).map(s => (
                            <Link key={s} to={`/company/${s}`} className="text-xs font-bold text-slate-300 hover:text-indigo-400 transition-colors">{s}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MARKET PULSE SECTION */}
          <section id="market-pulse" className="space-y-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-xl shadow-indigo-200/50">
                    <Activity size={18} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">Global Nodes</h2>
                </div>
                <h3 className="text-4xl font-black tracking-tight text-slate-900 leading-none italic uppercase">Market Intelligence</h3>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Core Engine Online</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[32px] p-2 shadow-xl shadow-slate-200/40">
              <MarketIndices />
            </div>
          </section>

          {/* ASSET DISCOVERY - BENTO GRID */}
          <section id="leaders" className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <ArrowUpRight size={12} className="text-indigo-600" /> Discovery Hub
                </div>
                <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 italic uppercase leading-none">Market Leaders</h3>
                <p className="text-slate-500 font-medium text-sm">Automated evaluation of high-cap institutional favorites.</p>
              </div>
              <Link to="/stocks" className="group px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200">
                Explore All Assets
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stats.loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-56 bg-white rounded-3xl animate-pulse border border-slate-200" />
                ))
              ) : (
                stats.recentCompanies.map((company) => (
                  <Link
                    key={company.symbol}
                    to={`/stocks/${company.symbol}`}
                    className="group relative bg-white border border-slate-200/80 rounded-[28px] p-6 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col justify-between h-56"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Analyze →</div>
                        <h4 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic leading-none">{company.symbol}</h4>
                      </div>
                      <span className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <Zap size={16} strokeWidth={2.5} />
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 truncate">{company.name}</p>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Pricing Node</span>
                          <div className="text-xl font-black text-slate-900">
                            {company.currentPrice ? `₹${company.currentPrice.toLocaleString('en-IN')}` : '---'}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-tighter">
                          Live Feed
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* SECTOR INTELLIGENCE - MODERN BENTO */}
          <section id="sectors" className="space-y-12 pb-20">
            <div className="text-center space-y-4">
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 italic uppercase">Systematic Intelligence</h3>
              <p className="text-slate-500 font-medium max-w-xl mx-auto">Deep-dive into specialized market verticals with machine-driven performance monitoring.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2 p-10 bg-slate-900 rounded-[40px] text-white relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-[1.6] transition-transform duration-1000"><Globe size={200} /></div>
                <div className="relative z-10 space-y-6">
                  <div className="p-3 bg-indigo-600 w-fit rounded-2xl shadow-xl shadow-indigo-500/30">
                    <LayoutDashboard size={24} />
                  </div>
                  <h4 className="text-5xl font-black tracking-tighter leading-[0.9] uppercase italic">Sectoral <br /> Heatmaps</h4>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-sm">Dynamic cross-correlation of all NSE indices with instant drift detection.</p>
                </div>
                <Link to="/stocks" className="relative z-10 mt-10 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400 hover:text-white transition-colors">
                  Access Neural Grid <ArrowRight size={18} />
                </Link>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'Financials', color: 'text-blue-500', bg: 'bg-blue-50/50', icon: <TrendingUp size={20} /> },
                  { name: 'Technology', color: 'text-amber-500', bg: 'bg-amber-50/50', icon: <Cpu size={20} /> },
                  { name: 'Energy', color: 'text-indigo-500', bg: 'bg-indigo-50/50', icon: <Zap size={20} /> },
                  { name: 'Pharma', color: 'text-rose-500', bg: 'bg-rose-50/50', icon: <ShieldAlert size={20} /> },
                ].map((s) => (
                  <div key={s.name} className="p-8 bg-white border border-slate-200 rounded-[32px] hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between gap-10">
                    <div className={`w-14 h-14 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {s.icon}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-2xl font-black text-slate-900 italic uppercase leading-none">{s.name}</h5>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Analysis Node</span>
                    </div>
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
