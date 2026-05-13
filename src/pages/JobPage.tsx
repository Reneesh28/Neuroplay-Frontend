import { useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobStatus } from "../services/api/job";
import type { JobStatus } from "../services/api/job";
import { usePolling } from "../hooks/usePolling";
import { JobTimeline } from "../components/job/JobTimeline";
import { JobStatusBadge } from "../components/job/JobStatusBadge";
import LoadingState from "../components/shared/LoadingState";
import ErrorState from "../components/shared/ErrorState";

const JobPage = () => {
    const { id } = useParams<{ id: string }>();

    const fetchFn = useCallback(() => getJobStatus(id!), [id]);
    const shouldStop = useCallback((job: JobStatus) => job.status === "completed" || job.status === "failed", []);

    const { data, error, startPolling, stopPolling, isPolling, isStale } = usePolling({
        fetchFn,
        shouldStop,
        interval: 2000,
        maxAttempts: 300,
    });

    useEffect(() => {
        if (id) {
            startPolling();
        }
        return () => stopPolling();
    }, [id, startPolling, stopPolling]);


    if (error && !data) {
        return (
            <div className="max-w-2xl mx-auto py-8">
                <ErrorState
                    message={error.message || "Failed to load job data."}
                    onRetry={() => startPolling()}
                />
            </div>
        );
    }

    if (!data) {
        return <LoadingState message="Initializing job tracking…" />;
    }

    const isCompleted = data.status === "completed";
    const isFailed = data.status === "failed";

    return (
        <div className="max-w-3xl mx-auto space-y-6 py-6 animate-fade-up">
            {/* ── Operational Header ── */}
            <div className="card p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative overflow-hidden">
                <div
                    className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none"
                    style={{ background: 'var(--accent)' }}
                />

                <div className="space-y-3 relative z-10 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-xl">
                            📡
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight uppercase" style={{ color: "var(--text-heading)" }}>
                                Neural Pipeline Monitor
                            </h2>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
                                Tracking Job Instance: {id?.slice(0, 8)}...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 relative z-10">
                    <JobStatusBadge status={data.status} />
                    {isPolling && (
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Synchronizing...
                        </div>
                    )}
                </div>
            </div>

            {/* ── Timeline ── */}
            <JobTimeline steps={data.steps || []} />

            {/* ── Status Banners ── */}
            {isStale && !isFailed && !isCompleted && (
                <div
                    className="rounded-2xl px-6 py-4 flex items-center gap-4 animate-pulse"
                    style={{
                        background: "rgba(245,158,11,0.05)",
                        border: "1px solid rgba(245,158,11,0.2)",
                    }}
                >
                    <span className="text-xl">⏳</span>
                    <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-tight text-amber-500">
                            Neural Processing Congestion
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                            Inference is taking longer than expected. The engine is still active.
                        </p>
                    </div>
                </div>
            )}

            {isFailed && (
                <div
                    className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-6 animate-fade-in"
                    style={{
                        background: "rgba(239,68,68,0.05)",
                        border: "1px solid rgba(239,68,68,0.2)",
                    }}
                >
                    <span className="text-3xl">⚠️</span>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-bold uppercase tracking-tight" style={{ color: "#f87171" }}>
                            Critical Synchronization Failure
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                            The neural engine encountered an unrecoverable state during processing.
                        </p>
                    </div>
                    <button
                        className="btn btn-danger py-2.5 px-6 font-bold text-xs uppercase tracking-widest"
                        onClick={() => startPolling()}
                    >
                        Re-Attempt Connection
                    </button>
                </div>
            )}

            {isCompleted && (
                <div
                    className="p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(45deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))',
                        border: '1px solid rgba(16,185,129,0.2)'
                    }}
                >
                    <div
                        className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
                        style={{ background: 'var(--status-completed)' }}
                    />

                    <div className="text-center sm:text-left">
                        <h4 className="text-base font-black uppercase tracking-tight text-emerald-400 mb-1">Inference Finalized</h4>
                        <p className="text-xs text-emerald-500/70">Tactical vectors mapped. Simulation results ready for review.</p>
                    </div>
                    <Link
                        to={`/dashboard/${id}`}
                        className="btn btn-primary py-3 px-8 text-sm font-bold tracking-tight shadow-xl"
                        style={{ background: '#10b981', boxShadow: '0 8px 24px -8px rgba(16,185,129,0.4)' }}
                    >
                        Access Intelligence Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default JobPage;