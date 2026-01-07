import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { searchMockSymbols } from '../mocks/company';

interface SearchResult {
  symbol: string;
  name: string;
  sector: string;
  status?: string;
}

const DEBOUNCE_MS = 250;

interface GlobalSearchProps {
  variant?: 'default' | 'minimal';
}

const GlobalSearch = ({ variant = 'default' }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const trimmedQuery = query.trim();

  const showEmpty = useMemo(
    () => !loading && trimmedQuery.length > 0 && results.length === 0 && !error,
    [loading, trimmedQuery, results.length, error],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!trimmedQuery) {
      setResults([]);
      setError(null);
      setLoading(false);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = window.setTimeout(() => {
      api
        .searchRegistry(trimmedQuery)
        .then((payload) => {
          const apiResults = payload.results ?? [];
          setResults(apiResults);
          setDisclaimer(payload.disclaimer ?? 'Search results are informational only.');
          setLoading(false);
          setIsOpen(true);
          setActiveIndex(-1);
        })
        .catch((err: Error) => {
          // On API error, fallback to mocks entirely
          const mockResults = searchMockSymbols(trimmedQuery);
          if (mockResults.length > 0) {
            setResults(mockResults);
            setDisclaimer('Offline mode: Showing local matches only.');
            setError(null);
          } else {
            setError('Search unavailable and no offline matches found.');
          }
          setLoading(false);
          setIsOpen(true);
          console.error('Search error', err);
        });
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [trimmedQuery]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setActiveIndex(-1);
    setQuery('');
    navigate(`/stocks/${result.symbol}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveIndex(-1);
      }
      return;
    }

    if (!isOpen && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
      setIsOpen(true);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next >= results.length ? 0 : next;
      });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? results.length - 1 : next;
      });
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex]);
      } else if (results.length === 1) {
        handleSelect(results[0]);
      }
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full text-sm">
      <div className={`flex items-center gap-2 px-3 py-2 transition ${variant === 'minimal'
        ? 'bg-transparent'
        : 'rounded-lg border border-neutral-200 bg-white shadow-sm focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-900/10'
        }`}>
        <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.5 15.5L20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <input
          type="search"
          value={query}
          onFocus={() => setIsOpen(results.length > 0 || !!trimmedQuery)}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search 2000+ NSE Stocks (e.g. RELIANCE, TATASTEEL)..."
          className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          aria-label="Search companies"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="global-search-results"
        />
      </div>
      {variant === 'default' && (
        <p className="mt-1 text-[11px] text-neutral-400">
          Informational-only search • No recommendations or rankings.
        </p>
      )}

      {isOpen && (trimmedQuery || loading || error) && (
        <div
          id="global-search-results"
          role="listbox"
          className="absolute z-50 mt-2 w-full rounded-lg border border-neutral-200 bg-white shadow-subtle overflow-hidden"
        >
          {loading && (
            <div className="px-4 py-3 text-xs text-neutral-500">Fetching processed disclosures…</div>
          )}

          {error && !loading && <div className="px-4 py-3 text-xs text-red-600">{error}</div>}

          {showEmpty && <div className="px-4 py-3 text-xs text-neutral-500">No matches found in NSE registry.</div>}

          {!loading && !error && results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto divide-y divide-neutral-100" role="presentation">
              {results.map((result, index) => (
                <li key={result.symbol}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition focus:outline-none focus-visible:bg-neutral-100 ${index === activeIndex ? 'bg-neutral-100' : ''
                      }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm font-semibold text-neutral-900">{result.symbol}</span>
                      {result.status === 'not_available' ? (
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">Not Available</span>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Available</span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-600">{result.name}</span>
                    <span className="text-[11px] text-neutral-400">
                      {result.sector !== 'Unknown' ? `Sector: ${result.sector}` : 'NSE Listed'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {(disclaimer || showEmpty) && !loading && (
            <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-[11px] text-neutral-500">
              {disclaimer || 'Search is informational only.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
