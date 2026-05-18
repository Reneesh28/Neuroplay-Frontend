import { useCallback, useRef, useState } from 'react';
import { UploadCloud, FileVideo, AlertCircle } from 'lucide-react';

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
            return `File size exceeds the ${(maxSizeMB / 1024).toFixed(0)}GB neural ingestion limit.`;
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
        <div className="space-y-4 w-full relative">
            <style>{`
                @keyframes scan-vertical {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
            <div
                onClick={() => !disabled && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group rounded-none flex flex-col items-center justify-center gap-6 py-16 px-8 transition-none relative overflow-hidden ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                    }`}
                style={{
                    border: `1px solid ${isDragging ? 'var(--accent)' : 'var(--border-muted)'
                        }`,
                    background: isDragging ? '#00f0ff20' : '#06080c',
                }}
            >
                {/* Tactical Corner Reticles */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-500/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-500/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/50" />

                {/* Radar Scanning Line */}
                <div
                    className="absolute left-0 right-0 h-[1px] bg-cyan-400 opacity-0 group-hover:opacity-100 pointer-events-none z-0"
                    style={{ animation: 'scan-vertical 3s linear infinite' }}
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
                    className={`w-16 h-16 rounded-none flex items-center justify-center text-3xl transition-none relative z-10 ${isDragging ? 'scale-110 bg-cyan-500 text-black' : 'bg-black border border-white/20'
                        }`}
                    style={{ color: isDragging ? '#000' : 'var(--accent)' }}
                >
                    <span className={isDragging ? 'animate-bounce' : ''}>
                        {isDragging ? <UploadCloud size={28} /> : <FileVideo size={28} />}
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
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">LIMIT: {(maxSizeMB / 1024).toFixed(0)}GB</span>
                    </div>
                </div>
            </div>

            {error && (
                <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3 text-xs animate-fade-in font-mono uppercase tracking-widest"
                    style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#f87171',
                    }}
                >
                    <AlertCircle size={16} />
                    <span className="font-bold">{error}</span>
                </div>
            )}
        </div>
    );
};
