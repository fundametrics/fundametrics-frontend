import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ShieldCheck, Activity, Globe, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-24">
      <div className="max-w-[1920px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Logo size="md" />
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              Institutional-grade financial intelligence for the modern Indian market. Pure data, zero bias, and 100% audit-verified facts.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <Activity size={18} />
              <Globe size={18} />
              <Zap size={18} />
            </div>
          </div>

          {/* Links Grid */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Platform</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Terminal</Link></li>
              <li><Link to="/stocks" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Market Map</Link></li>
              <li><Link to="/watchlist" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Watchlist</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Markets</h5>
            <ul className="space-y-2">
              <li><Link to="/indices/NIFTY%2050" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Nifty 50</Link></li>
              <li><Link to="/indices/SENSEX" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Sensex</Link></li>
              <li><Link to="/indices/NIFTY%20BANK" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Nifty Bank</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Science</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Data Integrity</Link></li>
              <li><Link to="/data-sources" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Sourcing</Link></li>
              <li><Link to="/glossary" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Definitions</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Compliance</h5>
            <ul className="space-y-2">
              <li><Link to="/disclaimer" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Disclaimer</Link></li>
              <li><Link to="/admin" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-tight italic border-t border-slate-50 pt-2">System Terminal</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="border-t border-slate-100 pt-12 mt-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="p-2 bg-slate-50 rounded-lg shrink-0">
              <ShieldCheck size={20} className="text-slate-400" />
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] leading-relaxed">
                Regulatory Disclosure: Fundametrics is an algorithmic data aggregation ecosystem.
              </p>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-6xl">
                All financial analytics—including ratios, constituents, and indices—are computed programmatically from public disclosures.
                Data presented is for research and comparative analysis only and does not constitute investment advice.
                Users are encouraged to verify data points against original exchange filings. No warranties are provided for real-time accuracy.
              </p>
              <div className="flex justify-between items-center pt-4">
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">
                  © {new Date().getFullYear()} Fundametrics Terminal. Version 1.2
                </p>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Global Feed Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
