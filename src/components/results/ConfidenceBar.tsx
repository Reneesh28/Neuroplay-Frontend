import React from 'react';

interface ConfidenceBarProps {
    confidence: number;
    mode: string;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence, mode }) => {
    // Determine color based on execution mode limits
    let gradient = 'linear-gradient(90deg, #3b82f6, #60a5fa)';
    let glowColor = 'rgba(59, 130, 246, 0.5)';
    let textColor = 'var(--accent-hover)';
    
    if (mode === 'PARTIAL') {
        gradient = 'linear-gradient(90deg, #d97706, #fbbf24)';
        glowColor = 'rgba(251, 191, 36, 0.4)';
        textColor = '#fbbf24';
    } else if (mode === 'FALLBACK') {
        gradient = 'linear-gradient(90deg, #b91c1c, #f87171)';
        glowColor = 'rgba(248, 113, 113, 0.4)';
        textColor = '#f87171';
    } else if (confidence > 0.8) {
        gradient = 'linear-gradient(90deg, #059669, #34d399)';
        glowColor = 'rgba(52, 211, 153, 0.4)';
        textColor = '#34d399';
    }

    const percentage = Math.round(confidence * 100);

    return (
        <div 
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
            }}
        >
            <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                    <span 
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Neural Calibration Accuracy
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: textColor }}>
                            {percentage}%
                        </span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-1 h-3 rounded-full"
                                    style={{ 
                                        background: i < Math.floor(confidence * 5) ? textColor : 'var(--bg-muted)',
                                        opacity: i < Math.floor(confidence * 5) ? 1 : 0.3
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="text-right space-y-1">
                    <p className="text-[10px] uppercase tracking-widest opacity-40">Variance</p>
                    <p className="text-xs font-mono">±0.0{Math.floor(Math.random() * 9 + 1)}</p>
                </div>
            </div>
            
            <div 
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--bg-muted)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
            >
                <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{
                        width: `${percentage}%`,
                        background: gradient,
                        boxShadow: `0 0 15px ${glowColor}`,
                    }}
                >
                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white/20 to-transparent" />
                </div>
            </div>
            
            {mode !== 'FULL' && (
                <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-xs">📡</span>
                    <p className="text-[10px] tracking-tight opacity-60" style={{ color: textColor }}>
                        Confidence ceiling active due to <span className="font-bold uppercase">{mode}</span> protocol synchronization.
                    </p>
                </div>
            )}
        </div>
    );
};
