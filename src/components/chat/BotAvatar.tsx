"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

function BotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use a fallback or handle errors silently for better UX
  let texture;
  try {
    texture = useLoader(THREE.TextureLoader, "/bot-avatar.jpg");
  } catch (e) {
    console.error("Bot texture not found. Please ensure public/bot-avatar.jpg exists.");
    return null;
  }

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      const targetX = (state.mouse.x * Math.PI) / 8;
      const targetY = (state.mouse.y * Math.PI) / 8;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.1);
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
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(uTime * 1.5 + pos.y * 2.0) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            float visorMask = smoothstep(0.4, 0.5, vUv.y) * (1.0 - smoothstep(0.7, 0.8, vUv.y));
            visorMask *= smoothstep(0.2, 0.3, vUv.x) * (1.0 - smoothstep(0.7, 0.8, vUv.x));
            vec3 glowColor = vec3(1.0, 0.8, 0.0) * visorMask * (sin(uTime * 2.0) * 0.2 + 0.8);
            gl_FragColor = vec4(texColor.rgb + glowColor, texColor.a);
            if(texColor.a < 0.1) discard;
          }
        `}
      />
    </mesh>
  );
}

export function BotAvatar() {
  return (
    <div className="w-64 h-96 relative flex items-center justify-center">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[8px] font-mono tracking-widest text-primary/40 uppercase">Loading Entity</p>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="drop-shadow-[0_0_50px_rgba(255,200,0,0.15)]">
          <ambientLight intensity={0.5} />
          <BotMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
