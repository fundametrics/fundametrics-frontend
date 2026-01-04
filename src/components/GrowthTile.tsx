import type { FC } from 'react';
import TrustBadge from './TrustBadge';
import TrendIndicator from './TrendIndicator';

interface GrowthTileProps {
    label: string;
    value: number | null | string;
    horizon: string;
    confidence?: number;
    grade?: 'A' | 'B' | 'C' | 'D';
    direction?: 'up' | 'down' | 'flat';
}

const GrowthTile: FC<GrowthTileProps> = ({
    label,
    value,
    horizon,
    confidence,
    grade,
    direction
}) => {
    const isDataMissing = value === null || value === undefined || value === '—' || value === 'Insufficient Data';

    return (
        <div className="premium-card p-3 flex flex-col gap-2 min-w-[140px]">
            <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    {label}
                </span>
                <span className="text-[10px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded leading-none">
                    {horizon}
                </span>
            </div>

            <div className="flex items-baseline gap-1">
                <span className={`text-base font-bold tracking-tight ${isDataMissing ? 'text-slate-300 italic text-xs' : 'text-slate-900'}`}>
                    {isDataMissing ? 'Insufficient Data' : (typeof value === 'number' ? `${value.toFixed(1)}%` : value)}
                </span>
                {!isDataMissing && direction && <TrendIndicator direction={direction} />}
            </div>

            {!isDataMissing && (grade || confidence !== undefined) && (
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                    <TrustBadge grade={grade} />
                    {confidence !== undefined && !isNaN(confidence) && (
                        <span className="text-[9px] font-bold text-slate-400">
                            {(confidence * 100).toFixed(0)}%
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default GrowthTile;
