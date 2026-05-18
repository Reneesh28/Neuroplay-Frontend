import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSessionStore } from "../../features/auth/stores/sessionStore";
import { Activity, BarChart3, BrainCircuit, Globe, Settings, Terminal, LogOut, Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { to: "/", label: "Ingestion", icon: <Terminal size={18} /> },
    { to: "/insights", label: "Insights", icon: <BarChart3 size={18} /> },
    { to: "/simulator", label: "Simulator", icon: <BrainCircuit size={18} /> },
    { to: "/neural-universe", label: "Universe", icon: <Globe size={18} /> },
    { to: "/system", label: "System", icon: <Settings size={18} />, adminOnly: true },
    { to: "/admin/dlq", label: "Admin", icon: <Activity size={18} />, adminOnly: true },
];

export const TopNavbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { userId, clearSession, token, role } = useSessionStore();

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    const visibleLinks = NAV_LINKS.filter(link => !link.adminOnly || role === 'admin');

    return (
        <header
            style={{
                background: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-muted)",
            }}
            className="sticky top-0 z-50"
        >
            <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between transition-all duration-300">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 no-underline group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all duration-300 group-hover:scale-105"
                        style={{
                            background: "var(--accent)",
                            boxShadow: "0 0 15px var(--accent-glow)"
                        }}
                    >
                        N
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="font-black text-lg tracking-tight uppercase leading-none"
                            style={{ color: "var(--text-heading)" }}
                        >
                            Neuro<span style={{ color: "var(--accent)" }}>Play</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 leading-none mt-1">
                            Engine v1.0
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {visibleLinks.map(({ to, label, icon }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold no-underline transition-all duration-200 hover:bg-white/5 uppercase tracking-widest"
                                    style={{
                                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                                        background: isActive ? "var(--accent-dim)" : "transparent",
                                        border: isActive ? "1px solid var(--border-glow)" : "1px solid transparent",
                                        boxShadow: isActive ? "inset 0 0 10px var(--accent-dim)" : "none"
                                    }}
                                >
                                    <span style={{ color: isActive ? "var(--accent)" : "inherit", opacity: isActive ? 1 : 0.6 }}>{icon}</span>
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 🔥 User Profile / Auth Section */}
                    <div className="h-6 w-[1px] bg-white/10 mx-2" />

                    {token ? (
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Active Operator</span>
                                <span className="text-xs font-mono opacity-60">{userId}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-red-500/50 hover:text-red-400 transition-all group"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary px-6 py-2 text-[10px]">Login</Link>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-18 left-0 right-0 p-4 animate-fade-in" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                    <nav className="flex flex-col gap-2">
                        {visibleLinks.map(({ to, label, icon }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold no-underline transition-all duration-200"
                                    style={{
                                        color: isActive ? "var(--text-heading)" : "var(--text-secondary)",
                                        background: isActive ? "var(--accent-dim)" : "transparent",
                                        border: isActive ? "1px solid var(--accent)" : "1px solid transparent"
                                    }}
                                >
                                    <span>{icon}</span>
                                    {label}
                                </Link>
                            );
                        })}

                        {token && (
                            <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold text-red-400 bg-red-500/5 border border-red-500/10"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};
