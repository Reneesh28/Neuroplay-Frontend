import React from 'react';
import { ResultHeader } from './ResultHeader';
import { PredictionCard } from './PredictionCard';
import { ConfidenceBar } from './ConfidenceBar';
import { ReasoningPanel } from './ReasoningPanel';
import { CoachingPanel } from './CoachingPanel';

// Assuming SimulationOutput interface matches this
interface ResultPanelProps {
    result: {
        predicted_action: string;
        confidence: number;
        reasoning: string;
        coaching_tip: string;
        execution_mode: 'FULL' | 'PARTIAL' | 'FALLBACK' | string;
    } | null;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result }) => {
    if (!result) return null;

    return (
        <div className="space-y-6 w-full animate-fade-in">
            <ResultHeader mode={result.execution_mode || 'FULL'} />
            
            <div className="space-y-4">
                <PredictionCard 
                    action={result.predicted_action || 'N/A'} 
                    mode={result.execution_mode || 'FULL'} 
                />
                
                <div className="grid grid-cols-1 gap-4">
                    <ConfidenceBar 
                        confidence={result.confidence || 0} 
                        mode={result.execution_mode || 'FULL'} 
                    />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ReasoningPanel reasoning={result.reasoning} />
                    <CoachingPanel tip={result.coaching_tip} />
                </div>
            </div>
        </div>
    );
};
