import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../../constants/api.constants';
import type { ApiResponse } from '../../types/api.types';

export interface User {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    token: string;
    user: User;
    profile_id?: string;
}

export const login = async (credentials: any): Promise<AuthResponse> => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH_LOGIN, credentials);
    
    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Login failed");
    }
    
    return res.data.data;
};

export const register = async (userData: any): Promise<AuthResponse> => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH_REGISTER, userData);
    
    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Registration failed");
    }
    
    return res.data.data;
};
