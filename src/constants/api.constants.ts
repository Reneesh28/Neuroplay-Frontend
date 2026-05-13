export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    UPLOAD_INIT: '/upload/init',
    UPLOAD_CHUNK: '/upload/chunk',
    UPLOAD_COMPLETE: '/upload/complete',
    SIMULATION_RUN: '/simulation/run',
    JOB_STATUS: '/job',
    DASHBOARD: '/dashboard',
    COACH_GENERATE: '/coach/generate',
    PROFILE: '/profile',
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    NEURAL_UNIVERSE_MAP: '/neural-universe/map',
};
