import { useQuery } from "@tanstack/react-query";
import { getJobResult } from "../../../services/api/job";

export const useDashboard = (jobId: string) => {
    return useQuery({
        queryKey: ["dashboard", jobId],
        queryFn: () => getJobResult(jobId),
        enabled: !!jobId,
    });
};