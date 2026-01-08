import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Search, BookOpen, Layers, FileText, Activity, PieChart, MoreHorizontal, Newspaper } from 'lucide-react';

const MobileBottomNav = () => {
    const { pathname } = useLocation();

    // Check if we are on a stock detail page (e.g. /stocks/BHEL)
    // Exclude /stocks root page
    const isStockPage = pathname.startsWith('/stocks/') && pathname.split('/').length > 2;

    // Global Navigation
    const globalNavItems = [
        { id: 'home', label: 'Home', icon: LayoutGrid, path: '/', isAnchor: false },
        { id: 'stocks', label: 'Stocks', icon: Search, path: '/stocks', isAnchor: false },
        { id: 'indices', label: 'Indices', icon: Layers, path: '/indices', isAnchor: false },
        { id: 'logic', label: 'Logic', icon: BookOpen, path: '/about', isAnchor: false },
    ];

    // Company Context Navigation (for Stock Detail Page)
    // Uses anchor links to jump to sections in CompanyPage
    const companyNavItems = [
        { id: 'snapshot', label: 'Snapshot', icon: LayoutGrid, path: '#snapshot', isAnchor: true },
        { id: 'financials', label: 'Financials', icon: FileText, path: '#pl', isAnchor: true },
        { id: 'compare', label: 'Compare', icon: Activity, path: '#comparison', isAnchor: true },
        { id: 'news', label: 'News', icon: Newspaper, path: '#news', isAnchor: true },
        { id: 'more', label: 'More', icon: MoreHorizontal, path: '#documents', isAnchor: true },
    ];

    const currentNavItems = isStockPage ? companyNavItems : globalNavItems;

    const isActive = (path: string) => {
        if (isStockPage) {
            // simpler check for anchors - ideally active state tracks scroll position but simple "active" is hard with anchors
            // we'll just highlight if specifically clicked? Or maybe just simple style.
            return false; // Visual highlighting for anchors is tricky without scroll spy context here. Keeping neutral.
        }
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const handleScroll = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 lg:hidden pb-safe">
            <div className="flex items-center justify-around h-16">
                {currentNavItems.map((item) => (
                    item.isAnchor ? (
                        <button
                            key={item.id}
                            onClick={() => handleScroll(item.path)}
                            className="flex flex-col items-center justify-center w-full h-full gap-1 text-slate-400 hover:text-slate-600 active:text-indigo-600 transition-colors"
                        >
                            <item.icon size={20} strokeWidth={2} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ) : (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive(item.path)
                                ? 'text-indigo-600'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`${isActive(item.path) ? 'fill-indigo-100' : ''}`}
                                strokeWidth={isActive(item.path) ? 2.5 : 2}
                            />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default MobileBottomNav;
