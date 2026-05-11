interface UploadProgressProps {
    progress: number;
    statusLabel?: string;
}

export const UploadProgress = ({ progress, statusLabel = 'Uploading chunks…' }: UploadProgressProps) => {
    return (
        <div className="space-y-2 w-full animate-fade-in">
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{statusLabel}</span>
                <span className="font-mono">{progress}%</span>
            </div>
            <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
            >
                <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
                    }}
                />
            </div>
        </div>
    );
};
