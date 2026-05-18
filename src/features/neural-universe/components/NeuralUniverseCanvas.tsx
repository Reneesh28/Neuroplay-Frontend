import React, { useRef, useCallback, useMemo } from 'react';
import ForceGraph3D, { type ForceGraphMethods } from 'react-force-graph-3d';
import * as THREE from 'three';
import { useUniverseStore } from '../store/universe.store';
import { useUniverseData } from '../hooks/useUniverseData';


const NeuralUniverseCanvas: React.FC = () => {
  const fgRef = useRef<ForceGraphMethods>(null);
  const { data, loading, error } = useUniverseData();
  const { setSelectedNode, activeNodeIds, viewMode } = useUniverseStore();

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



  const linkColor = useCallback(() => {
    return '#ffffff22';
  }, []);

  const enrichedData = useMemo(() => {
    if (!data) return null;

    let nodes = [
      ...data.nodes.map(n => ({
        ...n,
        fx: n.x,
        fy: n.y,
        fz: n.z,
        isCluster: true
      })),
      { id: 'bo_twin_core', domain: 'blackops', cluster_id: -1, x: 0, y: 0, z: 0, fx: 0, fy: 0, fz: 0, isCore: true, count: 0 },
      { id: 'mw_twin_core', domain: 'modern_warfare', cluster_id: -1, x: 200, y: 0, z: 0, fx: 200, fy: 0, fz: 0, isCore: true, count: 0 }
    ] as any[];

    if (viewMode === 'blackops') {
      nodes = nodes.filter(n => n.domain === 'blackops');
    } else if (viewMode === 'modern_warfare') {
      nodes = nodes.filter(n => n.domain === 'modern_warfare');
    }

    // Connect Clusters to their Central Core
    let links = [...data.links];
    nodes.forEach(c => {
      if (!c.isCore) {
        const coreId = c.domain === 'blackops' ? 'bo_twin_core' : 'mw_twin_core';
        links.push({
          source: coreId,
          target: c.id,
          value: 1 // Baseline connection strength to core
        });
      }
    });

    // Filter links to ensure they only connect existing nodes based on viewMode
    const nodeIds = new Set(nodes.map(n => n.id));
    links = links.filter(l => {
      if (!l.source || !l.target) return false;
      const sId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const tId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return nodeIds.has(sId) && nodeIds.has(tId);
    });

    return {
      nodes,
      links
    };
  }, [data, viewMode]);

  if (loading) return <div className="flex items-center justify-center h-full text-cyan-400">Loading Neural Universe...</div>;
  if (error) return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  if (!enrichedData) return null;

  return (
    <div className="w-full h-full bg-black relative">
      <ForceGraph3D
        ref={fgRef}
        graphData={enrichedData}
        nodeLabel="id"
        nodeColor={(node: any) => {
          const n = node as any;
          if (n.isCore) return n.domain === 'blackops' ? '#00ffff' : '#ff4500';
          // Generate a vibrant color based on cluster_id
          const hue = (n.cluster_id * 36) % 360;
          return `hsl(${hue}, 100%, 60%)`;
        }}
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
        cooldownTicks={0}
        nodeThreeObject={(node: any) => {
          const neuralNode = node as any;

          if (neuralNode.isCore) {
            const coreColor = neuralNode.domain === 'blackops' ? 0x00ffff : 0xff4500;
            const group = new THREE.Group();
            const coreGeom = new THREE.IcosahedronGeometry(12, 2);
            const coreMat = new THREE.MeshStandardMaterial({
              color: coreColor,
              wireframe: true,
              emissive: coreColor,
              emissiveIntensity: 2
            });
            const coreMesh = new THREE.Mesh(coreGeom, coreMat);
            group.add(coreMesh);

            const glowGeom = new THREE.SphereGeometry(15, 32, 32);
            const glowMat = new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0.1 });
            group.add(new THREE.Mesh(glowGeom, glowMat));

            // Only cores get a point light
            const light = new THREE.PointLight(coreColor, 20, 150);
            group.add(light);

            return group;
          }

          // Generate HSL color for the cluster
          const hue = (neuralNode.cluster_id * 36) % 360;
          const clusterColor = new THREE.Color(`hsl(${hue}, 100%, 60%)`);

          // Scaled cluster node based on density
          const radius = neuralNode.count ? Math.max(3, Math.min(12, neuralNode.count / 5)) : 4;
          const geometry = new THREE.SphereGeometry(radius, 16, 16);
          const material = new THREE.MeshBasicMaterial({
            color: clusterColor,
            transparent: true,
            opacity: 0.8
          });
          const mesh = new THREE.Mesh(geometry, material);

          // Add a wireframe for a tactical look
          const wireframe = new THREE.WireframeGeometry(geometry);
          const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 }));
          mesh.add(line);

          return mesh;
        }}
      />

      <div className="absolute bottom-4 right-4 text-xs text-gray-500 uppercase tracking-tighter">
        Vector Intelligence Topology • V2.0.4
      </div>
    </div>
  );
};

export default NeuralUniverseCanvas;
