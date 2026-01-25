import type { FC } from 'react';
import type { CoverageSummary } from '../types';
import { Clock, Bookmark, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';

interface CompanyHeaderProps {
  name?: string | null;
  symbol?: string | null;
  sector?: string | null;
  metadataAsOfDate?: string | null;
  price?: {
    value: number | null;
    change?: number | null;
    changePercent?: number | null;
    currency?: string | null;
  } | null;
  priceDelayMinutes?: number | null;
  coverage?: CoverageSummary | null;
  trustGrade?: string;
  statementScope?: string;
  isPsu?: boolean;
}

const CompanyHeader: FC<CompanyHeaderProps> = ({
  name,
  symbol,
  sector,
  price,
  priceDelayMinutes,
  isPsu = false,
}) => {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const isWatched = symbol ? isInWatchlist(symbol) : false;

  const formattedPrice = typeof price?.value === 'number'
    ? new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price?.currency || 'INR',
      maximumFractionDigits: 2,
    }).format(price.value)
    : null;

  const priceChange = price?.change ?? 0;
  const priceChangePercent = price?.changePercent ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Mobile: Stacked Identity (Refined for Phase 21B) */}
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                {name || symbol}
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Fundamental Analysis</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-slate-500">{symbol}</span>
                <span className="text-slate-300">|</span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">NSE</span>
              </div>
            </div>
            <button
              onClick={() => symbol && toggleWatchlist(symbol)}
              className={`p-2 rounded-full border transition-all ${isWatched ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
            >
              <Bookmark size={18} fill={isWatched ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-end justify-between border-t border-slate-100 pt-3">
            <div className="flex flex-col">
              <div className="text-2xl font-black font-mono text-slate-900 leading-none">
                {formattedPrice || "--"}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={12} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500">{(priceDelayMinutes || 15)}M Delay</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between pb-2 border-b border-slate-100/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => symbol && toggleWatchlist(symbol)}
              className={`p-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${isWatched ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'}`}
              title={isWatched ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Bookmark size={20} className="transition-all" fill={isWatched ? "currentColor" : "none"} />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter flex items-baseline gap-2">
              {name || symbol}
              <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Fundamental Analysis</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">{symbol}</span>
              <span className="text-slate-300">|</span>
              <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">NSE</span>
              {isPsu && (
                <span className="px-2 py-0.5 bg-indigo-50 text-[9px] font-bold text-indigo-600 rounded-full border border-indigo-100">PSU</span>
              )}
            </div>
          </div>

          {/* Desktop Right: Price Section - Elevated */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="text-3xl font-black font-mono text-slate-900 tracking-tighter leading-none">
                {formattedPrice || <span className="text-sm text-slate-400">Update Pending</span>}
              </div>
              {formattedPrice && (
                <div className={`flex items-center gap-1.5 text-sm font-bold mt-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 self-start mt-1">
              <Clock size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{(priceDelayMinutes || 15)}M Delay</span>
            </div>
          </div>
        </div>

        {/* Intelligence Strip - Sector & Status */}
        <div className="hidden sm:flex items-center justify-between pt-2 gap-4">
          <div className="flex items-center gap-6 text-[11px] font-medium text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Sector</span>
              <span className="text-slate-800 font-bold whitespace-nowrap uppercase">{sector || 'Utilities'}</span>
            </div>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Financial Strength</span>
                <span className="text-slate-950 font-bold">Improving</span>
              </div>
            </div>
          </div>

          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Terminal Session Verified <span className="text-slate-900 ml-1">Live Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
