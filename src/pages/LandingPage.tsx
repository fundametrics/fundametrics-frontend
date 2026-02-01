import { Link } from 'react-router-dom';
import {
  Search,
  Activity,
  Zap,
  LayoutDashboard,
  BarChart3,
  Search as SearchIcon,
  ShieldCheck,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import MarketMovers from '../components/MarketMovers';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is the data real-time?",
      a: "Our market data is updated in near real-time from NSE. Financial statements are updated within minutes of exchange filings."
    },
    {
      q: "Is it really free?",
      a: "Yes, Fundametrics is currently free for all retail investors. We believe institutional-grade data should be accessible to everyone."
    },
    {
      q: "How accurate is the financial data?",
      a: "We source data directly from corporate filings and exchange feeds. Our automated audit system verifies every number against the original PDF source."
    },
    {
      q: "Can I download the data?",
      a: "Currently, you can view all data on the platform. Export functionality for Excel/CSV is part of our upcoming Pro tier."
    }
  ];

  const [sectors, setSectors] = useState<Array<{ name: string, icon: string, count: string }>>([]);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const sectorList = await api.getSectors();
        // Map sectors to icons
        const sectorIconMap: Record<string, string> = {
          'BANKING': '🏦',
          'IT': '💻',
          'PHARMACEUTICALS': '💊',
          'AUTOMOBILE': '🚗',
          'AUTOMOBILES': '🚗',
          'ENERGY': '⚡',
          'FMCG': '🛒',
          'CONSUMER': '🛒',
          'METALS': '⚙️',
          'TELECOM': '📱',
          'FINANCE': '💰',
          'CEMENT': '🏭',
          'CHEMICALS': '⚗️',
          'CONSTRUCTION': '🏗️'
        };

        const mapped = sectorList.slice(0, 8).map((sector: string) => {
          const upperSector = sector.toUpperCase();
          let icon = '📈'; // Default chart icon

          // Find matching icon
          for (const [key, value] of Object.entries(sectorIconMap)) {
            if (upperSector.includes(key)) {
              icon = value;
              break;
            }
          }

          return {
            name: sector,
            icon,
            count: '50+' // Placeholder - could be fetched from API
          };
        });

        setSectors(mapped);
      } catch (err) {
        console.error('Failed to fetch sectors', err);
      }
    };

    fetchSectors();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-manrope selection:bg-indigo-600 selection:text-white pb-20">
      <SEO
        title="Fundametrics | Indian Stock Fundamental Analysis Made Simple"
        description="Analyze Indian stocks using PE ratio, ROE, ROCE, and financial metrics. Real-time institutional-grade intelligence for retail investors. Fast and free stock screener."
      />



      <div className="relative">
        {/* 1️⃣ HERO SECTION (MOST IMPORTANT) */}
        <header className="relative px-6 pt-24 pb-20 max-w-[1400px] mx-auto text-center flex flex-col items-center overflow-visible">
          {/* Animated Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse" />

          {/* SVG Hero Image / Illustration */}
          <div className="absolute top-0 inset-x-0 -z-10 flex justify-center opacity-40 mix-blend-multiply pointer-events-none overflow-hidden">
            <svg width="1000" height="600" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-in fade-in zoom-in duration-1000">
              <path d="M0 500 C 200 500, 200 400, 400 400 C 600 400, 600 200, 1000 100" stroke="url(#paint0_linear)" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
              <path d="M0 550 C 300 550, 400 450, 600 450 C 800 450, 900 300, 1000 250" stroke="url(#paint1_linear)" strokeWidth="60" strokeOpacity="0.1" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="500" x2="1000" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="0" y1="550" x2="1000" y2="250" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#c7d2fe" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[11px] uppercase tracking-widest animate-in slide-in-from-top-4 duration-700 delay-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Live Market Data
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] leading-[1.1] text-slate-900 drop-shadow-sm">
              Fundamental Stock Analysis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 animate-pulse">Made Simple.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Analyze Indian stocks using PE, ROE, ROCE & financial metrics. <br className="hidden sm:block" />
              Institutional-grade intelligence for the modern investor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                to="/stocks"
                className="group relative w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.15em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200/50 hover:shadow-indigo-300/60 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Stocks
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 skew-x-12" />
              </Link>
            </div>
          </div>
        </header>

        {/* 2️⃣ MARKET MOVERS (NEW) */}
        <MarketMovers />

        {/* 3️⃣ QUICK STATS STRIP (OPTIONAL BUT POWERFUL) */}
        <section className="bg-slate-50 border-y border-slate-100 py-6 mb-20">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-xl font-black text-indigo-600">2000+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Indian Companies</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-black text-indigo-600">Audit-Ready</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financial Ratios</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-black text-indigo-600">Fast & Free</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market Screener</div>
            </div>
          </div>
        </section>

        <main className="max-w-[1400px] mx-auto px-6 space-y-24">

          {/* 4️⃣ “HOW IT WORKS” (3 STEPS) */}
          <section id="process" className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">How it works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { step: "1", title: "Search any company", desc: "Instantly find any NSE-listed company by its name or symbol.", icon: <Search size={20} /> },
                { step: "2", title: "Analyze financial ratios", desc: "Evaluate PE, ROE, and debt metrics with institutional precision.", icon: <BarChart3 size={20} /> },
                { step: "3", title: "Make better decisions", desc: "Build conviction with 100% audit-verified financial data.", icon: <Zap size={20} /> },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-none">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5️⃣ FEATURE HIGHLIGHTS (LIGHTWEIGHT) */}
          <section id="features" className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Powerful Features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg mb-4 flex items-center justify-center"><Activity size={16} /></div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Fundamental Ratios</h4>
                <p className="text-slate-500 text-xs font-medium">Detailed tracking of PE, PB, ROE, ROCE and Debt-to-Equity ratios over multiple cycles.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg mb-4 flex items-center justify-center"><SearchIcon size={16} /></div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Smart Stock Search</h4>
                <p className="text-slate-500 text-xs font-medium">Lightning fast universal search to jump straight into any company's financial terminal.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg mb-4 flex items-center justify-center"><LayoutDashboard size={16} /></div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Sector Intelligence</h4>
                <p className="text-slate-500 text-xs font-medium">Analyze market trends by sector and compare competitors with standardized data points.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-colors">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg mb-4 flex items-center justify-center"><ShieldCheck size={16} /></div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Watchlist & Monitor</h4>
                <p className="text-slate-500 text-xs font-medium">Save your priority assets for instant access and real-time valuation tracking.</p>
              </div>
            </div>
          </section>

          {/* 6️⃣ FAQ SECTION (NEW) */}
          <section id="faq" className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Frequently Asked</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden transition-all hover:bg-slate-100">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-bold text-sm text-slate-900">{faq.q}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7️⃣ MARKET SECTORS */}
          <section className="py-16 border-t border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Explore by Sector</h2>
              <p className="text-slate-500 text-sm font-medium mt-2">Analyze companies across major Indian market sectors</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sectors.map((sector) => (
                <Link
                  key={sector.name}
                  to={`/stocks?sector=${encodeURIComponent(sector.name)}`}
                  className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sector.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">{sector.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400">{sector.count} Companies</p>
                </Link>
              ))}
            </div>
          </section>

          {/* 8️⃣ PRIMARY CTA SECTION */}
          <section className="py-16 bg-slate-900 rounded-[32px] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 space-y-6 px-6">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase">Start Analyzing Stocks Today</h2>
              <p className="text-slate-400 font-medium text-base max-w-xl mx-auto">Access 100% verified financial data for over 2,000 Indian public companies.</p>
              <Link
                to="/stocks"
                className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-white/5"
              >
                Browse All Stocks
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
