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
            <img
                src="/brand-logo-v2.png"
                alt="Fundametrics Logo"
                className={`${dimensions} w-auto object-contain flex-shrink-0 transition-all hover:scale-105 duration-300`}
            />
        </div>
    );
};

export default Logo;
