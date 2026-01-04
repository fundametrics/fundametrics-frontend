import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import Logo from './Logo';
import { Shield, Zap, Search, LayoutGrid, Cpu, BookOpen, Menu, X, Star } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-50 px-3 py-2 rounded-lg ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-900'}`;

  const linkIconClass = (isActive: boolean) =>
    `w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`;

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-16">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

        {/* Brand Section */}
        <div className="flex items-center gap-6 h-full shrink-0">
          <Link to="/" className="flex items-center active:scale-95 transition-transform">
            <Logo />
          </Link>

          <div className="hidden lg:block w-[1px] h-6 bg-slate-100 mx-2" />

          <nav className="hidden lg:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              {({ isActive }) => (
                <>
                  <LayoutGrid className={linkIconClass(isActive)} />
                  <span>Dashboard</span>
                </>
              )}
            </NavLink>
            <NavLink to="/watchlist" className={linkClass}>
              {({ isActive }) => (
                <>
                  <Star className={linkIconClass(isActive)} />
                  <span>Watchlist</span>
                </>
              )}
            </NavLink>
            <NavLink to="/stocks" className={linkClass}>
              {({ isActive }) => (
                <>
                  <Zap className={linkIconClass(isActive)} />
                  <span>Stocks</span>
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              {({ isActive }) => (
                <>
                  <Cpu className={linkIconClass(isActive)} />
                  <span>Logic</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Global Action Bar - Compact */}
        <div className="flex-1 max-w-xl hidden md:flex items-center bg-slate-50/50 border border-slate-100 rounded-lg px-1 hover:border-slate-300 transition-colors focus-within:bg-white focus-within:border-indigo-500">
          <div className="flex-1">
            <GlobalSearch variant="minimal" />
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">CMD+K</span>
          </div>
        </div>

        {/* Mobile Search Trigger (visible only on small screens) */}
        <button className="md:hidden p-2 text-slate-500">
          <Search size={20} />
        </button>


        {/* Right Utility Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-4 shadow-xl flex flex-col gap-2">
          <NavLink to="/" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/stocks" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            Stocks
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
            Logic
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
