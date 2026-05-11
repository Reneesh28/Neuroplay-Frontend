import { useMutation } from '@tanstack/react-query';
import { runSimulation, type SimulationInput } from '../services/api/simulation';

export const useSimulation = () => {
    return useMutation({
        mutationFn: (payload: SimulationInput) => runSimulation(payload),
    });
};
