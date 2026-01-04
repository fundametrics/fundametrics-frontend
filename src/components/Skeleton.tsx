import type { FC } from 'react';

interface SkeletonProps {
    className?: string;
    count?: number;
}

const Skeleton: FC<SkeletonProps> = ({ className = '', count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`animate-pulse bg-slate-100 rounded-lg ${className}`}
                />
            ))}
        </>
    );
};

export default Skeleton;
