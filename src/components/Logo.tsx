import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    // Doubling heights to compensate for the whitespace padding in brand-logo-v3.png
    const dimensions = isSmall ? 'h-24' : size === 'lg' ? 'h-48' : 'h-32';

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className={`${dimensions} w-auto object-contain transition-transform hover:scale-105 duration-300`}
            />
        </div>
    );
};

export default Logo;
