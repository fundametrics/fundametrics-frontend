import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { logger } from '../utils/logger';
import { Database, Search, Zap, Loader2, CheckCircle2, History, AlertCircle, Lock, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'fundametrics18';

interface RegistryItem {
    symbol: string;
    name: string;
    sector: string;
    status: string;
}

const AdminPage = () => {
    const [companies, setCompanies] = useState<RegistryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [processing, setProcessing] = useState<Record<string, boolean>>({});
    const [stats, setStats] = useState<any>(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('pending'); // Default to pending

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenParam = queryParams.get('token');
        const storedToken = localStorage.getItem('finox_admin_token');

        if (tokenParam === ADMIN_TOKEN || storedToken === ADMIN_TOKEN) {
            localStorage.setItem('finox_admin_token', ADMIN_TOKEN);
            setIsAuthenticated(true);
        }
    }, [location]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_TOKEN) {
            localStorage.setItem('finox_admin_token', ADMIN_TOKEN);
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid administrator password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('finox_admin_token');
        setIsAuthenticated(false);
    };

    const loadRegistry = useCallback(async (append: boolean = false) => {
        try {
            if (!append) setLoading(true);
            const skip = append ? companies.length : 0;
            const limit = 200;
            const response = await api.getRegistry(skip, limit, filterStatus);
            const newCompanies = response.companies as any || [];

            if (append) {
                setCompanies(prev => [...prev, ...newCompanies]);
            } else {
                setCompanies(newCompanies);
            }

            setHasMore(newCompanies.length === limit);
        } catch (err) {
            logger.error('Failed to load registry', err);
        } finally {
            setLoading(false);
        }
    }, [companies.length, filterStatus]);

    const loadStats = useCallback(async () => {
        try {
            const data = await api.getAdminStats();
            setStats(data);
        } catch (err) {
            logger.error('Failed to load stats', err);
        }
    }, []);

    // Load data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadRegistry();
            loadStats();
        }
    }, [isAuthenticated, loadRegistry, loadStats]);

    // Phase 27: Smart Auto-Polling when active generations are occurring
    useEffect(() => {
        if (!isAuthenticated) return;

        let pollInterval: any = null;

        // Check if any company in the current list is in 'generating' status
        const listHasGenerating = companies.some(c => c.status === 'generating');
        const isGenerating = Object.keys(processing).length > 0 || listHasGenerating || (stats?.currently_generating > 0);

        if (isGenerating) {
            pollInterval = setInterval(() => {
                loadStats();
                loadRegistry();

                // Clear local processing flags if status changed
                setProcessing(prev => {
                    const next = { ...prev };
                    let changed = false;
                    Object.keys(next).forEach(sym => {
                        const comp = companies.find(c => c.symbol === sym);
                        if (comp && comp.status !== 'not_available') {
                            delete next[sym];
                            changed = true;
                        }
                    });
                    return changed ? next : prev;
                });
            }, 5000); // 5 second polling
        }

        return () => {
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [isAuthenticated, processing, companies, stats?.currently_generating, loadStats, loadRegistry]);

    const handleGenerate = async (symbol: string) => {
        if (processing[symbol]) return;

        setProcessing(prev => ({ ...prev, [symbol]: true }));
        try {
            await api.adminGenerateCompanyData(symbol);
            // Refresh stats immediately to show "1 generating"
            loadStats();
        } catch (err) {
            logger.error('Failed to trigger generation', err);
            setProcessing(prev => {
                const next = { ...prev };
                delete next[symbol];
                return next;
            });
        }
    };

    const filtered = companies.filter(c =>
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <SEO title="Admin Login | Fundametrics" description="Restricted access.">
                    <meta name="robots" content="noindex, nofollow" />
                </SEO>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-indigo-50 rounded-2xl">
                            <Lock className="text-indigo-600" size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase text-center mb-2">Restricted Access</h2>
                    <p className="text-slate-500 text-sm text-center mb-8">Enter the administrator password to manage the NSE registry.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            />
                            {error && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-100"
                        >
                            Authorize Access
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO title="Admin Console | Fundametrics" description="Internal data generation management.">
                <meta name="robots" content="noindex, nofollow" />
            </SEO>

            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Admin Console</h1>
                            <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Secure Registry Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors mr-4"
                        >
                            Logout Session
                        </button>
                        <div className="bg-indigo-600 px-4 py-2 rounded-xl text-white shadow-lg shadow-indigo-100">
                            <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-0.5">Registry Total</span>
                            <span className="text-sm font-bold">{stats?.total_in_registry || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Database size={20} className="text-indigo-600" />
                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Total Data Available</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{stats?.total_data_generated || 0}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap size={20} className="text-amber-500" />
                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Currently Generating</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{stats?.currently_generating || 0}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <History size={20} className="text-slate-400" />
                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Ingested Companies</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{stats?.total_data_generated || 0}</div>
                    </div>
                </div>

                {/* List Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-2 bg-slate-200/50 p-1 rounded-xl shrink-0">
                            <button
                                onClick={() => setFilterStatus('pending')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filterStatus === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Pending Only
                            </button>
                            <button
                                onClick={() => setFilterStatus('')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filterStatus === '' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Show All
                            </button>
                        </div>

                        <div className="flex-1 flex items-center gap-4 w-full">
                            <Search size={20} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by symbol or name..."
                                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-900 w-full placeholder:text-slate-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Company</th>
                                    <th className="px-6 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Sector</th>
                                    <th className="px-6 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Registry Status</th>
                                    <th className="px-6 py-3 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">Loading Registry...</td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">No matches found.</td></tr>
                                ) : (
                                    filtered.map((company) => (
                                        <tr key={company.symbol} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{company.symbol}</div>
                                                <div className="text-xs text-slate-400 font-medium">{company.name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{company.sector}</td>
                                            <td className="px-6 py-4">
                                                {company.status === 'available' ? (
                                                    <div className="flex items-center gap-1.5 text-emerald-600">
                                                        <CheckCircle2 size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Available</span>
                                                    </div>
                                                ) : company.status === 'generating' ? (
                                                    <div className="flex items-center gap-1.5 text-amber-500 animate-pulse">
                                                        <Loader2 size={14} className="animate-spin" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Generating...</span>
                                                    </div>
                                                ) : company.status === 'failed' ? (
                                                    <div className="flex items-center gap-1.5 text-rose-500">
                                                        <AlertCircle size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Failed</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <AlertCircle size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Not Available</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {company.status === 'not_available' || company.status === 'failed' ? (
                                                    <button
                                                        onClick={() => handleGenerate(company.symbol)}
                                                        disabled={processing[company.symbol]}
                                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${processing[company.symbol]
                                                            ? 'bg-amber-100 text-amber-600 cursor-wait'
                                                            : company.status === 'failed'
                                                                ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100'
                                                                : 'bg-indigo-600 hover:bg-slate-900 text-white shadow-lg shadow-indigo-100'}`}
                                                    >
                                                        {processing[company.symbol] ? (
                                                            <>
                                                                <Loader2 size={12} className="animate-spin" />
                                                                Processing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Zap size={12} />
                                                                {company.status === 'failed' ? 'Retry Data' : 'Generate Data'}
                                                            </>
                                                        )}
                                                    </button>
                                                ) : company.status === 'generating' ? (
                                                    <button disabled className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                                                        <Loader2 size={12} className="animate-spin" />
                                                        Processing...
                                                    </button>
                                                ) : (
                                                    <button disabled className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <CheckCircle2 size={12} />
                                                        Generated
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Load More Button */}
                    {!loading && hasMore && filtered.length === companies.length && (
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => loadRegistry(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-100"
                            >
                                <Database size={14} />
                                Load More Companies
                            </button>
                            <p className="text-xs text-slate-400 mt-2 font-medium">
                                Showing {companies.length} companies. Click to load more.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
