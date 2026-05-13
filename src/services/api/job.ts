import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../../constants/api.constants';
import type { ApiResponse } from '../../types/api.types';

export interface JobStep {
    name: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    output_ref?: string;
    execution_mode?: 'FULL' | 'PARTIAL' | 'FALLBACK';
}

export interface JobStatus {
    job_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    current_step: string;
    progress: number;
    steps: JobStep[];
}

export const getJobStatus = async (id: string): Promise<JobStatus> => {
    const res = await apiClient.get<ApiResponse<JobStatus>>(`${API_ENDPOINTS.JOB_STATUS}/${id}`);
    
    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch job status");
    }
    
    return res.data.data;
};

export const getUserJobs = async (): Promise<JobStatus[]> => {
    const res = await apiClient.get<ApiResponse<JobStatus[]>>(API_ENDPOINTS.JOB_STATUS);
    
    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch user jobs");
    }
    
    return res.data.data;
};

export const replayJob = async (bullJobId: string): Promise<void> => {
    const res = await apiClient.post<ApiResponse<void>>(`${API_ENDPOINTS.JOB_STATUS}/dlq/${bullJobId}/replay`);
    
    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to replay job");
    }
};