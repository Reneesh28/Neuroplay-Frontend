import { useState } from "react";
import JsonViewer from "./JsonViewer";

type OutputResult = {
    predicted_action?: string;
    confidence?: number;
    reasoning?: string;
    coaching_tip?: string;
    [key: string]: unknown;
};

type Tab = "summary" | "raw";

const ConfidenceBar = ({ value }: { value: number }) => {
    const pct = Math.round(value * 100);
    const color =
        pct >= 75 ? "#10b981" :
        pct >= 50 ? "#f59e0b" :
        "#ef4444";

    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Confidence</span>
                <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
            </div>
            <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--border)" }}
            >
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
        </div>
    );
};

const OutputView = ({ result }: { result: OutputResult }) => {
    const [activeTab, setActiveTab] = useState<Tab>("summary");

    if (!result) return null;

    return (
        <div className="card animate-fade-up" style={{ overflow: "hidden", marginTop: "2rem" }}>
            {/* ── Card Header ── */}
            <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--border)" }}
            >
                <div className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--status-completed)" }}
                    />
                    <h3 style={{ color: "var(--text-heading)" }}>AI Analysis Output</h3>
                </div>

                {/* Tab switcher */}
                <div
                    className="flex rounded-lg p-0.5 gap-0.5"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                >
                    {(["summary", "raw"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-3 py-1 rounded-md text-xs font-medium capitalize transition-all duration-150"
                            style={{
                                background: activeTab === tab ? "var(--accent-dim)" : "transparent",
                                color: activeTab === tab ? "var(--accent-hover)" : "var(--text-muted)",
                                border: activeTab === tab ? "1px solid var(--accent-glow)" : "1px solid transparent",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Summary Tab ── */}
            {activeTab === "summary" && (
                <div className="p-6 space-y-5">
                    {/* Top row: Action + Confidence */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Predicted Action */}
                        <div
                            className="rounded-xl p-4"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                        >
                            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                                Predicted Action
                            </p>
                            <p
                                className="text-lg font-bold leading-tight"
                                style={{ color: "var(--accent-hover)" }}
                            >
                                {result.predicted_action || "N/A"}
                            </p>
                        </div>

                        {/* Confidence Gauge */}
                        <div
                            className="rounded-xl p-4 flex flex-col justify-center"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                        >
                            <ConfidenceBar value={result.confidence ?? 0} />
                        </div>
                    </div>

                    {/* Reasoning */}
                    {result.reasoning && (
                        <div
                            className="rounded-xl p-4"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                        >
                            <p className="text-xs mb-2 font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
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
                                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#fbbf24" }}>
                                    Coaching Tip
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: "#fde68a" }}>
                                    {result.coaching_tip}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── Raw Tab ── */}
            {activeTab === "raw" && (
                <div className="p-4">
                    <JsonViewer data={result} />
                </div>
            )}
        </div>
    );
};

export default OutputView;