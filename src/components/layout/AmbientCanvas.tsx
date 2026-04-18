"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function MeshGradient() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  // Create a parallax offset based on scroll
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#00f0ff") },
    uColorB: { value: new THREE.Color("#b464ff") },
    uScroll: { value: 0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      // Sync scroll progress to shader
      uniforms.uScroll.value = scrollYProgress.get();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScroll;
          void main() {
            vUv = uv;
            vec3 pos = position;
            // Add subtle wave based on time and scroll
            pos.z += sin(pos.x * 3.0 + uTime * 0.5 + uScroll * 10.0) * 0.05;
            pos.z += cos(pos.y * 2.0 + uTime * 0.3) * 0.05;
            gl_Position = vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uScroll;

          void main() {
            vec2 uv = vUv;
            // Create moving patterns
            float noise = sin(uv.x * 10.0 + uTime * 0.2 + uScroll * 5.0) * 0.5 + 0.5;
            noise *= cos(uv.y * 8.0 - uTime * 0.15) * 0.5 + 0.5;
            
            vec3 color = mix(uColorA, uColorB, noise);
            
            // Add scroll-dependent brightness/warp
            color *= 0.1 + (0.05 * sin(uScroll * 20.0));
            
            gl_FragColor = vec4(color, 0.15);
          }
        `}
      />
    </mesh>
  );
}

export function AmbientCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <MeshGradient />
      </Canvas>
    </div>
  );
}
