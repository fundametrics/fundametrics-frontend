import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';

    // Scale the image up to fill the container despite its whitespace
    // but keep the container itself constrained to standard navbar heights.
    const containerHeight = isSmall ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';

    return (
        <div className={`flex items-center justify-center ${containerHeight} overflow-hidden ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className="h-[250%] w-auto object-contain transition-transform hover:scale-110 duration-300"
                style={{ transform: 'translateY(1%)' }} // Fine-tune centering if needed
            />
        </div>
    );
};

export default Logo;
