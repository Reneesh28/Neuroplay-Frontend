import { useQuery } from "@tanstack/react-query";
import { getJobResult } from "../../../services/api/job";

export const useResult = (jobId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["result", jobId],
        queryFn: () => getJobResult(jobId),
        enabled, // only fetch when job completed
    });
};