"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

function BotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/bot-avatar.jpg");

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Target rotation based on mouse
      const targetX = (state.mouse.x * Math.PI) / 12;
      const targetY = (state.mouse.y * Math.PI) / 12;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.1);
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
      
      uniforms.uMouse.value.set(state.mouse.x, state.mouse.y);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 3.5, 64, 64]} />
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
            
            // Subtle 3D deformation based on mouse for "Volumetric" feel
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            pos.z += sin(dist * 5.0 - uTime) * 0.02;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            
            // Visor Glow - precisely tuned to the astronaut image visor
            // Visor coordinates are roughly center-top
            float visor = smoothstep(0.4, 0.5, vUv.y) * (1.0 - smoothstep(0.8, 0.85, vUv.y));
            visor *= smoothstep(0.2, 0.35, vUv.x) * (1.0 - smoothstep(0.65, 0.8, vUv.x));
            
            // Adding a "Sentient" pulse
            float pulse = sin(uTime * 2.5) * 0.2 + 0.8;
            vec3 glow = vec3(1.0, 0.75, 0.1) * visor * pulse * 1.5;
            
            // Sophisticated color grading
            vec3 finalColor = texColor.rgb + glow;
            
            // Add a subtle vignette for depth
            float vignette = 1.0 - distance(vUv, vec2(0.5)) * 0.5;
            finalColor *= vignette;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function BotAvatar() {
  return (
    <div className="w-48 h-72 relative flex items-center justify-center transition-transform hover:scale-105 duration-700">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <p className="text-[7px] font-mono tracking-widest text-primary/40 uppercase">Manifesting Entity</p>
        </div>
      }>
        <Canvas 
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 4.5], fov: 35 }} 
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffaa00" />
          <BotMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
