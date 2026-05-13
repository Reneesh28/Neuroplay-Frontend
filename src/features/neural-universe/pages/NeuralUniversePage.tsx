import React from 'react';
import NeuralUniverseCanvas from '../components/NeuralUniverseCanvas';
import { useUniverseStore } from '../store/universe.store';
import TacticalTooltip from '../components/TacticalTooltip';
import RenderDiagnostics from '../components/RenderDiagnostics';
import { useRetrievalAnimation } from '../hooks/useRetrievalAnimation';

const NeuralUniversePage: React.FC = () => {
  const { data } = useUniverseStore();

  // Hook for simulated/live retrieval animations
  useRetrievalAnimation("live-demo");

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col">
      <TacticalTooltip />
      <RenderDiagnostics />
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 w-full z-10 px-8 py-6 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start pointer-events-none">
        <div>
          <div className="text-cyan-500 text-xs font-mono mb-1 tracking-[0.2em] uppercase">Tactical Intelligence Cluster</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">NEUROPLAY <span className="text-cyan-400">UNIVERSE</span></h2>
        </div>

        <div className="flex gap-8">
          <div className="text-right">
            <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Active Embeddings</div>
            <div className="text-white font-mono text-xl tabular-nums">{data?.metadata.total_nodes.toLocaleString() || "0"}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Spatial Density</div>
            <div className="text-cyan-400 font-mono text-xl tabular-nums">0.942</div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full relative">
        <NeuralUniverseCanvas />
      </main>

      {/* Bottom Control Bar Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <button className="px-6 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase hover:bg-cyan-500/30 transition-all cursor-pointer">
          All Domains
        </button>
        <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase hover:bg-white/10 transition-all cursor-pointer">
          Black Ops
        </button>
        <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase hover:bg-white/10 transition-all cursor-pointer">
          Modern Warfare
        </button>
      </div>
    </div>
  );
};

export default NeuralUniversePage;
