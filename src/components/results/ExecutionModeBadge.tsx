import React from 'react';

interface ExecutionModeBadgeProps {
    mode: 'FULL' | 'PARTIAL' | 'FALLBACK' | string;
}

export const ExecutionModeBadge: React.FC<ExecutionModeBadgeProps> = ({ mode }) => {
    let bg = 'rgba(74, 85, 104, 0.2)';
    let border = 'rgba(74, 85, 104, 0.3)';
    let color = '#94a3b8';
    let label = 'UNKNOWN';

    if (mode === 'FULL') {
        bg = 'rgba(16, 185, 129, 0.12)';
        border = 'rgba(16, 185, 129, 0.25)';
        color = '#34d399';
        label = 'FULL ML PIPELINE';
    } else if (mode === 'PARTIAL') {
        bg = 'rgba(245, 158, 11, 0.12)';
        border = 'rgba(245, 158, 11, 0.25)';
        color = '#fbbf24';
        label = 'DEGRADED ML (PARTIAL)';
    } else if (mode === 'FALLBACK') {
        bg = 'rgba(239, 68, 68, 0.12)';
        border = 'rgba(239, 68, 68, 0.25)';
        color = '#f87171';
        label = 'STATIC FALLBACK';
    }

    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
                background: bg,
                border: `1px solid ${border}`,
                color: color,
            }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            {label}
        </span>
    );
};
