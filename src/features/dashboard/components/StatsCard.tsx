export const StatsCard = ({
    label,
    value,
    icon,
    trend,
    accent = false,
}: {
    label: string;
    value: string | number;
    icon?: string;
    trend?: "optimal" | "stable" | "nominal" | "critical";
    accent?: boolean;
}) => {
    const trendColor =
        trend === "optimal" ? "#10b981" :
            trend === "stable" ? "#34d399" :
                trend === "nominal" ? "#fbbf24" :
                    trend === "critical" ? "#ef4444" :
                        "var(--text-muted)";

    return (
        <div
            className="card p-5 flex items-center justify-between transition-all duration-300 hover:shadow-2xl hover:border-white/20"
            style={{
                borderColor: accent ? "var(--accent-glow)" : undefined,
                background: accent ? "var(--accent-dim)" : "var(--bg-elevated)",
            }}
        >
            <div className="space-y-1">
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
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl grayscale opacity-40">
                    {icon}
                </div>
            )}
        </div>
    );
};