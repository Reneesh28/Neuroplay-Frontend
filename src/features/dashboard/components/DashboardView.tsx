import React from 'react';
import { ExecutionModeBadge } from '../../../components/results/ExecutionModeBadge';
import { PredictionCard } from '../../../components/results/PredictionCard';
import { ReasoningPanel } from '../../../components/results/ReasoningPanel';
import { CoachingPanel } from '../../../components/results/CoachingPanel';
import { StatsCard } from './StatsCard';

const DashboardView = ({ data }: { data: any }) => {
    if (!data) return null;

    // Handle reasoning array or string
    const reasoningText = Array.isArray(data.reasoning)
        ? data.reasoning.join(" ")
        : data.reasoning || "No detailed reasoning provided.";

    return (
        <div className="max-w-3xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header section */}
            <div className="border-b border-white/20 pb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Gameplay Analysis Report</h1>
                <p className="text-sm text-gray-400">Inference Node: {data.id?.slice(0, 12)} | {new Date(data.metadata?.created_at).toLocaleString()}</p>
            </div>

            {/* Main Insights Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Primary Intelligence</h2>
                    <ExecutionModeBadge mode={data.execution_mode || "FULL"} />
                </div>
                
                <PredictionCard 
                    action={data.predicted_action} 
                    mode={data.execution_mode || "FULL"} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatsCard 
                        label="Confidence Score" 
                        value={`${Math.round((data.confidence || 0) * 100)}%`}
                        trend={data.confidence > 0.8 ? "optimal" : data.confidence > 0.6 ? "stable" : "nominal"}
                    />
                    <StatsCard 
                        label="Trace Identity" 
                        value={data.metadata?.trace_id?.slice(0, 12) || "N/A"}
                        icon="🆔"
                    />
                </div>
            </section>

            {/* Detailed Description / Reasoning */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Detailed Gameplay Description</h2>
                <ReasoningPanel reasoning={reasoningText} />
            </section>

            {/* Coaching Tip */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Coaching & Strategy</h2>
                <CoachingPanel tip={data.coaching_tip || "No specific guidance generated."} />
            </section>

            {/* Player Context & Patterns */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Behavioral Patterns</h2>
                {data.patterns && data.patterns.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-3 text-gray-300">
                        {data.patterns.map((p: any) => (
                            <li key={p.id}>
                                <strong className="text-white">{p.type}</strong>: {p.description} <span className="text-gray-500 text-sm">(Frequency: {p.frequency})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">No historical patterns discovered.</p>
                )}
            </section>

            {/* Telemetry (Clean Table) */}
            {data.features && Object.keys(data.features).length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Extracted Telemetry</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Object.entries(data.features).map(([key, value]) => (
                            <div key={key} className="p-4 bg-white/5 rounded-md border border-white/10">
                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</div>
                                <div className="text-lg text-white font-medium">
                                    {typeof value === 'number' ? (value < 1 ? value.toFixed(2) : Math.round(value)) : String(value)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default DashboardView;