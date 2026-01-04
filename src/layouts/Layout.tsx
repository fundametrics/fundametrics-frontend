import Logo from '../components/Logo';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="hidden lg:block sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Mobile Top Bar (Simplified) */}
      <div className="lg:hidden h-14 bg-white border-b border-slate-100 flex items-center justify-center sticky top-0 z-40">
        <Logo size="sm" />
      </div>

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
