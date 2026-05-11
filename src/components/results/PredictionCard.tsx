import React from 'react';
import { ExecutionModeBadge } from './ExecutionModeBadge';

interface PredictionCardProps {
    action: string;
    mode: string;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ action, mode }) => {
    return (
        <div 
            className="group p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 32px -4px rgba(0,0,0,0.5)',
            }}
        >
            {/* Background glow based on mode */}
            <div 
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                style={{
                    background: mode === 'FULL' ? '#34d399' : mode === 'PARTIAL' ? '#fbbf24' : '#f87171'
                }}
            />
            
            <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent)' }}>
                            Predicted Tactical Execution
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight capitalize" style={{ color: 'var(--text-heading)' }}>
                            {action}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <ExecutionModeBadge mode={mode} />
                        <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Inference Delta: 0.04s</span>
                    </div>
                </div>

                <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:rotate-12"
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border)',
                        color: 'var(--accent)'
                    }}
                >
                    🤖
                </div>
            </div>
        </div>
    );
};
