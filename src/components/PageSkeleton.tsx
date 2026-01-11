import React from 'react';

const PageSkeleton = () => {
    return (
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-12"></div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-64 bg-slate-200 rounded-xl"></div>
                <div className="h-64 bg-slate-200 rounded-xl"></div>
                <div className="h-64 bg-slate-200 rounded-xl"></div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
        </div>
    );
};

export default PageSkeleton;
