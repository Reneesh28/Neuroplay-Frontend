// React is not needed for JSX in modern React

const ErrorState = ({
    message = "A synchronization error has occurred",
    onRetry,
}: {
    message?: string;
    onRetry?: () => void;
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-8 animate-fade-up">
            <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl relative"
                style={{
                    background: "rgba(239, 68, 68, 0.05)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    boxShadow: '0 0 30px rgba(239, 68, 68, 0.1)'
                }}
            >
                <span>☢️</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-4 border-black" />
            </div>

            <div className="text-center space-y-2 max-w-sm">
                <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: "#f87171" }}>
                    Critical Alert
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {message}
                </p>
                <p className="text-[10px] font-mono opacity-30 uppercase tracking-widest pt-2">
                    Kernel Trace: ERROR_0xSYNC_FAIL_DELTA
                </p>
            </div>

            {onRetry && (
                <button 
                    className="btn btn-danger py-3 px-8 text-xs font-bold uppercase tracking-widest shadow-xl" 
                    onClick={onRetry}
                >
                    Re-Initialize Link
                </button>
            )}
        </div>
    );
};

export default ErrorState;