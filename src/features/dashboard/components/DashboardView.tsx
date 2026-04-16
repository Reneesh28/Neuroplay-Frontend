import StatsCard from "./StatsCard";
import InsightCard from "./InsightCard";

const DashboardView = ({ data }: { data: any }) => {
    if (!data) return null;

    const confidence = data.confidence ?? 0;
    const pct = `${(confidence * 100).toFixed(1)}%`;

    return (
        <div className="space-y-6 animate-fade-up">
            {/* ── Page Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 style={{ color: "var(--text-heading)" }}>Analysis Dashboard</h2>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        AI inference result overview
                    </p>
                </div>
                <span
                    className="badge badge-completed"
                    style={{ fontSize: "11px" }}
                >
                    ● Completed
                </span>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 gap-4">
                <StatsCard
                    label="Predicted Action"
                    value={data.predicted_action || "N/A"}
                    accent
                />
                <StatsCard
                    label="Confidence Score"
                    value={pct}
                />
            </div>

            {/* ── Divider ── */}
            <div style={{ borderTop: "1px solid var(--border)" }} />

            {/* ── Insights ── */}
            <div>
                <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-muted)" }}
                >
                    Insights
                </p>
                <div className="space-y-3">
                    <InsightCard
                        title="Reasoning"
                        content={data.reasoning || "No reasoning available"}
                    />
                    <InsightCard
                        title="Coaching Tip"
                        content={data.coaching_tip || "No tip available"}
                        variant="tip"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;