import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../../constants/api.constants';
import type { ApiResponse } from '../../types/api.types';

export interface SimulationInput {
    scenario: string;
    domain?: string;
}

export interface SimulationResponse {
    jobId: string;
}

// Phase 8 output interface (used when job completes)
export interface SimulationOutput {
    predicted_action: string;
    confidence: number;
    reasoning: string | string[];
    coaching_tip: string;
    execution_mode: 'FULL' | 'PARTIAL' | 'FALLBACK';
}

export const runSimulation = async (
    input: SimulationInput
): Promise<SimulationResponse> => {
    const { scenario, domain } = input;
    
    const res = await apiClient.post<ApiResponse<{ job_id: string }>>(
        API_ENDPOINTS.SIMULATION_RUN,
        {
            domain,
            payload: {
                scenario
            }
        }
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Simulation failed");
    }

    // Backend returns job_id, we map to jobId
    return { jobId: res.data.data.job_id };
};