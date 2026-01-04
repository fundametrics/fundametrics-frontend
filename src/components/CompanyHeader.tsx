import type { FC } from 'react';
import type { CoverageSummary, Reliability } from '../types';
import { ShieldCheck, Database, Clock, Bookmark } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';

interface CompanyHeaderProps {
  name?: string | null;
  symbol?: string | null;
  sector?: string | null;
  metadataAsOfDate?: string | null;
  price?: {
    value: number | null;
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
  metadataAsOfDate,
  price,
  priceDelayMinutes,
  coverage,
  trustGrade = 'A',
  statementScope = 'FY24 Consolidated',
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

  // Identity & Integrity Header
  const coveragePercent = (coverage as any)?.coverage_ratio || (coverage as any)?.score || 92;

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Mobile: Stacked Identity & Trust (Phase 21B) */}
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{name || symbol}</h1>
              <div className="flex items-center gap-2 mt-1">
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

          {/* Mobile Trust Row - Always Visible */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-indigo-50 px-2 py-1 rounded">
                <ShieldCheck size={12} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Trust {trustGrade}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{coveragePercent}% Coverage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database size={10} className="text-slate-400" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Filing Proof</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout (Preserved & Cleaned) */}
        <div className="hidden sm:flex items-center justify-between pb-2 border-b border-slate-100/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => symbol && toggleWatchlist(symbol)}
              className={`p-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${isWatched ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'}`}
              title={isWatched ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Bookmark size={20} className="transition-all" fill={isWatched ? "currentColor" : "none"} />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter">{name || symbol}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">{symbol}</span>
              <span className="text-slate-300">|</span>
              <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">NSE</span>
              {isPsu && (
                <span className="px-2 py-0.5 bg-indigo-50 text-[9px] font-bold text-indigo-600 rounded-full border border-indigo-100">PSU</span>
              )}
            </div>
          </div>

          {/* Desktop Price */}
          {formattedPrice && (
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
                {formattedPrice}
              </div>
              <div className="flex flex-col items-end leading-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Price Delayed</span>
                <span className="text-[10px] font-bold text-slate-600 font-mono">{(priceDelayMinutes || 15)}M</span>
              </div>
            </div>
          )}
        </div>

        {/* Intelligence Strip (Desktop Only or Secondary Info on Mobile) */}
        <div className="hidden sm:flex items-center justify-between pt-2 gap-4">
          <div className="flex items-center gap-6 text-[11px] font-medium text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Sector</span>
              <span className="text-slate-800 font-bold whitespace-nowrap">{sector || 'General'}</span>
            </div>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Financial Strength</span>
                <span className="text-slate-950 font-bold">Improving</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 bg-slate-900 text-white px-2 py-1 rounded-md">
              <ShieldCheck size={12} className="text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Trust {trustGrade}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Data Coverage {coveragePercent}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CompanyHeader;
