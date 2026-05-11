import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface DashboardData {
    profile: any;
    segments: any[];
    patterns: any[];
    insights: {
        total_tactical_actions: number;
        average_confidence: number;
        primary_style: string;
    };
}

/**
 * 📊 Dashboard Service
 * 
 * Fetches domain-scoped insights and analytics.
 * Per Flow 3 in End-to-End System Flows.
 */
export const getDashboardData = async (sessionId: string): Promise<DashboardData> => {
    const res = await apiClient.get<ApiResponse<DashboardData>>(
        API_ENDPOINTS.DASHBOARD(sessionId)
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch dashboard data");
    }

    return res.data.data;
};
