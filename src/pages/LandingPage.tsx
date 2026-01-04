import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Search, ArrowRight, ShieldCheck, Activity, BarChart3, Users, Zap, Database, Clock, Cpu, ArrowUpRight, Globe, Lock } from 'lucide-react';
import GlobalSearch from '../components/GlobalSearch';
import MarketIndices from '../components/MarketIndices';
import SEO from '../components/SEO';

const LandingPage = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    recentSymbols: [] as string[],
    loading: true
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const stocks = await api.getStocks();
        const symbolList = stocks.companies
          ? stocks.companies.map(c => c.symbol)
          : (stocks.symbols || []);

        setStats({
          totalCompanies: stocks.total || 0,
          recentSymbols: symbolList.slice(0, 8),
          loading: false
        });
      } catch (err) {
        setStats(s => ({ ...s, loading: false }));
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SEO
        title="Fundametrics | Structured Company Fundamentals & Disclosures"
        description="The ultimate financial terminal for Indian stocks. Get deep insights into factual P&L, Balance Sheets, and Cash Flow disclosures. Automated data extraction from public filings."
      />
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative space-y-16 pb-24 pt-12 lg:pt-16">

        {/* SECTION 1: HERO & COMMAND */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">

              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Public Company Data.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 mt-2">
                  Structured. On Demand.
                </span>
              </h1>

              <div className="max-w-xl">
                <p className="text-lg font-medium text-slate-600 leading-relaxed">
                  Explore structured public data for NSE-listed companies — transparently, on demand.
                  No recommendations. No bias. Just raw company data organized for clarity.
                </p>
              </div>

              <div className="max-w-2xl bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-center gap-2">
                <div className="flex-1">
                  <GlobalSearch variant="minimal" />
                </div>
                <Link to="/stocks" className="hidden sm:flex h-12 px-8 bg-slate-900 hover:bg-black text-white rounded-xl items-center justify-center transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    Explore Stocks <ArrowRight size={14} />
                  </span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Database size={20} className="text-emerald-600" />
                  <span className="text-sm font-bold text-slate-700">Verifiable Disclosures</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">Source Transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={20} className="text-slate-600" />
                  <span className="text-sm font-bold text-slate-700">On-Demand Generation</span>
                </div>
              </div>
            </div>

            {/* Right Side: Key Metrics */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-48">
                <Cpu size={24} className="text-slate-300" />
                <div>
                  <div className="text-4xl font-black text-slate-900 tracking-tighter">Automated</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Structured Extraction</div>
                </div>
              </div>
              <div className="bg-indigo-600 p-6 rounded-2xl border border-indigo-500 shadow-sm flex flex-col justify-between h-48 text-white">
                <Globe size={24} className="text-indigo-300" />
                <div>
                  <div className="text-4xl font-black tracking-tighter">Full NSE</div>
                  <div className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-1">Registry Coverage</div>
                </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between h-48 text-white col-span-2">
                <ShieldCheck size={24} className="text-emerald-400" />
                <div>
                  <div className="text-4xl font-black tracking-tighter">No Bias</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Public Company Data • No Recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MARKET PULSE (Indices) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] bg-slate-100 px-2 py-1 rounded">Market Pulse</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <MarketIndices />
        </section>

        {/* SECTION 3: BENTO GRID (Features & Live Feed) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left Col: Live Feed (Span 8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Activity size={20} className="text-indigo-600" />
                  Global Registry Stream
                </h2>
                <Link to="/stocks" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Database</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.recentSymbols.map((sym) => (
                  <Link
                    key={sym}
                    to={`/stocks/${sym}`}
                    className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        {sym[0]}
                      </div>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{sym}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processed</div>
                    </div>
                  </Link>
                ))}
                {!stats.loading && stats.recentSymbols.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 text-sm">No live data currently available.</div>
                )}
              </div>
            </div>

            {/* Right Col: System Stats (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 rounded-2xl p-6 text-white h-full flex flex-col relative overflow-hidden">
                {/* Decorative background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Protocol: Disclosure</span>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight mb-4">
                    "We do not predict. <br /> We extract."
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                    Fundametrics rejects consensus modeling. We provide raw, audit-traceable financial extraction directly from NSE disclosures.
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Latency</span>
                      <span className="text-[10px] font-bold text-amber-400">EXCHANGE DELAYED</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Data Source</span>
                      <span className="text-[10px] font-bold text-emerald-400">PRIMARY DISCLOSURES</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;
