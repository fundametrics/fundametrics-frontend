import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, Minus, ArrowUpDown } from 'lucide-react';
import { api } from '../utils/api';
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
}

type SortField = 'name' | 'marketCap' | 'roe' | 'roce' | 'pe' | 'debt';
type SortDirection = 'asc' | 'desc';

const StocksPage = () => {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  // Debounce hook setup
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Effect to trigger search or load default list
  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    } else {
      // If search is cleared, reload default list
      if (companies.length === 0 || companies.length <= LIMIT) {
        loadCompanies(0, true);
      }
    }
    // Note: We don't depend on 'companies' length to avoid loops, only query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const filteredCompanies = useMemo(() => {
    let filtered = [...companies];

    // Filter by sector (Client side for now, as search backend returns sector)
    if (selectedSector !== 'all') {
      filtered = filtered.filter((c) => c.sector === selectedSector);
    }

    // Sort
    filtered.sort((a, b) => {
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

    return filtered;
  }, [companies, sortField, sortDirection, selectedSector]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.searchRegistry(query);

      const searchResults = response.results.map((c: any) => ({
        symbol: c.symbol,
        name: c.name,
        sector: c.sector || 'Unknown',
        // Search API currently returns partial data
        marketCap: undefined,
        roe: undefined,
        roce: undefined,
        pe: undefined,
        debt: undefined
      }));

      setCompanies(searchResults);
      setTotal(searchResults.length); // Update total to show match count
      setLoading(false);
    } catch (err) {
      console.error("Search failed", err);
      setLoading(false);
    }
  };

  const loadCompanies = async (currentSkip: number, replace: boolean = false) => {
    // Don't load paginated data if we are searching
    if (debouncedQuery) return;

    try {
      if (!replace) setLoadingMore(true);
      else setLoading(true);

      const response = await api.getStocks(currentSkip, LIMIT);

      let companyData: CompanyListItem[] = [];

      if (response.companies) {
        companyData = response.companies.map((c: any) => ({
          symbol: c.symbol,
          name: c.name || c.company || c.symbol,
          sector: c.sector || 'Unknown',
          marketCap: c.marketCap || undefined,
          roe: c.roe || undefined,
          roce: c.roce || undefined,
          pe: c.pe || undefined,
          debt: c.debt || undefined
        }));
      }

      if (replace) {
        setCompanies(companyData);
      } else {
        setCompanies(prev => {
          // Avoid duplicates
          const existing = new Set(prev.map(p => p.symbol));
          const uniqueNew = companyData.filter(d => !existing.has(d.symbol));
          return [...prev, ...uniqueNew];
        });
      }

      // Only update total if we are not searching (which we strictly aren't here)
      if (response.total) setTotal(response.total);

      setSkip(currentSkip);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Failed to load companies:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextSkip = skip + LIMIT;
    loadCompanies(nextSkip, false);
  };


  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="opacity-30" />;
    return sortDirection === 'asc' ? (
      <TrendingUp size={14} className="text-indigo-600" />
    ) : (
      <TrendingDown size={14} className="text-indigo-600" />
    );
  };

  const sectors = ['all', ...new Set(companies.map((c) => c.sector))];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Stock Data Registry | Fundametrics"
        description="Browse structured financial disclosures and corporate profiles for Indian companies. Analyze factual metrics like P/E, ROE, and Debt patterns in a clean, professional interface."
      />
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center lg:text-left">
                Company Registry & Disclosures
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {total} companies tracked
              </p>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, symbol, or sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sector Filter */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : sector}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th
                    className="px-6 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      Company <SortIcon field="name" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      Sector
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('marketCap')}
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      Market Cap <SortIcon field="marketCap" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('roe')}
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      ROE % <SortIcon field="roe" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('roce')}
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      ROCE % <SortIcon field="roce" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('pe')}
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      P/E <SortIcon field="pe" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('debt')}
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      Debt <SortIcon field="debt" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.symbol}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/stocks/${company.symbol}`}
                        className="block group"
                      >
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {company.name}
                        </div>
                        <div className="text-sm text-slate-500 line-clamp-1">
                          {company.symbol}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{company.sector}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-slate-900">
                        {company.marketCap ? `₹${company.marketCap.toLocaleString()} Cr` : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-slate-900">
                        {company.roe ? `${company.roe.toFixed(1)}%` : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-slate-900">
                        {company.roce ? `${company.roce.toFixed(1)}%` : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-slate-900">
                        {company.pe ? company.pe.toFixed(1) : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-slate-900">
                        {company.debt ? company.debt.toFixed(2) : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-slate-100">
            {filteredCompanies.map((company) => (
              <Link
                key={company.symbol}
                to={`/stocks/${company.symbol}`}
                className="block p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-slate-900">{company.name}</div>
                    <div className="text-sm text-slate-500 line-clamp-1">{company.symbol}</div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {company.sector}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <div className="text-xs text-slate-500">ROE</div>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {company.roe ? `${company.roe.toFixed(1)}%` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">ROCE</div>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {company.roce ? `${company.roce.toFixed(1)}%` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">P/E</div>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {company.pe ? company.pe.toFixed(1) : 'N/A'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No companies found matching your criteria.
            </div>
          )}

          {/* Load More */}
          {companies.length < total && !searchQuery && selectedSector === 'all' && (
            <div className="p-6 border-t border-slate-100 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
              >
                {loadingMore ? 'Loading...' : 'Load More Companies'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksPage;
