import { SystemHealth } from "../components/system/SystemHealth";
import { SystemMetrics } from "../components/system/SystemMetrics";

const SystemPage = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 py-6 animate-fade-up">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tighter" style={{ color: "var(--text-heading)" }}>
                        Platform Monitoring
                    </h2>
                    <p className="text-xs font-medium opacity-40 uppercase tracking-[0.2em]">
                        NeuroPlay Engine · Operations Control
                    </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Node: NP-W1-ALPHA</span>
                </div>
            </div>

            {/* ── Key Metrics ── */}
            <SystemMetrics />

            {/* ── Service Matrix ── */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-30">Infrastructure Matrix</span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <SystemHealth />
            </div>

            {/* ── Raw Logs Link Mock ── */}
            <div className="flex justify-center pt-4">
                <button 
                    className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-opacity duration-300"
                    onClick={() => alert("Administrative access required for raw log stream.")}
                >
                    View Raw System Logs →
                </button>
            </div>
        </div>
    );
};

export default SystemPage;
