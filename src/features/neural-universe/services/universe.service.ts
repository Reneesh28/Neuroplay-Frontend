import apiClient from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../constants/api.constants";
import type { UniverseData } from "../types/universe.types";
import type { ApiResponse } from "../../../types/api.types";

export const fetchUniverseMap = async (): Promise<UniverseData> => {
  const res = await apiClient.get<ApiResponse<UniverseData>>(
    API_ENDPOINTS.NEURAL_UNIVERSE_MAP
  );

  if (!res.data.success) {
    throw new Error(res.data.error?.message || "Failed to fetch neural universe map");
  }

  // The backend might wrap the data in a 'universe' object
  const data = (res.data.data as any).universe || res.data.data;
  return data;
};
