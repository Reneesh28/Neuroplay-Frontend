interface DomainSelectorProps {
    domain: string;
    onDomainChange: (domain: string) => void;
    disabled?: boolean;
}

const DOMAINS = [
    { id: 'bo6', label: 'Black Ops', desc: 'Arcade FPS Logic', icon: '🎯', color: '#f97316' },
    { id: 'mw3', label: 'Modern Warfare', desc: 'Tactical Realism Logic', icon: '🎖️', color: '#10b981' },
    { id: 'valorant', label: 'Valorant', desc: 'Ability Logic (Experimental)', icon: '✨', color: '#ff4655' },
];

export const DomainSelector = ({ domain, onDomainChange, disabled }: DomainSelectorProps) => {
    return (
        <div className="space-y-3 animate-fade-in">
            <label
                className="block text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
            >
                Target Combat Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DOMAINS.map((d) => {
                    const isSelected = domain === d.id;
                    return (
                        <button
                            key={d.id}
                            onClick={() => onDomainChange(d.id)}
                            disabled={disabled}
                            className="group flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 border cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 relative overflow-hidden"
                            style={{
                                background: isSelected ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                                borderColor: isSelected ? d.color : 'var(--border-muted)',
                                boxShadow: isSelected ? `0 8px 24px -8px ${d.color}40` : 'none',
                            }}
                        >
                            {/* Accent line */}
                            {isSelected && (
                                <div 
                                    className="absolute top-0 left-0 right-0 h-1"
                                    style={{ background: d.color }}
                                />
                            )}

                            <span className={`text-3xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                                {d.icon}
                            </span>
                            <div className="text-center">
                                <span
                                    className="block text-sm font-bold tracking-tight"
                                    style={{ color: isSelected ? 'var(--text-heading)' : 'var(--text-primary)' }}
                                >
                                    {d.label}
                                </span>
                                <span className="block text-[10px] opacity-40 uppercase tracking-tighter mt-0.5">
                                    {d.desc}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
