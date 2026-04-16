import api from "../axios";
import type { ApiResponse } from "../../types/api.types";

export interface SimulationInput {
    scenario: string;
}

export interface SimulationOutput {
    predicted_action: string;
    confidence: number;
    reasoning: string;
    coaching_tip: string;
}

export const runSimulation = async (
    input: SimulationInput
): Promise<SimulationOutput> => {
    const res = await api.post<ApiResponse<SimulationOutput>>(
        "/simulation/run",
        input
    );

    if (!res.data.success) {
        throw new Error(res.data.error?.message || "Simulation failed");
    }

    return res.data.data;
};