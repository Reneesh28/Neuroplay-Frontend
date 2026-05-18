import React from 'react';
import NeuralUniverseCanvas from '../components/NeuralUniverseCanvas';
import { useUniverseStore } from '../store/universe.store';
import TacticalTooltip from '../components/TacticalTooltip';
import RenderDiagnostics from '../components/RenderDiagnostics';
import { useRetrievalAnimation } from '../hooks/useRetrievalAnimation';
import { Crosshair, SlidersHorizontal, Radar } from 'lucide-react';

const NeuralUniversePage: React.FC = () => {
  const { data, viewMode, setViewMode } = useUniverseStore();

  // Hook for simulated/live retrieval animations
  useRetrievalAnimation("live-demo");

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col">
      <TacticalTooltip />
      <RenderDiagnostics />
      {/* Cinematic Header Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
        <div className="bg-[#0c0f16] border border-white/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-cyan-500 text-[10px] font-mono mb-1 tracking-[0.2em] uppercase">
            <Radar size={14} className="animate-pulse" />
            Tactical Intelligence Cluster
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">NEUROPLAY <span className="text-cyan-400">UNIVERSE</span></h2>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#0c0f16] border border-white/20 p-4 rounded-xl text-right flex flex-col justify-center">
            <div className="text-cyan-500 text-[9px] uppercase tracking-widest mb-1">Active Embeddings</div>
            <div className="text-white font-mono text-xl tabular-nums tracking-tighter">{data?.metadata.total_nodes.toLocaleString() || "0"}</div>
          </div>
          <div className="bg-[#0c0f16] border border-cyan-500 p-4 rounded-xl text-right flex flex-col justify-center">
            <div className="text-cyan-500 text-[9px] uppercase tracking-widest mb-1">Spatial Density</div>
            <div className="text-cyan-400 font-mono text-xl tabular-nums tracking-tighter">
              {data?.metadata.spatial_density !== undefined ? data.metadata.spatial_density.toFixed(3) : "0.000"}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full relative">
        <NeuralUniverseCanvas />
      </main>

      {/* Bottom Control Bar Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 p-2 bg-[#0c0f16] border border-white/20 rounded-none pointer-events-auto shadow-none">
        <div className="flex items-center justify-center px-4 border-r border-white/20 text-cyan-500">
          <SlidersHorizontal size={16} />
        </div>
        <button
          onClick={() => setViewMode('full')}
          className={`px-6 py-2 rounded-none border text-xs font-black uppercase tracking-widest transition-none cursor-pointer ${viewMode === 'full' ? 'bg-cyan-500 border-cyan-500 text-black hover:bg-cyan-400' : 'bg-black border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'}`}
        >
          All Domains
        </button>
        <button
          onClick={() => setViewMode('blackops')}
          className={`px-6 py-2 rounded-none border text-xs font-black uppercase tracking-widest transition-none cursor-pointer ${viewMode === 'blackops' ? 'bg-cyan-500 border-cyan-500 text-black hover:bg-cyan-400' : 'bg-black border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'}`}
        >
          Black Ops
        </button>
        <button
          onClick={() => setViewMode('modern_warfare')}
          className={`px-6 py-2 rounded-none border text-xs font-black uppercase tracking-widest transition-none cursor-pointer ${viewMode === 'modern_warfare' ? 'bg-cyan-500 border-cyan-500 text-black hover:bg-cyan-400' : 'bg-black border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'}`}
        >
          Modern Warfare
        </button>
        <div className="flex items-center justify-center px-4 pl-6 border-l border-white/20 text-cyan-500 hover:text-cyan-300 cursor-pointer transition-none">
          <Crosshair size={16} />
        </div>
      </div>
    </div>
  );
};

export default NeuralUniversePage;
