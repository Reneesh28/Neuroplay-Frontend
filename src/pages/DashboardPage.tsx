import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";

import { DashboardSkeleton } from "../components/shared/SkeletonLoader";
import ErrorState from "../components/shared/ErrorState";
import DashboardView from "../features/dashboard/components/DashboardView";

const DashboardPage = () => {
    const { id } = useParams();

    if (!id) {
        return (
            <div className="max-w-2xl mx-auto">
                <ErrorState message="Invalid Job ID — no dashboard to show." />
            </div>
        );
    }

    const { data, isLoading, error, refetch } = useDashboard(id);

    if (isLoading || (data && data.status !== 'completed' && data.status !== 'failed')) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto">
                <ErrorState
                    message="Failed to load dashboard data."
                    onRetry={() => refetch()}
                />
            </div>
        );
    }

    if (!data || data.status === 'failed') {
        return (
            <div className="max-w-2xl mx-auto">
                <ErrorState 
                    message={data?.status === 'failed' ? "Simulation failed to produce a valid intelligence report." : "Report not found."} 
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Helmet>
                <title>Report: {id.slice(0, 8)} | NeuroPlay Intelligence</title>
                <meta name="description" content={`Neural intelligence report for job ${id}. Analyzed via Phase 8 simulation pipeline.`} />
            </Helmet>
            <DashboardView data={data} />
        </div>
    );
};

export default DashboardPage;