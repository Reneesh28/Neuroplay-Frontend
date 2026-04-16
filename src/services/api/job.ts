import api from "../axios";
import type { ApiResponse } from "../../types/api.types";
import type { Job } from "../../types/job.types";

export const getJobStatus = async (jobId: string): Promise<Job> => {
    const res = await api.get<ApiResponse<Job>>(
        `/upload/status/${jobId}`
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch job");
    }

    return res.data.data;
};

export const getJobResult = async (jobId: string) => {
    const res = await api.get<ApiResponse<any>>(
        `/upload/result/${jobId}`
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch result");
    }

    return res.data.data;
};