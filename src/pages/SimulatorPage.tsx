import SimulatorInput from "../features/simulator/components/SimulatorInput";
import SimulationResult from "../features/simulator/components/SimulationResult";
import { useSimulation } from "../features/simulator/hooks/useSimulation";

import ErrorState from "../components/shared/ErrorState";

const SimulatorPage = () => {
    const { mutate, data, isPending, error, reset } = useSimulation();

    const handleSubmit = (scenario: string) => {
        if (!scenario.trim()) return;
        mutate({ scenario });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* ── Page Header ── */}
            <div>
                <h2 style={{ color: "var(--text-heading)" }}>Scenario Simulator</h2>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Describe a gameplay scenario and get instant AI-powered analysis
                </p>
            </div>

            {/* ── Input Card ── */}
            <SimulatorInput onSubmit={handleSubmit} isPending={isPending} />

            {/* ── Error ── */}
            {error && (
                <ErrorState
                    message="Simulation failed. Please try again."
                    onRetry={() => reset()}
                />
            )}

            {/* ── Result ── */}
            {data && !isPending && <SimulationResult result={data} />}
        </div>
    );
};

export default SimulatorPage;