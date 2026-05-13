import React, { useState, useEffect } from 'react';
import { useUniverseStore } from '../store/universe.store';

const RenderDiagnostics: React.FC = () => {
  const [fps, setFps] = useState(0);
  const { data } = useUniverseStore();

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameId: number;

    const update = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute top-4 right-4 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg font-mono text-[10px] text-gray-400 pointer-events-none">
      <div className="flex justify-between gap-8 mb-1">
        <span>FPS</span>
        <span className={fps > 55 ? 'text-green-400' : 'text-yellow-400'}>{fps}</span>
      </div>
      <div className="flex justify-between gap-8 mb-1">
        <span>NODES</span>
        <span className="text-white">{data?.metadata.total_nodes || 0}</span>
      </div>
      <div className="flex justify-between gap-8 mb-1">
        <span>RENDER</span>
        <span className="text-cyan-400">GPU_ACCEL</span>
      </div>
      <div className="flex justify-between gap-8">
        <span>MEMORY</span>
        <span className="text-white">STABLE</span>
      </div>
    </div>
  );
};

export default RenderDiagnostics;
