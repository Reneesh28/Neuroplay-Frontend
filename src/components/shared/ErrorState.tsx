const ErrorState = ({
    message = "Something went wrong",
    onRetry,
}: {
    message?: string;
    onRetry?: () => void;
}) => {
    return (
        <div
            className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-up"
        >
            {/* Icon */}
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                }}
            >
                ⚠
            </div>

            {/* Message */}
            <div className="text-center">
                <p
                    className="font-semibold text-base mb-1"
                    style={{ color: "#f87171" }}
                >
                    {message}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Please check your connection or try again.
                </p>
            </div>

            {/* Retry */}
            {onRetry && (
                <button className="btn btn-danger" onClick={onRetry}>
                    ↺&nbsp; Retry
                </button>
            )}
        </div>
    );
};

export default ErrorState;