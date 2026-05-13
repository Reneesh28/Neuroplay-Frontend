import React from 'react';
import { useUniverseStore } from '../store/universe.store';

const TacticalTooltip: React.FC = () => {
  const { selectedNodeId, data } = useUniverseStore();

  if (!selectedNodeId || !data) return null;

  const node = data.nodes.find(n => n.id === selectedNodeId);
  if (!node) return null;

  return (
    <div className="absolute top-24 right-8 w-80 p-6 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 font-mono">Memory Node</div>
          <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{node.id}</h3>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${node.domain === 'blackops' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-orange-500/20 text-orange-400'}`}>
          {node.domain.replace('_', ' ')}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Confidence</span>
          <span className="text-sm text-white font-mono">{(node.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Memory Strength</span>
          <span className="text-sm text-white font-mono">{(node.memory_strength * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Cluster ID</span>
          <span className="text-sm text-white font-mono">#{node.cluster_id}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Coordinates</span>
          <span className="text-[10px] text-gray-400 font-mono">X:{node.x.toFixed(2)} Y:{node.y.toFixed(2)} Z:{node.z.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full py-3 rounded-xl bg-white text-black text-xs font-bold uppercase hover:bg-cyan-400 transition-colors cursor-pointer">
          Analyze Neural Context
        </button>
      </div>
    </div>
  );
};

export default TacticalTooltip;
