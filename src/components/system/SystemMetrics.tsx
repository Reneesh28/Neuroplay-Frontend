import React from 'react';

export const SystemMetrics: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card p-5 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Pipeline Throughput</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">4.2</span>
                    <span className="text-xs opacity-40 mb-1">req/sec</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '42%' }} />
                </div>
            </div>

            <div className="card p-5 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Job Success Rate</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-emerald-400">99.8%</span>
                    <span className="text-[9px] text-emerald-400/50 mb-1">+0.2%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.8%' }} />
                </div>
            </div>

            <div className="card p-5 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Avg. Inference Time</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-amber-400">1.2s</span>
                    <span className="text-xs opacity-40 mb-1">stable</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '30%' }} />
                </div>
            </div>
        </div>
    );
};
