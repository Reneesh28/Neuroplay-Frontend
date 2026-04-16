const EmptyState = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{
                    background: "var(--bg-muted)",
                    border: "1px solid var(--border)",
                }}
            >
                ○
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {message}
            </p>
        </div>
    );
};

export default EmptyState;