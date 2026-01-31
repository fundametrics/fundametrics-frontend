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
        <div className={`flex items-center justify-center ${containerHeight} ${className} bg-red-500 border-2 border-green-500`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className="h-full w-auto object-contain border-4 border-yellow-400 grayscale-0 invert select-none pointer-events-none"
                style={{ minWidth: '100px', minHeight: '40px' }} // Ensure it has some visible area
            />
        </div>
    );
};

export default Logo;
