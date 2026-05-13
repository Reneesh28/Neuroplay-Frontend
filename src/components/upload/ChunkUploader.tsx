import { useState } from 'react';
import { UploadDropzone } from './UploadDropzone';
import { UploadProgress } from './UploadProgress';
import { FilePreview } from './FilePreview';
import { UploadErrorBanner } from './UploadErrorBanner';
import { useUpload } from '../../features/upload/hooks/useUpload';
import { useNavigate } from 'react-router-dom';
import { DomainSelector } from '../simulator/DomainSelector';
import { useSessionStore } from '../../features/auth/stores/sessionStore';

export const ChunkUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const { uploadFile, progress, uploading } = useUpload();
    const navigate = useNavigate();

    // Sync domain with global session store
    const { gameId, setSession, userId, token } = useSessionStore();

    const handleUpload = async () => {
        if (!file) return;
        setUploadError(null);
        try {
            const jobId = await uploadFile(file);
            // Small delay to let the user see 100% completion
            setTimeout(() => {
                navigate(`/job/${jobId}`);
            }, 800);
        } catch (err: any) {
            setUploadError(err.message || 'The neural bridge encountered a synchronization error during upload.');
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            {/* ── Domain Selector ── */}
            {!uploading && (
                <div className="card p-6 mb-6">
                    <DomainSelector
                        domain={gameId}
                        onDomainChange={(newDomain) => setSession(userId, newDomain, token)}
                        disabled={uploading || !!file}
                    />
                </div>
            )}

            {!file && !uploading && (
                <UploadDropzone onFileSelect={setFile} disabled={uploading} />
            )}

            {file && !uploading && (
                <div className="space-y-6 animate-fade-up">
                    <FilePreview
                        file={file}
                        onClear={() => setFile(null)}
                        disabled={uploading}
                    />

                    {uploadError && (
                        <UploadErrorBanner
                            error={uploadError}
                            onRetry={handleUpload}
                            onClear={() => setUploadError(null)}
                        />
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="btn btn-primary w-full py-4 text-base font-bold tracking-tight"
                    >
                        Initialize Neural Ingestion
                    </button>
                </div>
            )}

            {uploading && (
                <div className="space-y-8 animate-fade-in py-4">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold tracking-tight">Synchronizing Data</h3>
                        <p className="text-sm opacity-60">Slicing tactical feed into neural packets...</p>
                    </div>

                    <UploadProgress progress={progress} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Status</p>
                            <p className="text-sm font-bold text-emerald-400">Uploading</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Packets</p>
                            <p className="text-sm font-bold">{Math.round(progress)}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
