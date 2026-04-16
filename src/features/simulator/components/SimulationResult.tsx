type SimulationData = {
    predicted_action?: string;
    confidence?: number;
    reasoning?: string;
    coaching_tip?: string;
};

const SimulationResult = ({ result }: { result: SimulationData }) => {
    if (!result) return null;

    const pct = Math.round((result.confidence ?? 0) * 100);
    const confColor =
        pct >= 75 ? "#10b981" :
        pct >= 50 ? "#f59e0b" :
        "#ef4444";

    return (
        <div className="card overflow-hidden animate-fade-up">
            {/* Header */}
            <div
                className="px-5 py-4 flex items-center gap-2"
                style={{ borderBottom: "1px solid var(--border)" }}
            >
                <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--status-completed)" }}
                />
                <h3 style={{ color: "var(--text-heading)", fontSize: "1rem" }}>
                    Simulation Result
                </h3>
            </div>

            <div className="p-5 space-y-4">
                {/* Action + Confidence row */}
                <div className="grid grid-cols-2 gap-3">
                    <div
                        className="rounded-xl p-4"
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                        <p
                            className="text-xs font-semibold uppercase tracking-wider mb-1"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Predicted Action
                        </p>
                        <p
                            className="text-base font-bold"
                            style={{ color: "var(--accent-hover)" }}
                        >
                            {result.predicted_action ?? "N/A"}
                        </p>
                    </div>

                    <div
                        className="rounded-xl p-4"
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                        <p
                            className="text-xs font-semibold uppercase tracking-wider mb-2"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Confidence
                        </p>
                        <div className="flex items-center gap-2">
                            <div
                                className="flex-1 h-1.5 rounded-full overflow-hidden"
                                style={{ background: "var(--border)" }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%`, background: confColor }}
                                />
                            </div>
                            <span className="text-sm font-bold" style={{ color: confColor }}>
                                {pct}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Reasoning */}
                {result.reasoning && (
                    <div
                        className="rounded-xl p-4"
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                        <p
                            className="text-xs font-semibold uppercase tracking-wider mb-2"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Reasoning
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                            {result.reasoning}
                        </p>
                    </div>
                )}

                {/* Coaching Tip */}
                {result.coaching_tip && (
                    <div
                        className="rounded-xl p-4 flex gap-3"
                        style={{
                            background: "rgba(245,158,11,0.06)",
                            border: "1px solid rgba(245,158,11,0.2)",
                        }}
                    >
                        <span className="text-lg mt-0.5">💡</span>
                        <div>
                            <p
                                className="text-xs font-semibold uppercase tracking-wider mb-1"
                                style={{ color: "#fbbf24" }}
                            >
                                Coaching Tip
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: "#fde68a" }}>
                                {result.coaching_tip}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimulationResult;