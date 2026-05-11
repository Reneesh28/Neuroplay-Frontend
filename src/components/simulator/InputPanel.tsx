import { useState } from 'react';
import { DomainSelector } from './DomainSelector';
import { ExecutionModeSelector } from './ExecutionModeSelector';
import { FeatureSummary } from './FeatureSummary';

interface InputPanelProps {
    onSubmit: (payload: { scenario: string; domain: string; mode: 'FULL' | 'PARTIAL' | 'FALLBACK' }) => void;
    isPending?: boolean;
}

export const InputPanel = ({ onSubmit, isPending }: InputPanelProps) => {
    const [scenario, setScenario] = useState('');
    const [domain, setDomain] = useState('blackops');
    const [mode, setMode] = useState<'FULL' | 'PARTIAL' | 'FALLBACK'>('FULL');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (scenario.trim() && domain) {
            onSubmit({ scenario, domain, mode });
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Config */}
                <div className="space-y-8">
                    <DomainSelector 
                        domain={domain} 
                        onDomainChange={setDomain} 
                        disabled={isPending} 
                    />
                    
                    <ExecutionModeSelector 
                        mode={mode} 
                        onModeChange={setMode} 
                        disabled={isPending} 
                    />
                </div>

                {/* Right Column: Scenario & Preview */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label
                            className="block text-xs font-semibold uppercase tracking-widest"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Tactical Scenario Description
                        </label>
                        <textarea
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value)}
                            placeholder="Describe the combat situation... (e.g., Retaking A-Site through heaven while utility is mid-flight)"
                            disabled={isPending}
                            className="w-full h-40 p-4 rounded-2xl transition-all duration-300 outline-none resize-none text-sm leading-relaxed"
                            style={{
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40 px-1">
                            <span>NLP Calibration: Active</span>
                            <span>{scenario.length} chars</span>
                        </div>
                    </div>

                    <FeatureSummary 
                        domain={domain} 
                        mode={mode} 
                        scenarioLength={scenario.length} 
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending || !scenario.trim()}
                className="btn btn-primary w-full py-5 text-lg font-bold tracking-tight shadow-lg"
            >
                {isPending ? (
                    <div className="flex items-center gap-3 justify-center">
                        <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Initializing Simulation Cluster...
                    </div>
                ) : (
                    "Launch Neural Simulation"
                )}
            </button>
        </form>
    );
};
