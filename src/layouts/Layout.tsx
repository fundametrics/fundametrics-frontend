import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import PageSkeleton from '../components/PageSkeleton';
import TickerTape from '../components/TickerTape';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="hidden lg:block sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Mobile Top Bar (Simplified) */}
      <div className="lg:hidden h-14 bg-white border-b border-slate-100 flex items-center justify-center sticky top-0 z-50">
        <Logo size="sm" />
      </div>

      {/* Ticker Tape - Fixed below header on Home only */}
      {isHome && <TickerTape />}

      <main className="flex-1 pb-20 lg:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
