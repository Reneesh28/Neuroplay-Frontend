import { useParams } from "react-router-dom";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";

import LoadingState from "../components/shared/LoadingState";
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

    if (isLoading) return <LoadingState message="Loading analysis dashboard…" />;

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

    return (
        <div className="max-w-3xl mx-auto">
            <DashboardView data={data} />
        </div>
    );
};

export default DashboardPage;