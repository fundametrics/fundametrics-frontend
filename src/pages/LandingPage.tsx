import { Link } from 'react-router-dom';
import {
  Search,
  Activity,
  Zap,
  LayoutDashboard,
  BarChart3,
  Search as SearchIcon,
  ShieldCheck,
  Globe,
  ArrowRight,
  Cpu,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-manrope selection:bg-indigo-600 selection:text-white pb-20">
      <SEO
        title="Fundametrics | Indian Stock Fundamental Analysis Made Simple"
        description="Analyze Indian stocks using PE ratio, ROE, ROCE, and financial metrics. Real-time institutional-grade intelligence for retail investors. Fast and free stock screener."
      />

      <div className="relative">
        {/* 1️⃣ HERO SECTION (MOST IMPORTANT) */}
        <header className="relative px-6 pt-20 pb-20 max-w-[1100px] mx-auto text-center flex flex-col items-center">
          {/* SVG Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] leading-[1.1] text-slate-900">
              Fundamental Stock Analysis <br />
              <span className="text-indigo-600">Made Simple.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Analyze Indian stocks using PE, ROE, ROCE & financial metrics. <br className="hidden sm:block" />
              Institutional-grade intelligence for the modern investor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/stocks"
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.15em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200/50"
              >
                Explore Stocks →
              </Link>
            </div>
          </div>
        </header>

        {/* 2️⃣ QUICK STATS STRIP (OPTIONAL BUT POWERFUL) */}
        <section className="bg-slate-50 border-y border-slate-100 py-6">
          <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
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

        <main className="max-w-[1100px] mx-auto px-6 py-20 space-y-24">

          {/* 3️⃣ “HOW IT WORKS” (3 STEPS) */}
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

          {/* 4️⃣ FEATURE HIGHLIGHTS (LIGHTWEIGHT) */}
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

          {/* 5️⃣ SEO CONTENT BLOCK (IMPORTANT) */}
          <section className="py-16 border-t border-slate-100">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Stock Research</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Fundametrics helps investors analyze Indian stocks using fundamental analysis.
                Our platform provides a simplified overview of critical financial ratios including
                PE ratio, ROE, ROCE, debt, and market capitalization for NSE-listed companies.
                We focus on pure financial facts, removing market noise to help you make informed investment decisions based on primary data disclosures.
              </p>
            </div>
          </section>

          {/* 6️⃣ PRIMARY CTA SECTION */}
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
