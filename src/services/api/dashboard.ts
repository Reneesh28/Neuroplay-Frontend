import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface DashboardData {
    id: string;
    status: "queued" | "processing" | "completed" | "failed";
    execution_mode?: string;
    predicted_action: string;
    confidence: number;
    reasoning: string[];
    coaching_tip: string;
    features?: Record<string, number>; // 🔥 Added telemetry
    profile: any;
    patterns: any[];
    metadata: {
        trace_id: string;
        created_at: string;
    };
}

/**
 * 📊 Dashboard Service
 * 
 * Fetches domain-scoped insights and analytics.
 * Per Flow 3 in End-to-End System Flows.
 */
export const getDashboardData = async (jobId: string): Promise<DashboardData> => {
    const res = await apiClient.get<ApiResponse<DashboardData>>(
        `${API_ENDPOINTS.DASHBOARD}/${jobId}`
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch dashboard data");
    }

    return res.data.data;
};
