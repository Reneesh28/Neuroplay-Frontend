const JsonViewer = ({ data }: { data: unknown }) => {
    return (
        <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
        >
            <div
                className="px-4 py-2 flex items-center gap-2"
                style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}
            >
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    result.json
                </span>
            </div>
            <pre
                className="p-4 text-xs overflow-auto leading-relaxed"
                style={{
                    background: "var(--bg-surface)",
                    color: "#7dd3fc",
                    maxHeight: "300px",
                    fontFamily: "var(--font-mono)",
                }}
            >
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default JsonViewer;