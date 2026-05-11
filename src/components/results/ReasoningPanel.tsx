import React from 'react';

interface ReasoningPanelProps {
    reasoning: string;
}

export const ReasoningPanel: React.FC<ReasoningPanelProps> = ({ reasoning }) => {
    return (
        <div 
            className="p-6 rounded-2xl space-y-4"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-sm">
                        🧩
                    </div>
                    <span 
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Strategic Decomposition
                    </span>
                </div>
                <span className="text-[10px] font-mono opacity-30">V-INF_NODE_01</span>
            </div>
            
            <div className="relative pl-4 border-l-2 border-indigo-500/20">
                <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {reasoning}
                </p>
            </div>

            <div className="flex items-center gap-4 text-[9px] font-bold tracking-tighter uppercase opacity-30">
                <span>Memory Match: High</span>
                <span>•</span>
                <span>Contextual Weight: 0.88</span>
                <span>•</span>
                <span>Heuristic Pass: 1/1</span>
            </div>
        </div>
    );
};
