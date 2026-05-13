import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../services/api/dashboard";

export const useDashboard = (jobId: string) => {
    return useQuery({
        queryKey: ["dashboard", jobId],
        queryFn: () => getDashboardData(jobId),
        enabled: !!jobId,
        staleTime: 0,
        gcTime: 0,
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            if (!status || (status !== 'completed' && status !== 'failed')) {
                return 2000;
            }
            return false;
        }
    });
};