import React from 'react';
import { MemoryCard } from './MemoryCard';
import { ProfileStats } from './ProfileStats';
import { BehaviorTrend } from './BehaviorTrend';

interface ContextPanelProps {
    context: {
        profile?: any;
        memories?: Array<{ text: string; distance?: number }>;
        [key: string]: any;
    };
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ context }) => {
    if (!context || (!context.profile && (!context.memories || context.memories.length === 0))) {
        return null;
    }

    return (
        <div className="space-y-8 animate-fade-in w-full mt-12 pb-12">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 
                    className="text-sm font-black uppercase tracking-[0.3em] shrink-0"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Digital Twin Context
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Profile Stats */}
                <ProfileStats profile={context.profile || {}} />

                {/* Behavioral Trends */}
                <BehaviorTrend />

                {/* Retrieved Memories */}
                <div 
                    className="rounded-2xl space-y-4 flex flex-col h-full"
                    style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                    }}
                >
                    <div className="px-6 pt-5 pb-0">
                        <div className="flex justify-between items-center">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                                Memory Shards
                            </h4>
                            <span className="text-[10px] font-mono opacity-30">FAISS_RETRIEVED</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 px-2 pb-2 overflow-hidden">
                        <div className="space-y-2 h-[260px] overflow-y-auto pr-2 custom-scrollbar px-4 pb-4">
                            {context.memories && context.memories.length > 0 ? (
                                context.memories.map((mem, idx) => (
                                    <MemoryCard key={idx} text={mem.text} distance={mem.distance} />
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-30 italic py-10">
                                    <span className="text-2xl">📡</span>
                                    <p className="text-xs text-center max-w-[150px]">
                                        No relevant historical memories retrieved.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
