import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface BehaviorTrendProps {
    data?: any[];
}

const DEFAULT_DATA = [
    { time: 'T-5', value: 65 },
    { time: 'T-4', value: 78 },
    { time: 'T-3', value: 72 },
    { time: 'T-2', value: 85 },
    { time: 'T-1', value: 82 },
    { time: 'Now', value: 91 },
];

export const BehaviorTrend: React.FC<BehaviorTrendProps> = ({ data = DEFAULT_DATA }) => {
    return (
        <div 
            className="p-5 rounded-2xl space-y-4 h-full"
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)'
            }}
        >
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                        Tactical Consistency Trend
                    </h4>
                    <p className="text-xs opacity-50">Behavioral stability across temporal nodes</p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">+12%</span>
                </div>
            </div>

            <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{ 
                                background: 'var(--bg-elevated)', 
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '10px'
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--accent)" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#trendGradient)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-[8px] uppercase tracking-widest opacity-30 font-bold">
                <span>Phase Analysis</span>
                <span>Real-time Delta</span>
            </div>
        </div>
    );
};
