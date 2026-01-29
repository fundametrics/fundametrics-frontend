import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    // Balanced heights to reduce DOM footprint while keeping visibility
    const dimensions = isSmall ? 'h-16' : size === 'lg' ? 'h-36' : 'h-24';

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className={`${dimensions} w-auto object-contain transition-transform hover:scale-105 duration-300 -my-6`}
            />
        </div>
    );
};

export default Logo;
