export type StepStatus =
    | "pending"
    | "processing"
    | "completed"
    | "failed";

export interface JobStep {
    name: string;
    status: StepStatus;
    retries?: number;
    error?: {
        code: string;
        message: string;
    };
}

export interface Job {
    id: string;
    status: "queued" | "processing" | "completed" | "failed";
    steps: JobStep[];
    created_at?: string;
    updated_at?: string;
}