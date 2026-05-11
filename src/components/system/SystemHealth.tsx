import React from 'react';

interface HealthStatus {
    service: string;
    status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    latency: string;
    load: string;
}

const SERVICES: HealthStatus[] = [
    { service: 'API_GATEWAY', status: 'ONLINE', latency: '12ms', load: '14%' },
    { service: 'AI_REASONING_ENGINE', status: 'ONLINE', latency: '240ms', load: '42%' },
    { service: 'VECTOR_DB_FAISS', status: 'ONLINE', latency: '4ms', load: '8%' },
    { service: 'WORKER_CLUSTER', status: 'ONLINE', latency: '0ms', load: '12%' },
    { service: 'REDIS_CACHE', status: 'ONLINE', latency: '2ms', load: '5%' },
    { service: 'MONGODB_PRIMARY', status: 'ONLINE', latency: '8ms', load: '22%' },
];

export const SystemHealth: React.FC = () => {
    return (
        <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    Service Health Matrix
                </h3>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Global Status: Optimal</span>
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {SERVICES.map((s) => (
                    <div key={s.service} className="px-6 py-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors duration-150">
                        <div className="flex items-center gap-4">
                            <div 
                                className="w-1 h-4 rounded-full" 
                                style={{ 
                                    background: s.status === 'ONLINE' ? '#10b981' : s.status === 'DEGRADED' ? '#f59e0b' : '#ef4444' 
                                }} 
                            />
                            <span className="text-xs font-mono font-bold tracking-tight text-white/80">{s.service}</span>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="hidden md:block text-right">
                                <p className="text-[9px] opacity-30 uppercase font-bold">Latency</p>
                                <p className="text-[10px] font-mono">{s.latency}</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-[9px] opacity-30 uppercase font-bold">Load</p>
                                <p className="text-[10px] font-mono">{s.load}</p>
                            </div>
                            <span 
                                className="px-2 py-0.5 rounded text-[9px] font-black border"
                                style={{ 
                                    borderColor: s.status === 'ONLINE' ? '#10b98144' : '#f59e0b44',
                                    color: s.status === 'ONLINE' ? '#34d399' : '#fbbf24',
                                    background: s.status === 'ONLINE' ? '#10b98111' : '#f59e0b11'
                                }}
                            >
                                {s.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
