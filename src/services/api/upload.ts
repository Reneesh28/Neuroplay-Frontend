import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface InitUploadResponse {
    uploadId: string;
}

export const initUpload = async (
    fileName: string,
    totalChunks: number
): Promise<InitUploadResponse> => {
    const res = await apiClient.post<ApiResponse<InitUploadResponse>>(
        API_ENDPOINTS.UPLOAD_INIT,
        {
            payload: {
                fileName,
                totalChunks,
            },
        }
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Init upload failed");
    }

    return res.data.data;
};

export const uploadChunk = async (
    uploadId: string,
    chunkIndex: number,
    chunk: Blob
) => {
    const formData = new FormData();
    
    // Identity fields are injected by the interceptor
    // Payload is wrapped for the middleware
    formData.append("payload", JSON.stringify({ uploadId, chunkIndex }));
    formData.append("chunk", chunk);

    const res = await apiClient.post(API_ENDPOINTS.UPLOAD_CHUNK, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export interface CompleteUploadResponse {
    jobId: string;
}

export const completeUpload = async (
    uploadId: string
): Promise<CompleteUploadResponse> => {
    const res = await apiClient.post<ApiResponse<CompleteUploadResponse>>(
        API_ENDPOINTS.UPLOAD_COMPLETE,
        {
            payload: {
                uploadId,
            },
        }
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Upload complete failed");
    }

    return res.data.data;
};