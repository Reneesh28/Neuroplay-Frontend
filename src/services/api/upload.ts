import api from "../axios";
import type { ApiResponse } from "../../types/api.types";

export interface InitUploadResponse {
    upload_id: string;
}

export const initUpload = async (
    fileName: string,
    totalChunks: number
): Promise<InitUploadResponse> => {
    const res = await api.post<ApiResponse<InitUploadResponse>>(
        "/upload/init",
        {
            file_name: fileName,
            total_chunks: totalChunks,
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

    formData.append("upload_id", uploadId);
    formData.append("chunk_index", String(chunkIndex));
    formData.append("file", chunk);

    const res = await api.post("/upload/chunk", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export interface CompleteUploadResponse {
    job_id: string;
}

export const completeUpload = async (
    uploadId: string
): Promise<CompleteUploadResponse> => {
    const res = await api.post<ApiResponse<CompleteUploadResponse>>(
        "/upload/complete",
        {
            upload_id: uploadId,
        }
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Upload complete failed");
    }

    return res.data.data;
};