export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    UPLOAD_INIT: '/upload/init',
    UPLOAD_CHUNK: '/upload/chunk',
    UPLOAD_COMPLETE: '/upload/complete',
    SIMULATION_RUN: '/simulation/run',
    JOB_STATUS: (id: string) => `/job/${id}`,
    DASHBOARD: (id: string) => `/dashboard/${id}`,
    COACH_GENERATE: '/coach/generate',
    PROFILE: (id: string) => `/profile/${id}`,
};
