import React from 'react';

interface ProfileStatsProps {
    profile: {
        rank?: string;
        playstyle?: string;
        aggression_score?: number;
        stability_score?: number;
        [key: string]: any;
    };
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
    return (
        <div 
            className="p-6 rounded-2xl space-y-5"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
        >
            <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    Behavioral Identity
                </h4>
                <div className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">
                    Sync Status: Active
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider opacity-40">Classification</p>
                    <p className="text-sm font-black text-white">{profile.rank || 'PLATINUM-IV'}</p>
                </div>
                <div className="space-y-1 text-right">
                    <p className="text-[10px] uppercase tracking-wider opacity-40">Archetype</p>
                    <p className="text-sm font-black text-white capitalize">{profile.playstyle || 'LURK_ENTRY'}</p>
                </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-white/5">
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span style={{ color: '#f87171' }}>Aggression</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-emerald-400">+{profile.aggression_delta || 2}%</span>
                            <span className="opacity-50">{(profile.aggression_score || 72)}%</span>
                        </div>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                        <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                                width: `${(profile.aggression_score || 72)}%`, 
                                background: 'linear-gradient(90deg, #ef4444, #f87171)',
                                boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span style={{ color: '#60a5fa' }}>Stability</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-rose-400">-{profile.stability_delta || 1}%</span>
                            <span className="opacity-50">{(profile.stability_score || 88)}%</span>
                        </div>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                        <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                                width: `${(profile.stability_score || 88)}%`, 
                                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                                boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
