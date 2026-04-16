const LoadingState = ({ message = "Loading..." }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            {/* Spinner */}
            <div className="relative w-12 h-12">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: "2px solid var(--border-muted)",
                        borderTopColor: "var(--accent)",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <div
                    className="absolute inset-2 rounded-full"
                    style={{
                        border: "2px solid transparent",
                        borderTopColor: "rgba(59,130,246,0.3)",
                        animation: "spin 1.4s linear infinite reverse",
                    }}
                />
            </div>

            {/* Message */}
            <p
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
            >
                {message}
            </p>
        </div>
    );
};

export default LoadingState;