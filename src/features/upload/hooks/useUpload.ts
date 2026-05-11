import { useState } from "react";
import {
    initUpload,
    uploadChunk,
    completeUpload,
} from "../../../services/api/upload";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export const useUpload = () => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (file: File, gameId: string = "bo6"): Promise<string> => {
        setUploading(true);

        try {
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

            // 1. INIT
            const { uploadId } = await initUpload(file.name, totalChunks, "demo-user", gameId);

            // 2. CHUNK UPLOAD
            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = start + CHUNK_SIZE;
                const chunk = file.slice(start, end);

                let retryCount = 0;
                const maxRetries = 3;
                let success = false;

                while (retryCount < maxRetries && !success) {
                    try {
                        await uploadChunk(uploadId, i, chunk, "demo-user", gameId);
                        success = true;
                    } catch (err) {
                        retryCount++;
                        if (retryCount === maxRetries) throw err;
                        console.warn(`Chunk ${i} failed. Retry ${retryCount}/${maxRetries}...`);
                        await new Promise(r => setTimeout(r, 1000 * retryCount)); // Exponential backoff
                    }
                }

                setProgress(Math.round(((i + 1) / totalChunks) * 100));
            }

            // 3. COMPLETE
            const { jobId } = await completeUpload(uploadId, "demo-user", gameId);

            return jobId;
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return {
        uploadFile,
        progress,
        uploading,
    };
};