import React from 'react';

interface FilePreviewProps {
    file: File;
    onClear: () => void;
    disabled?: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClear, disabled }) => {
    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    
    return (
        <div 
            className="rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-300 animate-fade-in"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
            }}
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        color: 'var(--accent)'
                    }}
                >
                    🎬
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-heading)' }}>
                        {file.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {file.type} • {fileSize} MB
                    </p>
                </div>
            </div>

            <button
                onClick={onClear}
                disabled={disabled}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-500/10 text-red-500/60 hover:text-red-500"
                title="Remove file"
            >
                ✕
            </button>
        </div>
    );
};
