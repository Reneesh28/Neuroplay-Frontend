import { create } from 'zustand';
import type { UniverseState, UniverseData } from '../types/universe.types';

interface UniverseStore extends UniverseState {
  setData: (data: UniverseData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setActiveNodes: (ids: string[]) => void;
  setViewMode: (mode: UniverseState['viewMode']) => void;
  setAtmosphere: (atmosphere: UniverseState['atmosphere']) => void;
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  selectedNodeId: null,
  activeNodeIds: [],
  viewMode: 'full',
  atmosphere: 'vibrant',

  setData: (data) => set({ data, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setActiveNodes: (ids) => set({ activeNodeIds: ids }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setAtmosphere: (atmosphere) => set({ atmosphere }),
}));
