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
import { useSessionStore } from '../features/auth/stores/sessionStore';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-version': 'v1',
    },
});

// Request interceptor for trace_id and Auth
apiClient.interceptors.request.use((config) => {
    // 🚀 STEP 1: Generate/Propagate Trace ID (Task 5)
    const traceId = crypto.randomUUID();
    config.headers['x-trace-id'] = traceId;

    // 🚀 STEP 2: Auth Token Injection (Task 3)
    const { token, userId, gameId } = useSessionStore.getState();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 🚀 STEP 3: Contract Enforcement (Inject IDs if missing in body)
    if (config.method === 'post' || config.method === 'put') {
        if (config.data instanceof FormData) {
            if (!config.data.has('user_id')) config.data.append('user_id', userId);
            if (!config.data.has('game_id')) config.data.append('game_id', gameId);
        } else if (config.data && typeof config.data === 'object') {
            if (!config.data.user_id) config.data.user_id = userId;
            if (!config.data.game_id) config.data.game_id = gameId;
        }
    }

    return config;
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

        // 🔥 STEP 4: Session Revocation (Token Expiry)
        if (error.response?.status === 401) {
            const { clearSession } = useSessionStore.getState();
            clearSession();
            window.location.href = '/login';
        }
        
        // Return a rejected promise with the structured error
        return Promise.reject(errorData);
    }
);

export default apiClient;
