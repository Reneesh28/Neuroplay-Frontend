// React is not needed for JSX in modern React

const LoadingState = ({ message = "Synchronizing Neural Link..." }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-8">
            {/* Multi-ring Spinner */}
            <div className="relative w-20 h-20">
                <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        border: "1px solid var(--accent-dim)",
                        borderTopColor: "var(--accent)",
                        animation: "spin 1s cubic-bezier(0.55, 0.17, 0.53, 0.91) infinite",
                    }}
                />
                <div
                    className="absolute inset-4 rounded-xl"
                    style={{
                        border: "1px solid transparent",
                        borderBottomColor: "var(--accent-hover)",
                        opacity: 0.5,
                        animation: "spin 1.5s ease-in-out infinite reverse",
                    }}
                />
                <div
                    className="absolute inset-0 flex items-center justify-center text-xs font-mono opacity-20 animate-pulse"
                    style={{ color: 'var(--accent)' }}
                >
                    INIT
                </div>
            </div>

            {/* Message Block */}
            <div className="text-center space-y-2">
                <p
                    className="text-sm font-bold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-heading)" }}
                >
                    {message}
                </p>
                <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-1 h-1 rounded-full bg-accent animate-bounce" 
                            style={{ animationDelay: `${i * 150}ms` }} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingState;