import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface DigitalTwinProfile {
    userId: string;
    domain: string;
    tactical_style: string;
    confidence_score: number;
    last_updated: string;
    patterns: string[];
}

/**
 * 👤 Profile Service
 * 
 * Interacts with the Player Profile / Digital Twin endpoints.
 * Note: Backend implementation for these is currently in progress.
 */
export const getProfile = async (userId: string): Promise<DigitalTwinProfile> => {
    const res = await apiClient.get<ApiResponse<DigitalTwinProfile>>(
        `${API_ENDPOINTS.PROFILE}/${userId}`
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to fetch profile");
    }

    return res.data.data;
};

export const updateProfile = async (userId: string, data: Partial<DigitalTwinProfile>) => {
    const res = await apiClient.patch<ApiResponse<DigitalTwinProfile>>(
        `${API_ENDPOINTS.PROFILE}/${userId}`,
        data
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Failed to update profile");
    }

    return res.data.data;
};
