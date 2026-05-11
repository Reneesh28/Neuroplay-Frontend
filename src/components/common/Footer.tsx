import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer
            className="py-6 mt-auto text-center text-xs transition-colors duration-300"
            style={{
                color: "var(--text-muted)",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-surface)"
            }}
        >
            <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: '0 0 8px #10b981' }} />
                    <p className="font-mono tracking-widest uppercase opacity-70">
                        NeuroPlay Engine · Phase 9 CERTIFIED
                    </p>
                </div>
                <div className="flex gap-4 opacity-50 font-bold">
                    <span className="text-[10px] tracking-tighter uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Validated</span>
                    <span>•</span>
                    <span className="text-emerald-500">Cross-Platform Sync: OK</span>
                </div>
            </div>
        </footer>
    );
};
