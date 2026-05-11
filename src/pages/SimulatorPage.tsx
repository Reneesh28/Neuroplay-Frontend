import { useNavigate } from "react-router-dom";
import { InputPanel } from "../components/simulator/InputPanel";
import { useSimulation } from "../hooks/useSimulation";
import ErrorState from "../components/shared/ErrorState";

const SimulatorPage = () => {
    const { mutate, isPending, error, reset } = useSimulation();
    const navigate = useNavigate();

    const handleSubmit = (payload: { scenario: string; domain: string; mode: string }) => {
        mutate(payload, {
            onSuccess: (data: any) => {
                if (data.jobId) {
                    navigate(`/job/${data.jobId}`);
                }
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 py-6">
            {/* ── Page Header ── */}
            <div className="text-center">
                <h2 style={{ color: "var(--text-heading)" }}>Scenario Simulator</h2>
                <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                    Configure the digital twin and execute a neural simulation of a specific tactical scenario.
                </p>
            </div>

            {/* ── Input Card ── */}
            <InputPanel onSubmit={handleSubmit} isPending={isPending} />

            {/* ── Error ── */}
            {error && (
                <div className="animate-fade-in">
                    <ErrorState
                        message={error.message || "Simulation failed to start. Please try again."}
                        onRetry={() => reset()}
                    />
                </div>
            )}
        </div>
    );
};

export default SimulatorPage;