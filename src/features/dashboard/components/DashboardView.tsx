import { ResultPanel } from "../../../components/results/ResultPanel";
import { ContextPanel } from "../../../components/results/ContextPanel";

const DashboardView = ({ data }: { data: any }) => {
    if (!data) return null;

    // Normalize data for ResultPanel
    const resultPayload = {
        predicted_action: data.predicted_action,
        confidence: data.confidence,
        reasoning: data.reasoning,
        coaching_tip: data.coaching_tip,
        execution_mode: data.execution_mode || 'FULL'
    };

    // Extract context, potentially from data.context or construct it if backend spreads it
    const contextData = data.context || {
        profile: data.profile || { rank: "PLATINUM-IV", playstyle: "LURK_ENTRY", aggression_score: 72, stability_score: 88 },
        memories: data.memories || [
            { text: "Player historically pushes A-Main without utility support.", distance: 0.18 }
        ]
    };

    return (
        <div className="space-y-10 animate-fade-up">
            {/* ── Operational Header ── */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <div className="w-2 h-8 bg-accent rounded-full" />
                        <h1 className="text-3xl font-black tracking-tighter uppercase" style={{ color: "var(--text-heading)" }}>
                            Intelligence Report
                        </h1>
                    </div>
                    <p className="text-sm font-medium opacity-40 uppercase tracking-[0.2em] ml-5">
                        Inference Node: {data.id?.slice(0, 12) || 'NP-ALPHA-01'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Classification</p>
                        <p className="text-xs font-mono font-bold text-emerald-400">UNRESTRICTED_ACCESS</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                        📊
                    </div>
                </div>
            </div>

            {/* ── Primary Analysis Results ── */}
            <ResultPanel result={resultPayload} />

            {/* ── Behavioral Context & History ── */}
            <ContextPanel context={contextData} />
            
            {/* ── Footer Metadata ── */}
            <div className="pt-12 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-20 text-[10px] font-mono uppercase tracking-widest">
                <span>© 2026 NeuroPlay Engine — Phase 8.9 Deployment</span>
                <div className="flex gap-6">
                    <span>Latency: 44ms</span>
                    <span>Tokens: 1,402</span>
                    <span>Sig: 0x88AB</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;