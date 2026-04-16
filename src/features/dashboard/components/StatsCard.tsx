const StatsCard = ({
    label,
    value,
    accent = false,
}: {
    label: string;
    value: string | number;
    accent?: boolean;
}) => {
    return (
        <div
            className="card p-5 flex flex-col gap-2 transition-all duration-200 hover:scale-[1.02]"
            style={{
                borderColor: accent ? "var(--accent-glow)" : undefined,
                background: accent ? "var(--accent-dim)" : undefined,
            }}
        >
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {label}
            </p>
            <p
                className="text-2xl font-bold leading-none"
                style={{ color: accent ? "var(--accent-hover)" : "var(--text-heading)" }}
            >
                {value}
            </p>
        </div>
    );
};

export default StatsCard;