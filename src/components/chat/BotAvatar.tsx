"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment, ContactShadows, useTexture, View } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

function RobotModel() {
  const obj = useLoader(OBJLoader, "/model/base.obj");
  const textures = useTexture({
    map: "/model/texture_diffuse.png",
    normalMap: "/model/texture_normal.png",
    roughnessMap: "/model/texture_roughness.png",
    metalnessMap: "/model/texture_metallic.png",
  });

  const groupRef = useRef<THREE.Group>(null);

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        ...textures,
        roughness: 1,
        metalness: 1,
      });
    }
  });

  return (
    <primitive 
      ref={groupRef} 
      object={obj} 
      scale={0.01} 
      position={[0, -1, 0]} 
    />
  );
}

export function BotAvatar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-48 h-64 relative cursor-pointer">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[7px] font-mono tracking-widest text-primary/40 uppercase">Assembling Robot</p>
        </div>
      }>
        <View className="h-full w-full">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <RobotModel />
          </Float>

          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
        </View>
      </Suspense>
    </div>
  );
}
