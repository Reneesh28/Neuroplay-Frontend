type Status = "pending" | "processing" | "completed" | "failed";

const STATUS_CONFIG: Record<Status, { icon: string; bg: string; border: string; text: string; ring: string }> = {
    completed: {
        icon: "✓",
        bg: "rgba(16,185,129,0.12)",
        border: "rgba(16,185,129,0.30)",
        text: "#34d399",
        ring: "rgba(16,185,129,0.20)",
    },
    processing: {
        icon: "◐",
        bg: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.30)",
        text: "#fbbf24",
        ring: "rgba(245,158,11,0.20)",
    },
    failed: {
        icon: "✕",
        bg: "rgba(239,68,68,0.12)",
        border: "rgba(239,68,68,0.30)",
        text: "#f87171",
        ring: "rgba(239,68,68,0.20)",
    },
    pending: {
        icon: "○",
        bg: "rgba(74,85,104,0.15)",
        border: "rgba(74,85,104,0.30)",
        text: "#64748b",
        ring: "transparent",
    },
};

const PipelineStep = ({
    label,
    status,
}: {
    label: string;
    status: Status;
}) => {
    const cfg = STATUS_CONFIG[status];
    const isProcessing = status === "processing";

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Circle */}
            <div
                className="relative w-11 h-11 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300"
                style={{
                    background: cfg.bg,
                    border: `2px solid ${cfg.border}`,
                    color: cfg.text,
                    boxShadow: `0 0 0 4px ${cfg.ring}`,
                }}
            >
                <span
                    style={{
                        animation: isProcessing ? "pulse-dot 1.4s ease-in-out infinite" : "none",
                        display: "inline-block",
                    }}
                >
                    {cfg.icon}
                </span>
            </div>

            {/* Label */}
            <p
                className="text-xs font-medium text-center leading-tight"
                style={{ color: status === "pending" ? "var(--text-muted)" : "var(--text-secondary)", maxWidth: "60px" }}
            >
                {label}
            </p>
        </div>
    );
};

export default PipelineStep;