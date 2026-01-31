import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';

    // Scale the image up significantly to compensate for massive whitespace padding.
    // We use a high percentage height to "zoom in" on the center content.
    const containerHeight = isSmall ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';

    return (
        <div className={`flex items-center justify-center ${containerHeight} overflow-hidden ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className="h-[600%] w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
        </div>
    );
};

export default Logo;
