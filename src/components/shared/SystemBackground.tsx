import React from 'react';

export const SystemBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Base Background */}
            <div className="absolute inset-0 bg-[#080b11]" />
            
            {/* Large Gradient Blobs */}
            <div 
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] animate-pulse"
                style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            />
            <div 
                className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-5 blur-[100px]"
                style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            />

            {/* Subtle Grid */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{ 
                    backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
    );
};
