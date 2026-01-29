import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    // Increased base heights because the v3 image has significant whitespace padding
    const dimensions = isSmall ? 'h-12' : size === 'lg' ? 'h-24' : 'h-16';

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
