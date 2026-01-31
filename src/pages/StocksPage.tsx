import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, TrendingUp, TrendingDown, ArrowUpDown, Filter,
  ChevronDown, ChevronUp, X, BarChart3, PieChart, Activity
} from 'lucide-react';
import { api } from '../utils/api';
import { logger } from '../utils/logger';
import SEO from '../components/SEO';

interface CompanyListItem {
  symbol: string;
  name: string;
  sector: string;
  marketCap?: number;
  roe?: number;
  roce?: number;
  pe?: number;
  debt?: number;
  changePercent?: number;
}

type SortField = 'name' | 'marketCap' | 'roe' | 'roce' | 'pe' | 'debt';
type SortDirection = 'asc' | 'desc';

const StocksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State for raw data
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);

  // Filter State (Sync with URL or defaults)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSector, setSelectedSector] = useState(searchParams.get('sector') || 'all');
  const [minCap, setMinCap] = useState(searchParams.get('minCap') || '');
  const [maxCap, setMaxCap] = useState(searchParams.get('maxCap') || '');
  const [minROE, setMinROE] = useState(searchParams.get('minROE') || '');
  const [maxPE, setMaxPE] = useState(searchParams.get('maxPE') || '');

  // Sort State
  const [sortField, setSortField] = useState<SortField>((searchParams.get('sort') as SortField) || 'name');
  const [sortDirection, setSortDirection] = useState<SortDirection>((searchParams.get('dir') as SortDirection) || 'asc');

  // UI State
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Fetch data with server-side sorting and ADAVANCED filtering (Phase 6)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Map sortDirection to MongoDB order (1 for asc, -1 for desc)
        const order = sortDirection === 'asc' ? 1 : -1;

        // Pass current filters to the API
        const filters = {
          sector: selectedSector,
          minCap,
          maxCap,
          minROE,
          maxPE
        };

        // Fetch from optimized, filter-aware API
        const response = await api.getStocks(0, 200, sortField, order, filters).catch(err => {
          logger.error("API call failed", err);
          return { companies: [], total: 0 };
        });

        if (response && Array.isArray(response.companies)) {
          const mapped = response.companies.map((c: any) => ({
            symbol: c.symbol,
            name: c.name || c.symbol,
            sector: c.sector || 'General',
            marketCap: c.marketCap || undefined,
            roe: c.roe || undefined,
            roce: c.roce || undefined,
            pe: c.pe || undefined,
            debt: c.debt || undefined,
            changePercent: c.changePercent || undefined
          }));
          setCompanies(mapped);
          setTotal(response.total || mapped.length);
        } else {
          setCompanies([]);
          setTotal(0);
        }
        setLoading(false);
      } catch (err) {
        logger.error("Failed to load data", err);
        setCompanies([]);
        setLoading(false);
      }
    };

    // De-bounce for rapid filter changes
    const timer = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timer);
  }, [sortField, sortDirection, selectedSector, minCap, maxCap, minROE, maxPE]); // Refetch when filters change

  // Update URL search params whenever filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedSector !== 'all') params.sector = selectedSector;
    if (minCap) params.minCap = minCap;
    if (maxCap) params.maxCap = maxCap;
    if (minROE) params.minROE = minROE;
    if (maxPE) params.maxPE = maxPE;
    if (sortField !== 'name') params.sort = sortField;
    if (sortDirection !== 'asc') params.dir = sortDirection;

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedSector, minCap, maxCap, minROE, maxPE, sortField, sortDirection, setSearchParams]);

  // Client-side filtering (sorting is now done on server for initial load)
  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search Query (Internal)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q)
      );
    }

    // Sector Filter
    if (selectedSector !== 'all') {
      result = result.filter(c => c.sector === selectedSector);
    }

    // Market Cap Range
    if (minCap) result = result.filter(c => (c.marketCap || 0) >= parseFloat(minCap));
    if (maxCap) result = result.filter(c => (c.marketCap || Infinity) <= parseFloat(maxCap));

    // ROC/ROE
    if (minROE) result = result.filter(c => (c.roe || 0) >= parseFloat(minROE));

    // PE Ratio
    if (maxPE) result = result.filter(c => (c.pe || 0) <= parseFloat(maxPE));

    // Secondary Sort (Client-side) for the current displayed batch
    // This handles the direction correctly if already fetched
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [companies, searchQuery, selectedSector, minCap, maxCap, minROE, maxPE, sortField, sortDirection]);

  // Debounced handlers for inputs could be added here, but for numbers/ranges 
  // immediate filtering usually feels responsive in React if result set < 1000.

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setMinCap('');
    setMaxCap('');
    setMinROE('');
    setMaxPE('');
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="opacity-30" />;
    return sortDirection === 'asc' ? (
      <TrendingUp size={14} className="text-secondary-500" />
    ) : (
      <TrendingDown size={14} className="text-secondary-500" />
    );
  };

  const sectors = ['all', ...new Set(companies.map((c) => c.sector))].sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Registry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Stock Registry | Professional Market Data"
        description="Browse and filter high-quality financial disclosures for Indian stocks. Use advanced filters for P/E, Market Cap, and ROE."
        canonical="https://fundametrics.in/stocks"
      />

      {/* Hero Header - Focused Redesign */}
      <div className="bg-white border-b border-slate-200/60 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] font-manrope">
                <BarChart3 size={14} strokeWidth={2.5} />
                <span>Institutional Registry</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight italic uppercase italic">
                Market Monitor
              </h1>
              <p className="text-slate-500 max-w-xl font-medium text-xs leading-relaxed">
                Real-time factual disclosures and automated analytics for the <br className="hidden sm:block" />
                Indian public sector. Verified facts from direct feeds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 flex-1 max-w-3xl">
              {/* Search Group */}
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Universal Insight Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm font-semibold shadow-sm transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Advanced Controls Group */}
              <div className="flex items-center gap-3">
                <div className="relative min-w-[180px]">
                  <PieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} strokeWidth={2.5} />
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-[11px] font-black uppercase tracking-wider appearance-none cursor-pointer shadow-sm transition-all"
                  >
                    {sectors.map((s) => (
                      <option key={s} value={s}>{s === 'all' ? 'All Channels' : s}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <button
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-xs h-[50px] shadow-sm ${isFilterExpanded
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
                    }`}
                >
                  <Filter size={18} strokeWidth={2.5} />
                  <span className="hidden sm:inline uppercase tracking-widest">{isFilterExpanded ? 'Close' : 'Filter'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters (Numeric Ranges) */}
          {isFilterExpanded && (
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* ROE Threshold */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <TrendingUp size={12} /> Min ROE %
                </label>
                <input
                  type="number"
                  placeholder="e.g. 15"
                  value={minROE}
                  onChange={(e) => setMinROE(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-bold"
                />
              </div>

              {/* PE Ratio */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Activity size={12} /> Max P/E Ratio
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={maxPE}
                  onChange={(e) => setMaxPE(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-bold"
                />
              </div>

              {/* Market Cap Range */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Market Cap Range (₹ Cr)</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minCap}
                      onChange={(e) => setMinCap(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold"
                    />
                  </div>
                  <div className="text-slate-300">—</div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxCap}
                      onChange={(e) => setMaxCap(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold"
                    />
                  </div>
                  <button
                    onClick={clearFilters}
                    className="p-3 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
                    title="Clear All Filters"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          {filteredCompanies.length > 0 ? (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-5 text-left cursor-pointer group" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        Company <SortIcon field="name" />
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Sector</div>
                    </th>
                    <th className="px-6 py-5 text-right cursor-pointer" onClick={() => handleSort('marketCap')}>
                      <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        Market Cap <SortIcon field="marketCap" />
                      </div>
                    </th>
                    <th className="px-6 py-5 text-right cursor-pointer" onClick={() => handleSort('roe')}>
                      <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        ROE % <SortIcon field="roe" />
                      </div>
                    </th>
                    <th className="px-6 py-5 text-right cursor-pointer" onClick={() => handleSort('pe')}>
                      <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        P/E Ratio <SortIcon field="pe" />
                      </div>
                    </th>
                    <th className="px-6 py-5 text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Activity</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCompanies.map((company) => (
                    <tr key={company.symbol} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-6 py-5">
                        <Link to={`/stocks/${company.symbol}`} className="block">
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{company.name}</div>
                          <div className="text-xs font-black text-slate-400 mt-1">{company.symbol}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-widest">
                          {company.sector}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="text-sm font-black text-slate-900">
                          {company.marketCap ? `₹${company.marketCap.toLocaleString()} Cr` : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className={`text-sm font-black ${(company.roe || 0) > 20 ? 'text-emerald-600' :
                          (company.roe || 0) > 10 ? 'text-slate-900' : 'text-amber-600'
                          }`}>
                          {company.roe ? `${company.roe.toFixed(1)}%` : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="text-sm font-black text-slate-900">
                          {company.pe ? company.pe.toFixed(1) : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end">
                          <div className={`w-10 h-8 rounded-lg flex items-center justify-center transition-all ${(company.changePercent || 0) > 0 ? 'bg-emerald-50 text-emerald-600' :
                            (company.changePercent || 0) < 0 ? 'bg-rose-50 text-rose-600' :
                              'bg-slate-50 text-slate-400'
                            }`}>
                            <div className="flex flex-col items-center">
                              <Activity size={14} className={company.changePercent ? 'animate-pulse' : ''} />
                              {company.changePercent !== undefined && Math.abs(company.changePercent) > 0.01 && (
                                <span className="text-[7px] font-black mt-0.5">{company.changePercent > 0 ? '+' : ''}{company.changePercent.toFixed(1)}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900">No Disclosures Found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">
                We couldn't find any companies matching your current filters. Try adjusting your range or clear all.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-slate-800 transition-all"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div >
    </div >
  );
};

export default StocksPage;
