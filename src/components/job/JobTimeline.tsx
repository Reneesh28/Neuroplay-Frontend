import React from 'react';
import { StepIndicator } from './StepIndicator';

interface JobStep {
    name: string;
    status: string;
    error?: { message: string };
}

interface JobTimelineProps {
    steps: JobStep[];
}

export const JobTimeline: React.FC<JobTimelineProps> = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="card overflow-hidden animate-fade-in relative">
            {/* Trace Header */}
            <div
                className="px-6 py-4 flex justify-between items-center bg-black/20"
                style={{ borderBottom: '1px solid var(--border)' }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm">📟</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                        System Execution Trace
                    </p>
                </div>
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-accent opacity-30 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                </div>
            </div>

            {/* Timeline Wrapper */}
            <div className="relative p-6 space-y-8">
                {/* Vertical Connector Line */}
                <div 
                    className="absolute left-[2.45rem] top-8 bottom-8 w-px opacity-10" 
                    style={{ background: 'var(--accent)' }}
                />

                {steps.map((step, index) => {
                    const isProcessing = step.status === 'processing';
                    const isCompleted = step.status === 'completed';
                    const isFailed = step.status === 'failed';
                    
                    let statusColor = 'var(--text-muted)';
                    if (isCompleted) statusColor = 'var(--status-completed)';
                    if (isProcessing) statusColor = 'var(--accent)';
                    if (isFailed) statusColor = 'var(--status-failed)';

                    return (
                        <div
                            key={index}
                            className="flex items-start gap-6 relative transition-all duration-300"
                            style={{ opacity: step.status === 'pending' ? 0.4 : 1 }}
                        >
                            <StepIndicator status={step.status} />

                            <div className="flex-1 pt-1">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h4 
                                            className="text-sm font-bold tracking-tight uppercase"
                                            style={{ color: isProcessing ? 'var(--text-heading)' : 'var(--text-primary)' }}
                                        >
                                            {step.name.replace(/_/g, ' ')}
                                        </h4>
                                        <p className="text-[10px] font-mono opacity-30 uppercase tracking-widest">
                                            Worker: Node-AI-Simulation-{index + 1}
                                        </p>
                                    </div>
                                    
                                    <div className="text-right">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/20 border border-white/5"
                                            style={{ color: statusColor }}
                                        >
                                            {step.status}
                                        </span>
                                        {isProcessing && (
                                            <p className="text-[9px] mt-1 italic animate-pulse" style={{ color: statusColor }}>
                                                Ingesting tactical vectors...
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {step.error && (
                                    <div 
                                        className="mt-3 p-3 rounded-lg text-xs leading-relaxed"
                                        style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', color: '#f87171' }}
                                    >
                                        <span className="font-bold uppercase block mb-1 text-[9px]">Stack Trace / Error</span>
                                        {step.error.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Trace Footer */}
            <div className="px-6 py-3 bg-black/10 border-t border-white/5 flex justify-between items-center text-[9px] font-mono tracking-tighter opacity-30">
                <span>MEM_USE: 44.2MB</span>
                <span>CPU_WAIT: 12ms</span>
                <span>THREAD: 0x4F92</span>
            </div>
        </div>
    );
};
