"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

function BotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/bot-avatar.png"); // We'll need the user to place this file

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Subtle tilt based on mouse
      const targetX = (state.mouse.x * Math.PI) / 8;
      const targetY = (state.mouse.y * Math.PI) / 8;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.1);
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 5, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Subtle breathing effect
            float wave = sin(uTime * 1.5 + pos.y * 2.0) * 0.05;
            pos.z += wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            
            // Visor Glow Enhancement
            // The visor is roughly in the center-top area
            float visorMask = smoothstep(0.4, 0.5, vUv.y) * (1.0 - smoothstep(0.7, 0.8, vUv.y));
            visorMask *= smoothstep(0.2, 0.3, vUv.x) * (1.0 - smoothstep(0.7, 0.8, vUv.x));
            
            vec3 glowColor = vec3(1.0, 0.8, 0.0) * visorMask * (sin(uTime * 2.0) * 0.2 + 0.8);
            
            gl_FragColor = vec4(texColor.rgb + glowColor, texColor.a);
            
            // Simple alpha discard for background (if it was transparent)
            if(texColor.a < 0.1) discard;
          }
        `}
      />
    </mesh>
  );
}

export function BotAvatar() {
  return (
    <div className="w-64 h-96 cursor-pointer drop-shadow-[0_0_30px_rgba(255,200,0,0.2)]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BotMesh />
      </Canvas>
    </div>
  );
}
