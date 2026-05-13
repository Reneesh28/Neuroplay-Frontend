import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalTwinCoreProps {
  position: [number, number, number];
  color: string;
  style: 'aggressive' | 'defensive' | 'tactical';
}

const DigitalTwinCore: React.FC<DigitalTwinCoreProps> = ({ position, color, style }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Core rotation
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z += 0.005;
    
    // Pulsing effect
    const pulse = Math.sin(time * 2) * 0.1 + 1;
    meshRef.current.scale.set(pulse, pulse, pulse);
    
    // Glow oscillation
    if (glowRef.current) {
        glowRef.current.scale.set(pulse * 1.5, pulse * 1.5, pulse * 1.5);
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(time * 4) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Central Core Geometry */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[4, 2]} />
        <meshStandardMaterial 
          color={color} 
          wireframe 
          emissive={color} 
          emissiveIntensity={2} 
        />
      </mesh>
      
      {/* Outer Atmospheric Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3} 
          side={THREE.BackSide} 
        />
      </mesh>
      
      {/* Core Light Source */}
      <pointLight intensity={5} distance={50} color={color} />
    </group>
  );
};

export default DigitalTwinCore;
