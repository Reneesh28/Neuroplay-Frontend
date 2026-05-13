import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api/auth";
import { useSessionStore } from "../features/auth/stores/sessionStore";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const setSession = useSessionStore(state => state.setSession);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login({ email, password });
            
            // 🔥 Save to Store
            setSession(data.user.id, "bo6", data.token, data.user.role);
            
            // 🔥 Redirect
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Terminal Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all"
                        placeholder="operator@neuroplay.ai"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Access Key</label>
                    <input 
                        type="password" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 font-bold uppercase tracking-tight text-center animate-shake">
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full btn btn-primary py-4 font-black uppercase text-xs tracking-widest shadow-xl shadow-accent/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Authorizing..." : "Initialize Session"}
                </button>

                <div className="text-center pt-4">
                    <p className="text-[10px] opacity-30 uppercase tracking-widest">
                        New Operator? <Link to="/register" className="text-accent font-black hover:underline ml-1">Request Access</Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
