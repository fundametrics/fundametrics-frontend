import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    const containerHeight = isSmall ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';

    return (
        <div className={`flex items-center gap-2 ${containerHeight} ${className}`}>
            <div className="relative flex items-center justify-center h-full">
                <img
                    src="/logo-v4.png"
                    alt="Fundametrics: Market Runs On Fundamentals"
                    className="h-full w-auto object-contain transition-transform hover:scale-105 duration-300"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                />
                <div className="logo-fallback hidden items-center font-bold text-indigo-600 text-lg tracking-tight">
                    FUNDA<span className="text-slate-900">METRICS</span>
                </div>
            </div>
            <span className="text-[8px] font-bold bg-indigo-50 text-indigo-500 px-1 rounded border border-indigo-100 uppercase tracking-tighter">v.final</span>
        </div>
    );
};

export default Logo;
