import React from 'react';

interface ExecutionModeSelectorProps {
    mode: 'FULL' | 'PARTIAL' | 'FALLBACK';
    onModeChange: (mode: 'FULL' | 'PARTIAL' | 'FALLBACK') => void;
    disabled?: boolean;
}

const MODES = [
    { 
        id: 'FULL', 
        label: 'Deep Ingress', 
        desc: 'Full neural pipeline with persistent memory & pattern extraction.',
        icon: '🧠',
        color: 'var(--status-completed)'
    },
    { 
        id: 'PARTIAL', 
        label: 'Direct Link', 
        desc: 'Real-time inference bypassing long-term behavioral evolution.',
        icon: '⚡',
        color: 'var(--status-processing)'
    },
    { 
        id: 'FALLBACK', 
        label: 'Static Sync', 
        desc: 'Deterministic tactical matching without ML refinement.',
        icon: '📟',
        color: 'var(--status-failed)'
    }
];

export const ExecutionModeSelector: React.FC<ExecutionModeSelectorProps> = ({ mode, onModeChange, disabled }) => {
    return (
        <div className="space-y-3 animate-fade-in">
            <label
                className="block text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
            >
                Neural Depth Configuration
            </label>
            <div className="space-y-3">
                {MODES.map((m) => {
                    const isSelected = mode === m.id;
                    return (
                        <button
                            key={m.id}
                            onClick={() => onModeChange(m.id as any)}
                            disabled={disabled}
                            className="w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border text-left group disabled:cursor-not-allowed disabled:opacity-60"
                            style={{
                                background: isSelected ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                                borderColor: isSelected ? m.color : 'var(--border-muted)',
                                boxShadow: isSelected ? `0 0 20px ${m.color}15` : 'none',
                            }}
                        >
                            <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    background: isSelected ? `${m.color}15` : 'var(--bg-muted)',
                                    color: m.color
                                }}
                            >
                                {m.icon}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <span className="font-bold text-sm" style={{ color: isSelected ? 'var(--text-heading)' : 'var(--text-primary)' }}>
                                        {m.label}
                                    </span>
                                    {isSelected && (
                                        <span className="text-[10px] font-bold tracking-tighter" style={{ color: m.color }}>ACTIVE</span>
                                    )}
                                </div>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                    {m.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
