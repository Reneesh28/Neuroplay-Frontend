export interface ApiError {
    code: string;
    message: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: ApiError | null;
    meta?: Record<string, any>;
}