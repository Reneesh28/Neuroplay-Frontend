import { ExecutionModeBadge } from './ExecutionModeBadge';

interface ResultHeaderProps {
    mode: string;
    timestamp?: string;
}

export const ResultHeader: React.FC<ResultHeaderProps> = ({ mode, timestamp = new Date().toLocaleTimeString() }) => {
    return (
        <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
                <div 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ background: 'var(--status-completed)', boxShadow: '0 0 10px var(--status-completed)' }}
                />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-heading)' }}>
                    Inference Complete
                </h3>
            </div>
            
            <div className="flex items-center gap-4">
                <ExecutionModeBadge mode={mode} />
                <span className="text-[10px] font-mono tracking-wider opacity-40 uppercase">{timestamp}</span>
            </div>
        </div>
    );
};
