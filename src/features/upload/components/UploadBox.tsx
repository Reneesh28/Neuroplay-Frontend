import { useState, useCallback, useRef } from "react";
import { useUpload } from "../hooks/useUpload";
import { useNavigate } from "react-router-dom";

const ACCEPTED_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
const MAX_SIZE_MB = 500;

const UploadBox = () => {
    const [file, setFile] = useState<File | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { uploadFile, progress, uploading } = useUpload();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = (f: File): string | null => {
        if (!ACCEPTED_TYPES.includes(f.type)) {
            return "Only video files (MP4, WebM, MOV, AVI) are supported.";
        }
        if (f.size > MAX_SIZE_MB * 1024 * 1024) {
            return `File size must be under ${MAX_SIZE_MB}MB.`;
        }
        return null;
    };

    const handleFileSelect = (f: File | null) => {
        if (!f) return;
        const err = validateFile(f);
        if (err) {
            setValidationError(err);
            setFile(null);
        } else {
            setValidationError(null);
            setFile(f);
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        handleFileSelect(dropped || null);
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        try {
            const jobId = await uploadFile(file);
            navigate(`/job/${jobId}`);
        } catch {
            setValidationError("Upload failed. Please try again.");
        }
    };

    const fileSizeMB = file ? (file.size / 1024 / 1024).toFixed(1) : null;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* ── Page Header ── */}
            <div className="text-center py-4">
                <h2 style={{ color: "var(--text-heading)" }}>Upload Gameplay Video</h2>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                    Upload a video file to begin AI-powered analysis
                </p>
            </div>

            {/* ── Drop Zone ── */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="rounded-2xl flex flex-col items-center justify-center gap-4 py-14 px-6 cursor-pointer transition-all duration-200"
                style={{
                    border: `2px dashed ${isDragging
                        ? "var(--accent)"
                        : file
                        ? "rgba(16,185,129,0.5)"
                        : "var(--border-muted)"}`,
                    background: isDragging
                        ? "var(--accent-dim)"
                        : file
                        ? "rgba(16,185,129,0.04)"
                        : "var(--bg-card)",
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />

                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{
                        background: file ? "rgba(16,185,129,0.12)" : "var(--bg-muted)",
                        border: `1px solid ${file ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
                    }}
                >
                    {file ? "✓" : "⬆"}
                </div>

                {file ? (
                    <div className="text-center">
                        <p className="font-semibold text-sm" style={{ color: "#34d399" }}>
                            {file.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {fileSizeMB} MB · {file.type.split("/")[1].toUpperCase()}
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
                            {isDragging ? "Drop it here!" : "Drag & drop or click to select"}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            MP4, WebM, MOV, AVI · Max {MAX_SIZE_MB}MB
                        </p>
                    </div>
                )}
            </div>

            {/* ── Validation Error ── */}
            {validationError && (
                <div
                    className="rounded-lg px-4 py-3 flex items-center gap-3 text-sm"
                    style={{
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#f87171",
                    }}
                >
                    <span>⚠</span>
                    <span>{validationError}</span>
                </div>
            )}

            {/* ── Progress Bar ── */}
            {uploading && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                        <span>Uploading chunks…</span>
                        <span className="font-mono">{progress}%</span>
                    </div>
                    <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ background: "var(--border)" }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, var(--accent), var(--accent-hover))",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ── Upload Button ── */}
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="btn btn-primary w-full"
                style={{ padding: "12px 24px", fontSize: "15px" }}
            >
                {uploading ? (
                    <>
                        <span
                            className="w-4 h-4 rounded-full inline-block"
                            style={{
                                border: "2px solid rgba(255,255,255,0.3)",
                                borderTopColor: "#fff",
                                animation: "spin 0.7s linear infinite",
                            }}
                        />
                        Uploading… {progress}%
                    </>
                ) : (
                    <>⬆&nbsp; Start Upload</>
                )}
            </button>
        </div>
    );
};

export default UploadBox;