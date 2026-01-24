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
        <header className="relative z-10 px-6 pt-12 pb-16 max-w-[1920px] mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600/5 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Institutional Data Feed Active
              </div>

              <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-[0.9] text-slate-900">
                Pulse of the <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
                  Indian Market.
                </span>
              </h1>

              <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
                The most transparent financial terminal for retail investors.
                <span className="text-slate-900 font-bold"> Clean facts. No bias.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="w-full max-w-md group">
                  <div className="relative bg-white border border-slate-200 rounded-xl shadow-xl shadow-indigo-100 p-1.5 focus-within:border-indigo-500 transition-all duration-300">
                    <GlobalSearch variant="minimal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Database size={20} /></div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Database Coverage</div>
                </div>
                <div className="text-3xl font-black text-slate-900">638+</div>
                <div className="text-[11px] font-bold text-slate-400 mt-2">Active NSE Symbols</div>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck size={20} /></div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Trust Engine</div>
                </div>
                <div className="text-3xl font-black text-slate-900">100%</div>
                <div className="text-[11px] font-bold text-slate-400 mt-2">Verified Audit Trail</div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {stats.loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-slate-100" />
                ))
              ) : (
                stats.recentCompanies.map((company) => (
                  <Link
                    key={company.symbol}
                    to={`/stocks/${company.symbol}`}
                    className="group relative bg-white border border-slate-200 p-6 rounded-[1.25rem] hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-48 overflow-hidden"
                  >
                    {/* Background Visual Element */}
                    <div className="absolute -bottom-6 -right-6 text-slate-400/5 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                      <BarChart3 size={160} />
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">
                          {company.sector}
                        </div>
                        <div className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-none">
                          {company.symbol}
                        </div>
                      </div>
                      <div className="text-right">
                        {company.currentPrice ? (
                          <div className="space-y-1 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-xl font-bold text-slate-900 tracking-tighter leading-none">₹{company.currentPrice.toLocaleString('en-IN')}</div>
                            <div className="flex items-center justify-end gap-1.5 text-[9px] text-emerald-600 font-black uppercase tracking-tighter">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              Active Live
                            </div>
                          </div>
                        ) : (
                          <div className="h-10 w-24 bg-slate-50 flex items-center justify-center rounded-lg border border-slate-100 border-dashed">
                            <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Awaiting Feed</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 flex justify-between items-center border-t border-slate-50">
                      <div className="text-[11px] font-semibold text-slate-400 truncate max-w-[200px] uppercase tracking-tight">
                        {company.name}
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={14} />
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
              <div className="lg:col-span-1 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10"><Globe size={200} /></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-4">Sectoral <br /><span className="text-indigo-400">Intelligence.</span></h3>
                    <p className="text-slate-400 font-medium leading-relaxed mb-8">
                      Deep-dive into specialized market sectors with real-time performance tracking and growth metrics.
                    </p>
                  </div>
                  <Link to="/stocks" className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white hover:text-indigo-400">
                    Explore Heatmaps <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Financials', tag: 'Banking/Insurance', icon: <TrendingUp className="text-blue-500" /> },
                  { name: 'Technology', tag: 'IT Services', icon: <Zap className="text-amber-500" /> },
                  { name: 'Automobile', tag: 'Manufacturing', icon: <Activity className="text-emerald-500" /> },
                  { name: 'Healthcare', tag: 'Pharma', icon: <ShieldCheck className="text-rose-500" /> },
                  { name: 'Energy', tag: 'Oil & Gas', icon: <TrendingUp className="text-indigo-500" /> },
                  { name: 'Consumer', tag: 'FMCG/Retail', icon: <TrendingUp className="text-orange-500" /> },
                ].map((sector) => (
                  <div key={sector.name} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 transition-all cursor-pointer group shadow-sm hover:shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {sector.icon}
                    </div>
                    <div className="text-lg font-black text-slate-900 mb-1">{sector.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sector.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VERIFIED AUDIT TRAIL */}
          <section id="trust">
            <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
              <div className="absolute bottom-0 right-0 p-24 opacity-10 rotate-12 bg-white rounded-full blur-3xl scale-150" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                    Fundametrics Verified
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.9]">
                    Pure Data. <br />
                    <span className="text-indigo-200 italic">No Overrides.</span>
                  </h2>
                  <p className="text-lg text-indigo-100 leading-relaxed font-normal">
                    Every fundamental data point on this dashboard is derived from verifiable institutional sources.
                    We don't use manual adjustments or overrides—ensuring you see the market exactly as it is.
                  </p>
                  <div className="flex items-center gap-8 pt-4">
                    <div>
                      <div className="text-3xl font-black mb-1">0.0%</div>
                      <div className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Manual Edits</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div>
                      <div className="text-3xl font-black mb-1">Verified</div>
                      <div className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Fact Sourcing</div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-3">
                    <ShieldAlert size={20} className="text-indigo-200" />
                    <h4 className="text-sm font-black uppercase tracking-tighter">Conflict Guard</h4>
                    <p className="text-[11px] text-indigo-50 font-medium">Automatic detection of conflicting financial statements.</p>
                  </div>
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-3">
                    <LayoutDashboard size={20} className="text-indigo-200" />
                    <h4 className="text-sm font-black uppercase tracking-tighter">Drill-Down</h4>
                    <p className="text-[11px] text-indigo-50 font-medium">Click any metric to see the original source filing path.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default LandingPage;
