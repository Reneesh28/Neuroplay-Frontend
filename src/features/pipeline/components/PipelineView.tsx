import PipelineStep from "./PipelineStep";
import { PIPELINE_STEPS } from "../pipeline.config";

type JobStep = {
    name: string;
    status: "pending" | "processing" | "completed" | "failed";
};

const PipelineView = ({ steps }: { steps: JobStep[] }) => {
    const getStepStatus = (key: string) => {
        const step = steps.find((s) => s.name === key);
        return step?.status || "pending";
    };

    return (
        <div
            className="card p-5"
            style={{ marginTop: "1.5rem" }}
        >
            {/* Section header */}
            <p
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--text-muted)" }}
            >
                Pipeline Progress
            </p>

            {/* Steps row */}
            <div className="flex items-start justify-between relative">
                {PIPELINE_STEPS.map((step, index) => {
                    const status = getStepStatus(step.key);
                    const isLast = index === PIPELINE_STEPS.length - 1;
                    const connectorStatus = getStepStatus(PIPELINE_STEPS[index + 1]?.key ?? "");
                    const connectorActive = !isLast &&
                        (status === "completed" || connectorStatus === "processing" || connectorStatus === "completed");

                    return (
                        <div key={step.key} className="flex items-start flex-1">
                            <div className="flex flex-col items-center flex-1">
                                <PipelineStep label={step.label} status={status} />
                            </div>

                            {/* Connector */}
                            {!isLast && (
                                <div
                                    className="flex-1 h-px mt-5 transition-all duration-500"
                                    style={{
                                        background: connectorActive
                                            ? "linear-gradient(90deg, rgba(16,185,129,0.6), rgba(59,130,246,0.3))"
                                            : "var(--border)",
                                        minWidth: "16px",
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PipelineView;