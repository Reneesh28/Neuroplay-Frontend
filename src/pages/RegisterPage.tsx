import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api/auth";
import { useSessionStore } from "../features/auth/stores/sessionStore";
import AuthLayout from "../layouts/AuthLayout";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        domain: "blackops"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const setSession = useSessionStore(state => state.setSession);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await register(formData);

            // 🔥 Save to Store
            setSession(data.user.id, formData.domain, data.token, data.user.role);

            // 🔥 Redirect
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Operator ID</label>
                    <input
                        name="username"
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all"
                        placeholder="Ghost_6"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Terminal Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all"
                        placeholder="operator@neuroplay.ai"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Security Domain</label>
                    <select
                        name="domain"
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all appearance-none"
                        value={formData.domain}
                        onChange={handleChange}
                    >
                        <option value="blackops">Black Ops Domain</option>
                        <option value="warzone">Warzone Domain</option>
                        <option value="modern_warfare">Modern Warfare Domain</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Access Key</label>
                    <input
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent/50 outline-none transition-all"
                        placeholder="Min 8 characters"
                        value={formData.password}
                        onChange={handleChange}
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
                    {loading ? "Initializing Identity..." : "Create Operator Profile"}
                </button>

                <div className="text-center pt-2">
                    <p className="text-[10px] opacity-30 uppercase tracking-widest">
                        Existing Operator? <Link to="/login" className="text-accent font-black hover:underline ml-1">Authenticate</Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
