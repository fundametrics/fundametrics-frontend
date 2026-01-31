import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';

    // Significantly increased heights to compensate for the whitespace padding in brand-logo-v3.png
    // We use large negative margins to pull the actual branding content into view without increasing header height.
    const dimensions = isSmall ? 'h-32' : size === 'lg' ? 'h-72' : 'h-48';
    const margin = isSmall ? '-my-12' : size === 'lg' ? '-my-28' : '-my-18';

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/brand-logo-v3.png"
                alt="Fundametrics Logo"
                className={`${dimensions} w-auto object-contain transition-transform hover:scale-105 duration-300 ${margin}`}
            />
        </div>
    );
};

export default Logo;
