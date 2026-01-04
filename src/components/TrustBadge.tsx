import type { FC } from 'react';

interface TrustBadgeProps {
    grade?: 'A' | 'B' | 'C' | 'D';
}

const TrustBadge: FC<TrustBadgeProps> = ({ grade }) => {
    if (!grade) return null;

    const getStyles = (g: string) => {
        switch (g) {
            case 'A': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'B': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'C': return 'bg-slate-50 text-slate-700 border-slate-200';
            case 'D': return 'bg-slate-100 text-slate-500 border-slate-300';
            default: return 'bg-slate-50 text-slate-400 border-slate-200';
        }
    };

    return (
        <span className={`trust-badge ${getStyles(grade)}`}>
            Grade {grade}
        </span>
    );
};

export default TrustBadge;
