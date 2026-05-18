export interface NeuralNode {
  id: string;
  domain: 'blackops' | 'modern_warfare';
  cluster_id: number;
  x: number;
  y: number;
  z: number;
  confidence: number;
  memory_strength: number;
  isCore?: boolean;
  telemetry?: any;
}

export interface NeuralLink {
  source: string;
  target: string;
  value: number;
}

export interface UniverseData {
  nodes: NeuralNode[];
  links: NeuralLink[];
  metadata: {
    blackops_count: number;
    mw_count: number;
    total_nodes: number;
    spatial_density?: number;
  };
}

export interface UniverseState {
  data: UniverseData | null;
  loading: boolean;
  error: string | null;
  selectedNodeId: string | null;
  activeNodeIds: string[];
  viewMode: 'full' | 'blackops' | 'modern_warfare';
  atmosphere: 'vibrant' | 'degraded' | 'emergency';
}
