import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getUserJobs } from '../services/api/job';
import LoadingState from '../components/shared/LoadingState';
import ErrorState from '../components/shared/ErrorState';
import { JobStatusBadge } from '../components/job/JobStatusBadge';

const InsightsPage: React.FC = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['user-jobs'],
        queryFn: getUserJobs,
        refetchInterval: 5000 // Refresh list every 5s for active jobs
    });

    if (isLoading) return <LoadingState message="Retrieving intelligence history..." />;

    if (error) {
        return <ErrorState message="Failed to load job history." onRetry={() => refetch()} />;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-up">
            <Helmet>
                <title>Insights & History | NeuroPlay Intelligence</title>
                <meta name="description" content="View historical tactical simulations and intelligence reports." />
            </Helmet>

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter italic" style={{ color: "var(--text-heading)" }}>
                        Tactical <span className="text-accent">Insights</span>
                    </h1>
                    <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.3em] mt-1">
                        Historical Simulation Archive
                    </p>
                </div>
                <Link to="/" className="btn btn-primary px-6 py-2 text-xs font-bold uppercase tracking-widest">
                    New Ingestion
                </Link>
            </div>

            <div className="space-y-4">
                {(!data || data.length === 0) ? (
                    <div className="card p-20 text-center opacity-40">
                        <p className="text-sm uppercase tracking-widest">No intelligence reports found in archive.</p>
                    </div>
                ) : (
                    data.map((job) => (
                        <Link
                            key={job.job_id}
                            to={job.status === 'completed' ? `/dashboard/${job.job_id}` : `/job/${job.job_id}`}
                            className="card p-6 flex items-center justify-between group hover:border-accent/40 transition-all no-underline"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
                                    {job.status === 'completed' ? '📊' : '⏳'}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white mb-1">
                                        Instance: {job.job_id.slice(0, 8)}
                                    </h3>
                                    <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                                        Step: {(job.current_step || "Initializing").replace(/_/g, ' ')} • {job.progress}%
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <JobStatusBadge status={job.status} />
                                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default InsightsPage;
