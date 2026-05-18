import React from 'react';
import { ExecutionModeBadge } from './ExecutionModeBadge';
import { Cpu } from 'lucide-react';

interface PredictionCardProps {
    action: string;
    mode: string;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ action, mode }) => {
    return (
        <div
            className="group p-6 rounded-none relative overflow-hidden transition-none border border-white/20"
            style={{
                background: '#06080c',
            }}
        >

            <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent)' }}>
                            Predicted Tactical Execution
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-heading)' }}>
                            {action}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <ExecutionModeBadge mode={mode} />
                        <span className="text-[10px] font-mono opacity-50 text-cyan-400 uppercase tracking-widest">Inference Delta: 0.04s</span>
                    </div>
                </div>

                <div
                    className="w-14 h-14 rounded-none flex items-center justify-center text-cyan-400 bg-black border border-cyan-500 transition-none"
                >
                    <Cpu size={28} />
                </div>
            </div>
        </div>
    );
};
