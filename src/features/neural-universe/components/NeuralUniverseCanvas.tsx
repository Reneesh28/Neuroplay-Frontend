import React, { useRef, useCallback, useMemo } from 'react';
import ForceGraph3D, { type ForceGraphMethods } from 'react-force-graph-3d';
import * as THREE from 'three';
import { useUniverseStore } from '../store/universe.store';
import { useUniverseData } from '../hooks/useUniverseData';
import type { NeuralNode, NeuralLink } from '../types/universe.types';

const NeuralUniverseCanvas: React.FC = () => {
  const fgRef = useRef<ForceGraphMethods>(null);
  const { data, loading, error } = useUniverseData();
  const { setSelectedNode, activeNodeIds, atmosphere } = useUniverseStore();

  const handleNodeClick = useCallback((node: any) => {
    // Focus camera on node
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new pos
        node, // lookAt pos
        3000  // ms transition duration
      );
    }
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const nodeColor = useCallback((node: any) => {
    const neuralNode = node as NeuralNode;
    if (neuralNode.domain === 'blackops') {
      return '#00ffff'; // Cyan
    }
    return '#ff4500'; // Orange-Red for MW
  }, []);

  const linkColor = useCallback((link: any) => {
    const l = link as NeuralLink;
    return '#ffffff22';
  }, []);

  const enrichedData = useMemo(() => {
    if (!data) return null;
    return {
      nodes: [
        ...data.nodes,
        { id: 'bo_twin_core', domain: 'blackops', cluster_id: -1, x: 0, y: 0, z: 0, isCore: true },
        { id: 'mw_twin_core', domain: 'modern_warfare', cluster_id: -1, x: 200, y: 0, z: 0, isCore: true }
      ],
      links: data.links
    };
  }, [data]);

  if (loading) return <div className="flex items-center justify-center h-full text-cyan-400">Loading Neural Universe...</div>;
  if (error) return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  if (!enrichedData) return null;

  return (
    <div className="w-full h-full bg-black relative">
      <ForceGraph3D
        ref={fgRef}
        graphData={enrichedData}
        nodeLabel="id"
        nodeColor={nodeColor}
        linkColor={linkColor}
        nodeRelSize={4}
        linkWidth={0.5}
        linkDirectionalParticles={(link: any) =>
          activeNodeIds.includes(link.source.id) || activeNodeIds.includes(link.target.id) ? 4 : 0
        }
        linkDirectionalParticleSpeed={0.015}
        linkDirectionalParticleWidth={2}
        backgroundColor="#000000"
        onNodeClick={handleNodeClick}
        enableNodeDrag={false}
        showNavInfo={false}
        nodeThreeObject={(node: any) => {
          const neuralNode = node as any;
          const color = neuralNode.domain === 'blackops' ? 0x00ffff : 0xff4500;

          if (neuralNode.isCore) {
            const group = new THREE.Group();
            const coreGeom = new THREE.IcosahedronGeometry(12, 2);
            const coreMat = new THREE.MeshStandardMaterial({
              color,
              wireframe: true,
              emissive: color,
              emissiveIntensity: 2
            });
            const coreMesh = new THREE.Mesh(coreGeom, coreMat);
            group.add(coreMesh);

            const glowGeom = new THREE.SphereGeometry(15, 32, 32);
            const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1 });
            group.add(new THREE.Mesh(glowGeom, glowMat));

            // Only cores get a point light
            const light = new THREE.PointLight(color, 20, 150);
            group.add(light);

            return group;
          }

          // Standard node - Simplified for performance
          const geometry = new THREE.SphereGeometry(1.5, 8, 8);
          const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6
          });
          const mesh = new THREE.Mesh(geometry, material);

          return mesh;
        }}
      />

      {/* HUD Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Neural Memory Universe</h1>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 uppercase">Black Ops Galaxy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse" />
            <span className="text-xs text-orange-600 uppercase">Modern Warfare Galaxy</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-500 uppercase tracking-tighter">
        Vector Intelligence Topology • V2.0.4
      </div>
    </div>
  );
};

export default NeuralUniverseCanvas;
