import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand & Mission */}
          <div className="space-y-4 max-w-sm">
            <Logo />
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Mechanical financial intelligence for the modern analyst. Zero speculation, 100% audit-verified facts.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
            <div>
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Platform</h5>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Dashboard</Link></li>
                <li><Link to="/stocks" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Catalogue</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Science</h5>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Methodology</Link></li>
                <li><Link to="/about#audit" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Audit Trail</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Legal</h5>
              <ul className="space-y-3">
                <li><Link to="/disclaimer" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Terms</Link></li>
                <li><Link to="/privacy" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="border-t border-dashed border-slate-200 pt-8 mt-8">
          <div className="flex items-start gap-3">
            <ShieldCheck size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
                Regulatory Disclosure: Fundametrics is a financial data aggregation platform, not a SEBI registered investment advisor.
              </p>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-4xl">
                All content presented herein—including financial ratios, ownership structures, and market indices—is derived programmatically from public disclosures and exchange data. This information is for educational and research purposes only and does not constitute a recommendation to buy, sell, or hold any securities. Past performance of any metric or index is not indicative of future results. User discretion is advised.
              </p>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-2">
                © {new Date().getFullYear()} Fundametrics. Systems Active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
