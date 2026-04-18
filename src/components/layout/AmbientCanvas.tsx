"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MeshGradient() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#00f0ff") },
    uColor2: { value: new THREE.Color("#7000ff") },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 3.0 + uTime * 0.5) * 0.1;
            pos.z += cos(pos.y * 2.0 + uTime * 0.3) * 0.1;
            gl_Position = vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          void main() {
            float noise = sin(vUv.x * 10.0 + uTime * 0.2) * cos(vUv.y * 10.0 + uTime * 0.2);
            vec3 color = mix(uColor1, uColor2, vUv.y + noise * 0.3);
            gl_FragColor = vec4(color, 0.03 + noise * 0.02);
          }
        `}
      />
    </mesh>
  );
}

export function AmbientCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <MeshGradient />
      </Canvas>
    </div>
  );
}
