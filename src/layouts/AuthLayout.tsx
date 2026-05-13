import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#050505]">
            {/* ── Background Aesthetics ── */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div 
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" 
                    style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
                />
                <div 
                    className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" 
                    style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
                />
            </div>

            {/* ── Content Container ── */}
            <div className="w-full max-w-[420px] relative z-10 animate-fade-up">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-xl shadow-2xl">
                        <span className="text-3xl">🧠</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
                        NeuroPlay <span className="text-accent">Engine</span>
                    </h1>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mt-2">
                        Neural Interface Authorization
                    </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-2xl border border-white/5 p-8 rounded-[32px] shadow-2xl">
                    {children}
                </div>

                <div className="mt-12 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.2em]">
                    Institutional Grade Intelligence • v1.0.2
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
