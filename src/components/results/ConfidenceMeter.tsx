import React from 'react';

interface ConfidenceMeterProps {
    confidence: number;
    mode: string;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence, mode }) => {
    let color = '#3b82f6';
    if (mode === 'PARTIAL') color = '#fbbf24';
    if (mode === 'FALLBACK') color = '#f87171';
    if (confidence > 0.8 && mode === 'FULL') color = '#34d399';

    const percentage = Math.round(confidence * 100);
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative flex items-center justify-center">
                <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="var(--border)"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold font-mono" style={{ color: 'var(--text-heading)' }}>
                        {percentage}%
                    </span>
                </div>
            </div>
            <span className="text-xs uppercase tracking-widest mt-3 font-semibold" style={{ color: 'var(--text-muted)' }}>
                Confidence
            </span>
        </div>
    );
};
