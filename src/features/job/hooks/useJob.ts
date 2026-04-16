import { useQuery } from "@tanstack/react-query";
import { getJobStatus } from "../../../services/api/job";

export const useJob = (jobId: string) => {
    return useQuery({
        queryKey: ["job", jobId],
        queryFn: () => getJobStatus(jobId),

        refetchInterval: (query) => {
            const data = query.state.data;

            if (!data) return 2000;

            if (data.status === "completed" || data.status === "failed") {
                return false; // stop polling
            }

            return 2000;
        },
    });
};