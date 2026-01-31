import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import Logo from './Logo';
import { Shield, Zap, Search, LayoutGrid, Cpu, BookOpen, Menu, X, Star } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all hover:bg-indigo-50/50 px-4 py-2.5 rounded-xl ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900 font-manrope'}`;

  const linkIconClass = (isActive: boolean) =>
    `w-4 h-4 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`;

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Glassmorphic Background Container */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Section */}
        <div className="flex items-center gap-8 h-full shrink-0">
          <Link to="/" className="flex items-center active:scale-95 transition-all duration-200">
            <Logo />
          </Link>

          {/* Divider */}
          <div className="hidden lg:block h-8 w-[1px] bg-slate-200 mx-2" />

          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all 
                ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`
              }
            >
              <LayoutGrid size={16} strokeWidth={2.5} />
              <span className="font-manrope">Dashboard</span>
            </NavLink>

            <div className="flex items-center gap-6">
              <NavLink to="/watchlist" className={({ isActive }) => `flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                <Star size={16} strokeWidth={2.5} className="text-slate-400" />
                <span className="font-manrope">Watchlist</span>
              </NavLink>

              <NavLink to="/stocks" className={({ isActive }) => `flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                <Zap size={16} strokeWidth={2.5} className="text-slate-400" />
                <span className="font-manrope">Stocks</span>
              </NavLink>

              <NavLink to="/about" className={({ isActive }) => `flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                <Cpu size={16} strokeWidth={2.5} className="text-slate-400" />
                <span className="font-manrope">Logic</span>
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Global Action Bar - Compact Terminal Vibe */}
        <div className="flex-1 max-w-lg hidden md:flex items-center bg-slate-100/40 backdrop-blur-md border border-slate-200/60 rounded-xl px-1 hover:border-indigo-400/50 hover:bg-white transition-all duration-300 group/search focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500">
          <div className="flex-1">
            <GlobalSearch variant="minimal" />
          </div>
        </div>

        {/* Mobile Search Trigger */}
        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
          <Search size={20} />
        </button>

        {/* Right Utility Section */}
        <div className="flex items-center gap-3">
          {/* User / Settings Placeholder or Action */}
          <div className="hidden sm:block w-[1px] h-6 bg-slate-200 mx-1" />

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Institutional Style */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200 p-4 shadow-2xl animate-in slide-in-from-top-2 duration-300 flex flex-col gap-1">
          <NavLink to="/" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            <LayoutGrid size={16} />
            <span className="font-manrope font-bold tracking-wider">Dashboard</span>
          </NavLink>
          <NavLink to="/stocks" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            <Zap size={16} />
            <span className="font-manrope font-bold tracking-wider">Stocks</span>
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            <Cpu size={16} />
            <span className="font-manrope font-bold tracking-wider">Logic</span>
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
