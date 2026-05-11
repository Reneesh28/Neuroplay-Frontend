export const JOB_STATUS = {
    QUEUED: 'queued',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
} as const;

export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];

export const EXECUTION_MODES = {
    FULL: 'FULL',
    PARTIAL: 'PARTIAL',
    FALLBACK: 'FALLBACK',
} as const;

export type ExecutionMode = typeof EXECUTION_MODES[keyof typeof EXECUTION_MODES];

export const POLLING_INTERVALS = {
    DEFAULT: 3000,
    FAST: 1500,
    SLOW: 5000,
    MAX_ATTEMPTS: 200,
} as const;
