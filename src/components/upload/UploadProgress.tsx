import { Activity } from 'lucide-react';

interface UploadProgressProps {
    progress: number;
    statusLabel?: string;
}

export const UploadProgress = ({ progress, statusLabel = 'UPLOADING CHUNKS...' }: UploadProgressProps) => {
    // Generate 20 blocks representing 5% chunks each
    const blocks = Array.from({ length: 20 });
    const filledBlocks = Math.floor(progress / 5);

    return (
        <div className="space-y-3 w-full animate-fade-in bg-[#0c0f16] p-4 rounded-xl border border-white/5 shadow-2xl">
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Activity size={12} className="animate-pulse" />
                    <span>{statusLabel}</span>
                </div>
                <span>{progress}%</span>
            </div>

            <div className="flex gap-[2px] w-full h-2">
                {blocks.map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-[1px] transition-all duration-200"
                        style={{
                            background: i < filledBlocks
                                ? 'var(--accent)'
                                : 'rgba(255, 255, 255, 0.08)',
                            boxShadow: i < filledBlocks ? '0 0 10px var(--accent-glow)' : 'none',
                            opacity: i === filledBlocks ? 0.6 : 1 // Active chunk blink effect
                        }}
                    />
                ))}
            </div>

            <div className="flex justify-between text-[8px] font-mono opacity-40 uppercase tracking-widest mt-1">
                <span>Network: Active</span>
                <span>MD5: {progress >= 100 ? 'VERIFIED' : 'COMPUTING...'}</span>
            </div>
        </div>
    );
};
