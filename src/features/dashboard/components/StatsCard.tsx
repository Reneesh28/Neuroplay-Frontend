import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export const StatsCard = ({
    label,
    value,
    icon,
    trend,
    accent = false,
}: {
    label: string;
    value: string | number;
    icon?: string | React.ReactNode;
    trend?: "optimal" | "stable" | "nominal" | "critical";
    accent?: boolean;
}) => {
    const trendColor =
        trend === "optimal" ? "#00f0ff" : // Cyber Cyan
            trend === "stable" ? "#34d399" : // Emerald
                trend === "nominal" ? "#fbbf24" :
                    trend === "critical" ? "#ff1744" :
                        "var(--text-muted)";

    // Generate random mock data for the sparkline trend
    const mockData = Array.from({ length: 15 }, (_, i) => ({ val: Math.random() * 50 + 50 + i * 2 }));

    return (
        <div
            className="card p-5 relative overflow-hidden flex items-center justify-between transition-none rounded-none group"
            style={{
                border: "1px solid",
                borderColor: accent ? "var(--accent)" : "var(--border-muted)",
                background: accent ? "#00f0ff10" : "#06080c",
            }}
        >
            {/* Mini Recharts Sparkline Background */}
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-none pointer-events-none mt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData}>
                        <Area type="step" dataKey="val" stroke={trendColor} fill={trendColor} fillOpacity={0.1} strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                    {label}
                </p>
                <div className="flex items-center gap-2">
                    <p
                        className="text-2xl font-black tracking-tight"
                        style={{ color: accent ? "var(--accent-hover)" : "var(--text-heading)" }}
                    >
                        {value}
                    </p>
                    {trend && (
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md" style={{ background: `${trendColor}20`, color: trendColor }}>
                            {trend}
                        </span>
                    )}
                </div>
            </div>
            {icon && (
                <div className="w-10 h-10 rounded-none bg-black border border-white/20 flex items-center justify-center text-cyan-500 relative z-10 transition-none">
                    {typeof icon === 'string' ? icon : <Activity size={18} />}
                </div>
            )}
        </div>
    );
};