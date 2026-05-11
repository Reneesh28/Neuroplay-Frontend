import React from 'react';

interface FeatureSummaryProps {
    domain: string;
    mode: string;
    scenarioLength: number;
}

export const FeatureSummary: React.FC<FeatureSummaryProps> = ({ domain, mode, scenarioLength }) => {
    return (
        <div 
            className="rounded-2xl p-6 space-y-4 animate-fade-in"
            style={{
                background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)'
            }}
        >
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Simulation Payload Preview
            </h4>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider opacity-40">Target Domain</p>
                    <p className="text-sm font-bold capitalize">{domain || 'Undefined'}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider opacity-40">Neural Protocol</p>
                    <p className="text-sm font-bold capitalize">{mode.toLowerCase()}</p>
                </div>
                <div className="space-y-1 col-span-2">
                    <p className="text-[10px] uppercase tracking-wider opacity-40">Tactical Context Size</p>
                    <p className="text-sm font-bold">{scenarioLength} characters</p>
                </div>
            </div>

            <div 
                className="p-3 rounded-lg flex items-center gap-3 text-xs italic"
                style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}
            >
                <span>📡</span>
                <span>Ready to dispatch to worker cluster. Connection latency: 24ms.</span>
            </div>
        </div>
    );
};
