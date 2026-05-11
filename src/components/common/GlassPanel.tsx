import React, { type ReactNode } from 'react';

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ 
    children, 
    className = '',
    glowColor = 'var(--accent-glow)'
}) => {
    return (
        <div 
            className={`relative overflow-hidden rounded-2xl p-6 ${className}`}
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                boxShadow: `0 4px 24px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                backdropFilter: 'blur(12px)'
            }}
        >
            <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: glowColor }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
