import React from 'react';

interface StepIndicatorProps {
    status: 'pending' | 'processing' | 'completed' | 'failed' | string;
}

const STEP_THEME: Record<string, { color: string; icon: string; bg: string }> = {
    completed: { color: '#10b981', icon: '✓', bg: 'rgba(16, 185, 129, 0.1)' },
    processing: { color: '#3b82f6', icon: '⋯', bg: 'rgba(59, 130, 246, 0.1)' },
    failed: { color: '#ef4444', icon: '✕', bg: 'rgba(239, 68, 68, 0.1)' },
    pending: { color: 'var(--text-muted)', icon: '○', bg: 'rgba(255, 255, 255, 0.02)' },
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({ status }) => {
    const theme = STEP_THEME[status] ?? STEP_THEME.pending;
    const isProcessing = status === 'processing';

    return (
        <div className="relative flex items-center justify-center shrink-0">
            {isProcessing && (
                <div 
                    className="absolute w-10 h-10 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
                    style={{ borderTopColor: 'var(--accent)' }}
                />
            )}
            
            <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 z-10"
                style={{
                    background: theme.bg,
                    border: `1px solid ${isProcessing ? 'var(--accent)' : 'var(--border)'}`,
                    color: theme.color,
                    boxShadow: isProcessing ? '0 0 15px var(--accent-glow)' : 'none'
                }}
            >
                {isProcessing ? (
                    <span className="animate-pulse">●</span>
                ) : (
                    theme.icon
                )}
            </span>
        </div>
    );
};
