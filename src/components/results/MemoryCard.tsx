import React from 'react';

interface MemoryCardProps {
    text: string;
    distance?: number;
    type?: string;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ text, distance, type = 'Behavioral' }) => {
    // Inverse distance to show a "relevance" score
    const relevance = distance !== undefined ? Math.max(0, Math.min(100, (1 - distance) * 100)) : 85;

    return (
        <div 
            className="group p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 relative overflow-hidden"
            style={{
                background: 'var(--bg-card)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-accent/10" style={{ color: 'var(--accent)' }}>
                        {type}
                    </span>
                    <span className="text-[10px] font-mono opacity-30">HEX_0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase()}</span>
                </div>
                {distance !== undefined && (
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] uppercase tracking-tighter opacity-40">Relevance</span>
                        <span className="text-[10px] font-bold font-mono" style={{ color: relevance > 70 ? 'var(--status-completed)' : 'var(--text-muted)' }}>
                            {relevance.toFixed(1)}%
                        </span>
                    </div>
                )}
            </div>
            
            <p className="text-xs leading-relaxed italic opacity-80" style={{ color: 'var(--text-primary)' }}>
                "{text}"
            </p>

            {/* Hover accent */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-accent" />
        </div>
    );
};
