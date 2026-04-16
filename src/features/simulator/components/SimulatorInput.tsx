import { useState } from "react";

const SimulatorInput = ({
    onSubmit,
    isPending = false,
}: {
    onSubmit: (scenario: string) => void;
    isPending?: boolean;
}) => {
    const [scenario, setScenario] = useState("");
    const canSubmit = scenario.trim().length > 0 && !isPending;

    return (
        <div
            className="card p-5 space-y-4"
        >
            <div>
                <label
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-muted)" }}
                >
                    Scenario Description
                </label>
                <textarea
                    className="w-full p-3.5 rounded-xl text-sm leading-relaxed resize-none transition-all duration-150 outline-none"
                    rows={5}
                    placeholder="Describe the gameplay scenario in detail…&#10;&#10;e.g. &quot;Player is in a 1v1 situation near the enemy base with low health…&quot;"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    disabled={isPending}
                    style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-muted)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-sans)",
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow = "0 0 0 3px var(--accent-dim)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-muted)";
                        e.target.style.boxShadow = "none";
                    }}
                />
                <p
                    className="text-xs mt-1.5 text-right"
                    style={{ color: "var(--text-muted)" }}
                >
                    {scenario.length} chars
                </p>
            </div>

            <button
                onClick={() => onSubmit(scenario)}
                disabled={!canSubmit}
                className="btn btn-primary w-full"
                style={{ padding: "11px 24px", fontSize: "14px" }}
            >
                {isPending ? (
                    <>
                        <span
                            className="w-4 h-4 rounded-full inline-block"
                            style={{
                                border: "2px solid rgba(255,255,255,0.3)",
                                borderTopColor: "#fff",
                                animation: "spin 0.7s linear infinite",
                            }}
                        />
                        Running simulation…
                    </>
                ) : (
                    <>▶ Run Simulation</>
                )}
            </button>
        </div>
    );
};

export default SimulatorInput;