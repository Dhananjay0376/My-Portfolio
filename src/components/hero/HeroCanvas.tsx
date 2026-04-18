"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, useScroll } from "@react-three/drei";
import * as THREE from "three";

function SystemCore() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00f0ff"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            roughness={0}
          />
        </Sphere>
      </Float>

      {/* Outer Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2} />
      </mesh>
      
      <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>

      {/* Floating Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 2} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <Sphere args={[0.02, 16, 16]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        <SystemCore />
      </Canvas>
    </div>
  );
}
