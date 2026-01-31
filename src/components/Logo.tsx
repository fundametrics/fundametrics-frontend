import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';

    // Scale the image up HEAVILY to compensate for massive whitespace.
    // We use h-[800%] to zoom into the center content.
    const containerHeight = isSmall ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';

    return (
        <div className={`relative flex items-center justify-center ${containerHeight} overflow-hidden ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className="absolute h-[800%] w-auto object-contain transition-transform hover:scale-105 duration-300 pointer-events-none"
            />
        </div>
    );
};

export default Logo;
