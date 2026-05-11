import React from 'react';

interface CoachingPanelProps {
    tip: string;
}

export const CoachingPanel: React.FC<CoachingPanelProps> = ({ tip }) => {
    return (
        <div 
            className="p-6 rounded-2xl space-y-4 relative overflow-hidden"
            style={{
                background: 'rgba(59, 130, 246, 0.03)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
            }}
        >
            {/* Subtle light streak */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm">
                    💡
                </div>
                <span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'var(--accent-hover)' }}
                >
                    Digital Twin Coaching
                </span>
            </div>
            
            <p 
                className="text-sm italic leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
            >
                "{tip}"
            </p>

            <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-blue-500/10" />
                <span className="text-[9px] font-bold tracking-widest uppercase opacity-30">Personalized Pattern Match</span>
                <div className="flex-1 h-px bg-blue-500/10" />
            </div>
        </div>
    );
};
