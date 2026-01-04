import type { FC } from 'react';

interface TrendIndicatorProps {
    direction?: 'up' | 'down' | 'flat';
    text?: string;
}

const TrendIndicator: FC<TrendIndicatorProps> = ({ direction, text }) => {
    const getIcon = () => {
        switch (direction) {
            case 'up': return '↑';
            case 'down': return '↓';
            case 'flat': return '→';
            default: return null;
        }
    };

    const getColor = () => {
        switch (direction) {
            case 'up': return 'text-emerald-600';
            case 'down': return 'text-blue-600'; // Neutralizing "bad" red to blue per instructions
            case 'flat': return 'text-slate-400';
            default: return 'text-slate-300';
        }
    };

    if (!direction) return null;

    return (
        <span
            className={`inline-flex items-center font-bold text-xs ${getColor()}`}
            title={text}
        >
            {getIcon()}
        </span>
    );
};

export default TrendIndicator;
