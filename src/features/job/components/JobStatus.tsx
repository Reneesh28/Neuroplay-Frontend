import { useParams, Link } from "react-router-dom";
import { useJob } from "../hooks/useJob";

import PipelineView from "../../pipeline/components/PipelineView";
import OutputView from "../../output/components/OutputView";
import { useResult } from "../../output/hooks/useResult";

import LoadingState from "../../../components/shared/LoadingState";
import ErrorState from "../../../components/shared/ErrorState";
import EmptyState from "../../../components/shared/EmptyState";

/* ── Status badge config ── */
type JobStatus = "pending" | "processing" | "completed" | "failed" | string;

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
    completed: { label: "Completed",  cls: "badge badge-completed" },
    processing: { label: "Processing", cls: "badge badge-processing" },
    failed:     { label: "Failed",     cls: "badge badge-failed" },
    pending:    { label: "Pending",    cls: "badge badge-pending" },
};

const getStatusBadge = (status: string) =>
    STATUS_BADGE[status] ?? { label: status, cls: "badge badge-pending" };

/* ── Step row status helpers ── */
const STEP_COLOR: Record<string, string> = {
    completed:  "#10b981",
    processing: "#f59e0b",
    failed:     "#ef4444",
    pending:    "var(--text-muted)",
};

const STEP_ICON: Record<string, string> = {
    completed:  "✓",
    processing: "◐",
    failed:     "✕",
    pending:    "○",
};

/* ─────────────────────────────────────── */

const JobStatus = () => {
    const { id } = useParams();

    if (!id) {
        return (
            <div className="max-w-2xl mx-auto">
                <ErrorState message="Invalid Job ID." />
            </div>
        );
    }

    const { data, isLoading, error, refetch } = useJob(id);

    const isCompleted = data?.status === "completed";
    const isFailed    = data?.status === "failed";

    const {
        data: result,
        isLoading: resultLoading,
        error: resultError,
    } = useResult(id, isCompleted);

    /* Loading */
    if (isLoading) return <LoadingState message="Fetching job status…" />;

    /* Error */
    if (error) {
        return (
            <div className="max-w-2xl mx-auto">
                <ErrorState
                    message="Failed to load job data."
                    onRetry={() => refetch()}
                />
            </div>
        );
    }

    /* Empty */
    if (!data) return <EmptyState message="No job data found." />;

    const badge = getStatusBadge(data.status);

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">

            {/* ── Job Header Card ── */}
            <div
                className="card px-6 py-5 flex items-start justify-between gap-4"
            >
                <div className="space-y-1">
                    <h2 style={{ color: "var(--text-heading)" }}>Job Tracking</h2>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                        ID: {id}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={badge.cls}>{badge.label}</span>

                    {/* Link to Dashboard when complete */}
                    {isCompleted && (
                        <Link
                            to={`/dashboard/${id}`}
                            className="text-xs font-medium no-underline transition-colors duration-150"
                            style={{ color: "var(--accent-hover)" }}
                        >
                            View Dashboard →
                        </Link>
                    )}
                </div>
            </div>

            {/* ── Pipeline Visualization ── */}
            <PipelineView steps={data.steps || []} />

            {/* ── Failed Banner ── */}
            {isFailed && (
                <div
                    className="rounded-xl px-5 py-4 flex items-center gap-3"
                    style={{
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                    }}
                >
                    <span className="text-xl">⚠</span>
                    <div>
                        <p className="text-sm font-semibold" style={{ color: "#f87171" }}>
                            Job failed during processing
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            Check the step details below for the specific failure point.
                        </p>
                    </div>
                    <button
                        className="btn btn-danger ml-auto text-xs"
                        onClick={() => refetch()}
                        style={{ padding: "6px 14px" }}
                    >
                        ↺ Retry
                    </button>
                </div>
            )}

            {/* ── Step Detail List ── */}
            <div className="card overflow-hidden">
                <div
                    className="px-5 py-3"
                    style={{ borderBottom: "1px solid var(--border)" }}
                >
                    <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Step Details
                    </p>
                </div>

                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {data.steps.map((step, index) => {
                        const color  = STEP_COLOR[step.status] ?? "var(--text-muted)";
                        const icon   = STEP_ICON[step.status]  ?? "○";
                        const isProc = step.status === "processing";

                        return (
                            <div
                                key={index}
                                className="px-5 py-4 flex items-start justify-between gap-4 transition-colors duration-150"
                                style={{
                                    background: isProc ? "rgba(245,158,11,0.04)" : "transparent",
                                }}
                            >
                                {/* Left: icon + name */}
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
                                        style={{
                                            background: `${color}18`,
                                            border: `1px solid ${color}44`,
                                            color,
                                            animation: isProc ? "pulse-dot 1.4s ease-in-out infinite" : "none",
                                        }}
                                    >
                                        {icon}
                                    </span>
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {step.name}
                                    </span>
                                </div>

                                {/* Right: status badge */}
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span
                                        className="text-xs font-semibold capitalize"
                                        style={{ color }}
                                    >
                                        {step.status}
                                    </span>

                                    {/* Inline step error */}
                                    {step.error && (
                                        <span
                                            className="text-xs"
                                            style={{ color: "#f87171", maxWidth: "200px", textAlign: "right" }}
                                        >
                                            {step.error.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── AI Output Section ── */}
            {isCompleted && (
                <div>
                    {resultLoading ? (
                        <LoadingState message="Fetching AI analysis result…" />
                    ) : resultError ? (
                        <ErrorState message="Failed to load AI result." />
                    ) : (
                        <OutputView result={result} />
                    )}
                </div>
            )}
        </div>
    );
};

export default JobStatus;