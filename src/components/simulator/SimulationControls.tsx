interface SimulationControlsProps {
    onSubmit: () => void;
    isPending: boolean;
    disabled: boolean;
}

export const SimulationControls = ({ onSubmit, isPending, disabled }: SimulationControlsProps) => {
    return (
        <div className="pt-2 animate-fade-in">
            <button
                onClick={onSubmit}
                disabled={disabled || isPending}
                className="btn btn-primary w-full shadow-lg"
                style={{ padding: '14px 24px', fontSize: '15px' }}
            >
                {isPending ? (
                    <>
                        <span
                            className="w-4 h-4 rounded-full inline-block"
                            style={{
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: '#fff',
                                animation: 'spin 0.7s linear infinite',
                            }}
                        />
                        Starting Engine…
                    </>
                ) : (
                    <>▶ Run Neural Simulation</>
                )}
            </button>
            <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                Runs the scenario through the Phase 8 AI Engine
            </p>
        </div>
    );
};
