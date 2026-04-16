import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Upload" },
    { to: "/simulator", label: "Simulator" },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
            {/* ── HEADER ── */}
            <header
                style={{
                    background: "var(--bg-surface)",
                    borderBottom: "1px solid var(--border)",
                }}
                className="sticky top-0 z-50 backdrop-blur-sm"
            >
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <span
                            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "var(--accent)" }}
                        >
                            N
                        </span>
                        <span
                            className="font-semibold text-sm tracking-wide"
                            style={{ color: "var(--text-heading)", letterSpacing: "0.06em" }}
                        >
                            NEURO<span style={{ color: "var(--accent)" }}>PLAY</span>
                        </span>
                    </Link>

                    {/* Nav */}
                    <nav className="flex items-center gap-1">
                        {NAV_LINKS.map(({ to, label }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className="px-3 py-1.5 rounded-md text-sm font-medium no-underline transition-colors"
                                    style={{
                                        color: isActive ? "var(--accent-hover)" : "var(--text-secondary)",
                                        background: isActive ? "var(--accent-dim)" : "transparent",
                                    }}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* ── CONTENT ── */}
            <main className="flex-1 px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

            {/* ── FOOTER ── */}
            <footer
                className="py-4 text-center text-xs"
                style={{
                    color: "var(--text-muted)",
                    borderTop: "1px solid var(--border)",
                }}
            >
                NeuroPlay Engine · Phase 4
            </footer>
        </div>
    );
};

export default MainLayout;