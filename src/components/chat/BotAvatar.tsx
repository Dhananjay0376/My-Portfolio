"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import { Loader2 } from "lucide-react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

export function BotAvatar() {
  return (
    <div className="w-48 h-64 relative cursor-pointer">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[7px] font-mono tracking-widest text-primary/40 uppercase">Awaiting Entity File</p>
        </div>
      }>
        <Canvas 
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 5], fov: 35 }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Model url="/bot-avatar.glb" />
          </Float>

          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
