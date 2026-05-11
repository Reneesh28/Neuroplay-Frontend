import React from 'react';

interface SkeletonLoaderProps {
    className?: string;
    type?: 'card' | 'text' | 'title' | 'circle';
    style?: React.CSSProperties;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    className = '',
    type = 'card',
    style = {}
}) => {
    let baseStyles = "animate-pulse bg-gray-800/50 rounded-lg";

    if (type === 'card') {
        baseStyles += " h-32 w-full";
    } else if (type === 'text') {
        baseStyles += " h-4 w-full";
    } else if (type === 'title') {
        baseStyles += " h-6 w-3/4 mb-4";
    } else if (type === 'circle') {
        baseStyles += " h-12 w-12 rounded-full";
    }

    return (
        <div
            className={`${baseStyles} ${className}`}
            style={{
                ...style,
                background: 'linear-gradient(90deg, var(--bg-surface) 0%, var(--bg-elevated) 50%, var(--bg-surface) 100%)',
                backgroundSize: '200% 100%',
                animation: 'pulse-shimmer 2s infinite linear'
            }}
        />
    );
};

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 w-full max-w-3xl mx-auto py-6">
            <div className="flex justify-between mb-8">
                <div>
                    <SkeletonLoader type="title" className="w-48" />
                    <SkeletonLoader type="text" className="w-32" />
                </div>
                <SkeletonLoader type="text" className="w-24 h-6 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <SkeletonLoader type="card" className="h-28" />
                <SkeletonLoader type="card" className="h-28" />
            </div>

            <SkeletonLoader type="card" className="h-40" />
            <SkeletonLoader type="card" className="h-32" />
        </div>
    );
};
