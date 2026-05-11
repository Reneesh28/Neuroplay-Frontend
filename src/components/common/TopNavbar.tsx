import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Upload", icon: '🎬' },
    { to: "/simulator", label: "Simulator", icon: '🧠' },
];

export const TopNavbar: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            style={{
                background: "rgba(13, 17, 23, 0.8)",
                borderBottom: "1px solid var(--border)",
            }}
            className="sticky top-0 z-50 backdrop-blur-md"
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
                <nav className="hidden md:flex items-center gap-2">
                    {NAV_LINKS.map(({ to, label }) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                className="px-5 py-2.5 rounded-xl text-sm font-bold no-underline transition-all duration-200 hover:bg-white/5 uppercase tracking-tight"
                                style={{
                                    color: isActive ? "var(--text-heading)" : "var(--text-secondary)",
                                    background: isActive ? "var(--bg-muted)" : "transparent",
                                    border: isActive ? "1px solid var(--border)" : "1px solid transparent"
                                }}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-18 left-0 right-0 p-4 animate-fade-in" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                    <nav className="flex flex-col gap-2">
                        {NAV_LINKS.map(({ to, label, icon }) => {
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
                    </nav>
                </div>
            )}
        </header>
    );
};
