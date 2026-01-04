import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Magnifying Glass + Chart Icon */}
            <div className={`relative ${isSmall ? 'w-8 h-8' : 'w-10 h-10'} flex-shrink-0`}>
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-indigo-700"
                >
                    {/* Magnifying Glass Rim (with gap) */}
                    <path
                        d="M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    {/* Magnifying Glass Handle */}
                    <path
                        d="M26 26L32 32"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    {/* Inner Chart Bars */}
                    <rect x="15.5" y="19" width="2" height="4" rx="1" fill="currentColor" />
                    <rect x="19" y="16" width="2" height="7" rx="1" fill="currentColor" />
                    <rect x="22.5" y="18" width="2" height="5" rx="1" fill="currentColor" />

                    {/* Decorative Arc/Gap in Rim */}
                    <path
                        d="M14 14C15.6 12.4 17.7 11.5 20 11.5C24.7 11.5 28.5 15.3 28.5 20"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M14 14C15.6 12.4 17.7 11.5 20 11.5C24.7 11.5 28.5 15.3 28.5 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="2 4"
                    />
                </svg>
            </div>

            {/* Brand Text & Tagline */}
            <div className="flex flex-col">
                <span className={`${isSmall ? 'text-base' : 'text-xl'} font-black text-indigo-950 tracking-tight uppercase leading-tight`}>
                    FUNDAMETRICS
                </span>
                {!isSmall && (
                    <span className="text-[7px] font-black text-indigo-500 tracking-[0.35em] uppercase leading-none mt-0.5">
                        Market runs on fundamentals
                    </span>
                )}
            </div>
        </div>
    );
};

export default Logo;
