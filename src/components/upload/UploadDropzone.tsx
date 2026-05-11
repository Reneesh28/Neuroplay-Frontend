import { useCallback, useRef, useState } from 'react';

interface UploadDropzoneProps {
    onFileSelect: (file: File) => void;
    disabled?: boolean;
    acceptedTypes?: string[];
    maxSizeMB?: number;
}

export const UploadDropzone = ({
    onFileSelect,
    disabled = false,
    acceptedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'],
    maxSizeMB = 10240, // Optimized for 4K/10GB uploads
}: UploadDropzoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (!acceptedTypes.includes(file.type)) {
            return `Unsupported file format. Please provide high-fidelity tactical footage.`;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            return `File size exceeds the ${(maxSizeMB/1024).toFixed(0)}GB neural ingestion limit.`;
        }
        return null;
    };

    const handleSelect = (file: File | null) => {
        if (!file) return;
        const err = validateFile(file);
        if (err) {
            setError(err);
        } else {
            setError(null);
            onFileSelect(file);
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (!disabled) {
            handleSelect(e.dataTransfer.files?.[0] || null);
        }
    }, [disabled]);

    return (
        <div className="space-y-4 w-full">
            <div
                onClick={() => !disabled && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group rounded-2xl flex flex-col items-center justify-center gap-6 py-16 px-8 transition-all duration-300 relative overflow-hidden ${
                    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
                style={{
                    border: `2px dashed ${
                        isDragging ? 'var(--accent)' : 'var(--border-muted)'
                    }`,
                    background: isDragging ? 'var(--accent-dim)' : 'var(--bg-surface)',
                    boxShadow: isDragging ? '0 0 40px var(--accent-dim)' : 'none'
                }}
            >
                {/* Background Glow */}
                <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                    style={{ background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)' }}
                />

                <input
                    ref={inputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleSelect(e.target.files?.[0] || null)}
                    disabled={disabled}
                />

                <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
                        isDragging ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                    style={{
                        background: isDragging ? 'var(--accent)' : 'var(--bg-muted)',
                        border: '1px solid var(--border)',
                        boxShadow: isDragging ? '0 0 20px var(--accent-glow)' : 'none',
                        color: isDragging ? '#fff' : 'var(--accent)'
                    }}
                >
                    <span className={isDragging ? 'animate-bounce' : ''}>
                        {isDragging ? '📥' : '🎬'}
                    </span>
                </div>

                <div className="text-center relative z-10">
                    <h4 className="font-black text-lg mb-1 uppercase tracking-tight" style={{ color: 'var(--text-heading)' }}>
                        {isDragging ? 'Release to Scan' : 'Import High-Fidelity Feed'}
                    </h4>
                    <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {isDragging 
                            ? 'The digital twin is ready to ingest this data.' 
                            : 'Drag and drop your 4K gameplay footage here. Optimized for high-bitrate tactical analysis.'}
                    </p>
                    
                    <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">4K ULTRA</span>
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">MP4/MOV</span>
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">LIMIT: {(maxSizeMB/1024).toFixed(0)}GB</span>
                    </div>
                </div>
            </div>

            {error && (
                <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3 text-sm animate-fade-in"
                    style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        color: '#f87171',
                    }}
                >
                    <span className="text-lg">⚠️</span>
                    <span className="font-medium">{error}</span>
                </div>
            )}
        </div>
    );
};
