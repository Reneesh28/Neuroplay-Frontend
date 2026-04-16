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

    const uploadFile = async (file: File): Promise<string> => {
        setUploading(true);

        try {
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

            // 1. INIT
            const { upload_id } = await initUpload(file.name, totalChunks);

            // 2. CHUNK UPLOAD
            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = start + CHUNK_SIZE;

                const chunk = file.slice(start, end);

                await uploadChunk(upload_id, i, chunk);

                setProgress(Math.round(((i + 1) / totalChunks) * 100));
            }

            // 3. COMPLETE
            const { job_id } = await completeUpload(upload_id);

            return job_id;
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