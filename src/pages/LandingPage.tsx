import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Search, ArrowRight, ShieldCheck, Activity, BarChart3, Users, Zap, Database, Clock, Cpu, ArrowUpRight, Globe, Lock, TrendingUp } from 'lucide-react';
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
    totalCompanies: 0,
    recentCompanies: [] as CompanySummary[],
    loading: true
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const stocks = await api.getStocks();
        // Handle both legacy and new API responses
        let companies: CompanySummary[] = [];
        if (stocks.companies) {
          companies = stocks.companies.map((c: any) => ({
            symbol: c.symbol,
            name: c.name || c.symbol,
            sector: c.sector || 'General',
            currentPrice: c.currentPrice
          }));
        } else if (stocks.symbols) {
          // Fallback for very old API cache
          companies = stocks.symbols.map((s: string) => ({ symbol: s, name: s, sector: 'General' }));
        }

        setStats({
          totalCompanies: stocks.total || 0,
          recentCompanies: companies.slice(0, 8),
          loading: false
        });
      } catch (err) {
        console.error("Failed to load landing stats", err);
        setStats(s => ({ ...s, loading: false }));
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-indigo-500 selection:text-white">
      <SEO
        title="Fundametrics | Verified Financial Intelligence"
        description="Institutional-grade financial terminal for Indian stocks. Pure data, zero bias."
      />

      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 space-y-20 pb-24 pt-16 lg:pt-24">

        {/* SECTION 1: HERO */}
        <section className="px-6 max-w-[1920px] mx-auto text-center flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Live Market Data Now Available
          </div>

          <h1 className="text-5xl sm:text-7xl xl:text-9xl font-black tracking-tighter leading-[0.85] mb-8 bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent max-w-5xl">
            Financial Truth.<br />
            <span className="text-indigo-500">Engineered.</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12">
            Reject consensus. Access audit-traceable financial extraction directly from NSE disclosures. No opinions. Just raw, structured intelligence.
          </p>

          <div className="w-full max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              <div className="flex-1">
                <GlobalSearch variant="minimal" />
              </div>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 w-full max-w-5xl opacity-80 hover:opacity-100 transition-opacity">
            <div className="bg-neutral-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl text-left hover:border-indigo-500/30 transition-colors">
              <Database className="text-indigo-400 mb-4" size={24} />
              <div className="text-2xl font-black">2000+</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Companies Covered</div>
            </div>
            <div className="bg-neutral-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl text-left hover:border-emerald-500/30 transition-colors">
              <Zap className="text-emerald-400 mb-4" size={24} />
              <div className="text-2xl font-black">500ms</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Extraction Latency</div>
            </div>
            <div className="bg-neutral-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl text-left hover:border-blue-500/30 transition-colors">
              <ShieldCheck className="text-blue-400 mb-4" size={24} />
              <div className="text-2xl font-black">100%</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Audit Traceability</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MARKET PULSE */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Market Pulse</h2>
            <div className="h-px bg-neutral-800 flex-1" />
          </div>
          <MarketIndices />
        </section>

        {/* SECTION 3: GLOBAL REGISTRY STREAM */}
        <section className="px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Activity className="text-emerald-500" />
              Global Registry Stream
            </h2>
            <Link to="/stocks" className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold uppercase tracking-widest transition-colors">
              View Full Database
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.recentCompanies.map((company) => (
              <Link key={company.symbol} to={`/stocks/${company.symbol}`}
                className="group bg-neutral-800/40 border border-white/5 p-5 rounded-xl hover:bg-neutral-800 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden">

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-lg font-black tracking-tight group-hover:text-indigo-400 transition-colors">{company.symbol}</div>
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider truncate max-w-[150px]">{company.sector}</div>
                  </div>
                  {company.currentPrice ? (
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">₹{company.currentPrice.toLocaleString('en-IN')}</div>
                      <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Live</div>
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-neutral-700 animate-pulse" title="Price pending" />
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{company.name}</div>
                  <ArrowUpRight size={12} className="text-indigo-500" />
                </div>
              </Link>
            ))}

            {!stats.loading && stats.recentCompanies.length === 0 && (
              <div className="col-span-full py-12 text-center text-neutral-600 border border-dashed border-neutral-800 rounded-xl">
                Awaiting feed data...
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;
