import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../services/api/dashboard";

export const useResult = (jobId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["result", jobId],
        queryFn: () => getDashboardData(jobId),
        enabled: !!jobId && enabled,
    });
};