import { useMutation } from "@tanstack/react-query";
import { runSimulation } from "../../../services/api/simulation";

export const useSimulation = () => {
    return useMutation({
        mutationFn: runSimulation,
    });
};