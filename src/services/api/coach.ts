import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface CoachRequest {
    userId: string;
    domain: string;
}

export interface CoachResponse {
    jobId: string;
}

export interface CoachRecommendation {
    recommendations: string[];
    improvement_strategy: string;
    focus_areas: string[];
}

/**
 * 👨‍🏫 AI Coach Service
 * 
 * Triggers personalized coaching generation.
 * Per Flow 4 in End-to-End System Flows.
 */
export const generateCoaching = async (request: CoachRequest): Promise<CoachResponse> => {
    const res = await apiClient.post<ApiResponse<{ jobId: string }>>(
        API_ENDPOINTS.COACH_GENERATE,
        request
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to generate coaching");
    }

    return res.data.data;
};
