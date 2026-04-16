const InsightCard = ({
    title,
    content,
    variant = "default",
}: {
    title: string;
    content: string;
    variant?: "default" | "tip";
}) => {
    const isTip = variant === "tip";

    return (
        <div
            className="rounded-xl p-5 flex flex-col gap-2 transition-colors duration-200"
            style={{
                background: isTip ? "rgba(245,158,11,0.06)" : "var(--bg-elevated)",
                border: `1px solid ${isTip ? "rgba(245,158,11,0.2)" : "var(--border)"}`,
            }}
        >
            <div className="flex items-center gap-2">
                {isTip && <span>💡</span>}
                <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: isTip ? "#fbbf24" : "var(--text-muted)" }}
                >
                    {title}
                </p>
            </div>
            <p
                className="text-sm leading-relaxed"
                style={{ color: isTip ? "#fde68a" : "var(--text-primary)" }}
            >
                {content}
            </p>
        </div>
    );
};

export default InsightCard;