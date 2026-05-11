import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";
import type { Job } from "../../types/job.types";

export const getJobStatus = async (jobId: string): Promise<Job> => {
    const res = await apiClient.get<ApiResponse<Job>>(
        API_ENDPOINTS.JOB_STATUS(jobId)
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch job");
    }

    return res.data.data;
};

// Backend returns everything in getJob, so we map the output field
export const getJobResult = async (jobId: string) => {
    const res = await apiClient.get<ApiResponse<any>>(
        API_ENDPOINTS.JOB_STATUS(jobId)
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch result");
    }

    // Backend returns result in the 'output' field of job
    return res.data.data.output;
};