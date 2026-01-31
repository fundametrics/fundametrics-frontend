import { FC } from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const isSmall = size === 'sm';
    const containerHeight = isSmall ? 'h-11' : size === 'lg' ? 'h-32' : 'h-14';

    return (
        <div className={`flex items-center justify-start ${containerHeight} ${className}`}>
            <img
                src="/logo-v4.png"
                alt="Fundametrics: Market Runs On Fundamentals"
                className="h-full w-auto object-contain object-left transition-transform hover:scale-105 duration-300"
            />
        </div>
    );
};

export default Logo;
