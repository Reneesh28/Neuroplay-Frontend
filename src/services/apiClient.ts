import axios from 'axios';
import { API_BASE_URL } from '../constants/api.constants';

/**
 * 🧠 NeuroPlay Engine — Central API Client
 * 
 * Standardized axios instance with:
 * - Base URL from environment or fallback
 * - Strict timeout
 * - JSON content type by default
 * - Response interceptor for consistent error mapping
 */
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-version': 'v1', // 🚀 Per Integration Layer Spec Section 3.1
    },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Map backend error structure to a standard format
        const errorData = error.response?.data || { 
            success: false, 
            error: { 
                message: error.message, 
                code: 'NETWORK_ERROR' 
            } 
        };
        
        console.error('[API Error]:', errorData);
        
        // Return a rejected promise with the structured error
        return Promise.reject(errorData);
    }
);

export default apiClient;
