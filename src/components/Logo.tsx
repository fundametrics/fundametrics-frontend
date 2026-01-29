import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    const dimensions = isSmall ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`${dimensions} flex items-center justify-center overflow-hidden`}>
                <img
                    src="/brand-logo-v3.png"
                    alt="Fundametrics Logo"
                    className="h-full w-auto object-contain transition-all hover:scale-110 duration-300 scale-[2.0]"
                />
            </div>
        </div>
    );
};

export default Logo;
