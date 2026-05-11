import React from 'react';

interface UploadErrorBannerProps {
    error: string;
    onRetry?: () => void;
    onClear?: () => void;
}

export const UploadErrorBanner: React.FC<UploadErrorBannerProps> = ({ error, onRetry, onClear }) => {
    return (
        <div 
            className="rounded-xl p-4 flex flex-col gap-3 animate-fade-in"
            style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
        >
            <div className="flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                <div className="flex-1">
                    <p className="text-sm font-bold" style={{ color: '#f87171' }}>
                        Upload Failed
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {error}
                    </p>
                </div>
                {onClear && (
                    <button 
                        onClick={onClear}
                        className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        ✕
                    </button>
                )}
            </div>
            
            {onRetry && (
                <button 
                    onClick={onRetry}
                    className="btn btn-danger w-full py-2 text-xs font-bold"
                >
                    Retry Upload
                </button>
            )}
        </div>
    );
};
