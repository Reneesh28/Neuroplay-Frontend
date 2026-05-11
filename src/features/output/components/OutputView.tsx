import { useState } from "react";
import JsonViewer from "./JsonViewer";
import { ResultPanel } from "../../../components/results/ResultPanel";

type OutputResult = {
    predicted_action?: string;
    confidence?: number;
    reasoning?: string;
    coaching_tip?: string;
    [key: string]: unknown;
};

type Tab = "summary" | "raw";



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
                <div className="p-6">
                    {/* System Status Banner for degraded modes */}
                    {result.execution_mode && result.execution_mode !== "FULL" && (
                        <div 
                            className="mb-6 p-4 rounded-xl flex items-center gap-4 animate-pulse"
                            style={{ 
                                background: result.execution_mode === "FALLBACK" ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)",
                                border: result.execution_mode === "FALLBACK" ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)"
                            }}
                        >
                            <span className="text-xl">{result.execution_mode === "FALLBACK" ? "⚠️" : "⚡"}</span>
                            <div className="flex-1">
                                <p className="text-sm font-bold uppercase tracking-tight" style={{ color: result.execution_mode === "FALLBACK" ? "#f87171" : "#fbbf24" }}>
                                    System Performance Note
                                </p>
                                <p className="text-xs opacity-80" style={{ color: "var(--text-primary)" }}>
                                    {result.execution_mode === "FALLBACK" 
                                        ? "AI pipeline is currently unavailable. Using static heuristics for reasoning." 
                                        : "Partial pipeline execution. Some neural patterns may be missing."}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <ResultPanel result={result as any} />
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