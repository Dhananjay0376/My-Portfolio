"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron, Octahedron, Float } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere
  const [positions] = useState(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron position={[-5, 3, -5]} scale={0.8}>
          <meshStandardMaterial color="#8a2be2" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Octahedron position={[6, -2, -4]} scale={1.2}>
          <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
        </Octahedron>
      </Float>
      <Float speed={2.5} rotationIntensity={3} floatIntensity={2}>
        <Icosahedron position={[-3, -4, -6]} scale={0.6}>
          <meshStandardMaterial color="#b464ff" wireframe transparent opacity={0.4} />
        </Icosahedron>
      </Float>
    </>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ParticleNetwork />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
