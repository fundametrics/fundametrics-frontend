import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    const containerHeight = isSmall ? 'h-9' : size === 'lg' ? 'h-20' : 'h-11';

    return (
        <div className={`flex items-center justify-center ${containerHeight} ${className}`}>
            <img
                src="/logo-v4.png"
                alt="Fundametrics: Market Runs On Fundamentals"
                className="h-full w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
        </div>
    );
};

export default Logo;
