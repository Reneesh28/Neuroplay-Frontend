import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../../constants/api.constants";
import type { ApiResponse } from "../../types/api.types";

export interface InitUploadResponse {
    uploadId: string;
}

export const initUpload = async (
    fileName: string,
    totalChunks: number,
    userId: string = "demo-user",
    gameId: string = "bo6"
): Promise<InitUploadResponse> => {
    const res = await apiClient.post<ApiResponse<InitUploadResponse>>(
        API_ENDPOINTS.UPLOAD_INIT,
        {
            user_id: userId,
            game_id: gameId,
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
    chunk: Blob,
    userId: string = "demo-user",
    gameId: string = "bo6"
) => {
    const formData = new FormData();

    // 🔥 Backend uploadChunk controller expects these at top level of validatedBody
    // Note: baseRequestSchema might strip these, but we follow controller contract.
    formData.append("user_id", userId);
    formData.append("game_id", gameId);
    formData.append("uploadId", uploadId);
    formData.append("chunkIndex", String(chunkIndex));
    formData.append("chunk", chunk); // Backend expects 'chunk' field name for file

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
    uploadId: string,
    userId: string = "demo-user",
    gameId: string = "bo6"
): Promise<CompleteUploadResponse> => {
    const res = await apiClient.post<ApiResponse<CompleteUploadResponse>>(
        API_ENDPOINTS.UPLOAD_COMPLETE,
        {
            user_id: userId,
            game_id: gameId,
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