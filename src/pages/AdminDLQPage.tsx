import React, { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";
import { API_ENDPOINTS } from "../constants/api.constants";
import type { ApiResponse } from "../types/api.types";
import { replayJob } from "../services/api/job";
import ErrorState from "../components/shared/ErrorState";
import LoadingState from "../components/shared/LoadingState";

interface DLQJob {
    id: string;
    data: {
        job_id: string;
        step: string;
        error: string;
        failed_at: string;
        trace_id: string;
    };
    timestamp: number;
}

const AdminDLQPage: React.FC = () => {
    const [jobs, setJobs] = useState<DLQJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [replaying, setReplaying] = useState<string | null>(null);

    const fetchDLQ = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get<ApiResponse<DLQJob[]>>(`${API_ENDPOINTS.JOB_STATUS}/dlq/list`);
            if (res.data.success) {
                setJobs(res.data.data);
            }
        } catch (err: any) {
            setError(err.error?.message || "Failed to fetch DLQ jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDLQ();
    }, []);

    const handleReplay = async (bullJobId: string) => {
        setReplaying(bullJobId);
        try {
            await replayJob(bullJobId);
            setJobs(prev => prev.filter(j => j.id !== bullJobId));
        } catch (err: any) {
            alert(err.message || "Replay failed");
        } finally {
            setReplaying(null);
        }
    };

    if (loading) return <LoadingState message="Scanning Dead Letter Queue..." />;
    if (error) return <ErrorState message={error} onRetry={fetchDLQ} />;

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-8 animate-fade-in">
            {/* ── Header ── */}
            <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                        DLQ <span className="text-red-500">Terminal</span>
                    </h1>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 mt-1">
                        Manual Intervention & Neural Replay Interface
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">Active Dead Jobs</div>
                    <div className="text-2xl font-mono font-black">{jobs.length}</div>
                </div>
            </div>

            {/* ── Grid ── */}
            {jobs.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-sm opacity-40 font-mono italic">No dead jobs detected. Pipeline clear.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map(job => (
                        <div 
                            key={job.id}
                            className="group bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-red-500/30 transition-all duration-500 flex flex-col md:flex-row gap-6 items-center"
                        >
                            <div className="flex-1 min-w-0 w-full space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 rounded uppercase">
                                        {job.data.step}
                                    </span>
                                    <span className="text-[10px] font-mono opacity-30 truncate">
                                        ID: {job.data.job_id}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold truncate pr-4">
                                    Error: <span className="text-red-400 font-mono">{job.data.error}</span>
                                </h3>
                                <div className="flex gap-6 text-[10px] font-mono opacity-40 uppercase tracking-widest">
                                    <span>Trace: {job.data.trace_id || "N/A"}</span>
                                    <span>Failed: {new Date(job.data.failed_at).toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleReplay(job.id)}
                                disabled={replaying === job.id}
                                className="btn btn-primary w-full md:w-auto px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-tighter hover:bg-emerald-400 hover:text-black transition-colors"
                            >
                                {replaying === job.id ? "Replaying..." : "Replay Sequence"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Footer Stats ── */}
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 text-[10px] font-mono uppercase tracking-[0.2em]">
                <div className="p-4 border border-white/10 rounded-xl">Retention: 30 Days</div>
                <div className="p-4 border border-white/10 rounded-xl">Auto-Purge: Enabled</div>
                <div className="p-4 border border-white/10 rounded-xl">Security: Level 4 Active</div>
            </div>
        </div>
    );
};

export default AdminDLQPage;
