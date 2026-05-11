interface UploadStatusProps {
    file: File | null;
    onClear?: () => void;
    disabled?: boolean;
}

export const UploadStatus = ({ file, onClear, disabled }: UploadStatusProps) => {
    if (!file) return null;

    const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);

    return (
        <div 
            className="flex items-center justify-between p-4 rounded-xl w-full animate-fade-in"
            style={{
                background: 'rgba(16,185,129,0.04)',
                border: '1px solid rgba(16,185,129,0.3)',
            }}
        >
            <div className="flex items-center gap-4">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{
                        background: 'rgba(16,185,129,0.12)',
                        color: '#34d399',
                    }}
                >
                    ✓
                </div>
                <div>
                    <p className="font-semibold text-sm" style={{ color: '#34d399' }}>
                        {file.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {fileSizeMB} MB · {file.type.split('/')[1]?.toUpperCase() || 'VIDEO'}
                    </p>
                </div>
            </div>
            
            {onClear && (
                <button 
                    onClick={onClear}
                    disabled={disabled}
                    className="p-2 rounded-md hover:bg-red-500/10 text-red-400 disabled:opacity-50 transition-colors cursor-pointer border-none bg-transparent"
                    title="Remove file"
                >
                    ✕
                </button>
            )}
        </div>
    );
};
