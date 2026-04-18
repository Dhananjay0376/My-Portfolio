"use client";

import { useRef, Suspense, useState, useEffect, memo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { View, PerspectiveCamera, useTexture, Center, Environment } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

interface BotAvatarProps {
  onClick?: () => void;
}

const RobotModel = memo(function RobotModel() {
  const obj = useLoader(OBJLoader, "/model/base.obj");
  
  const textures = useTexture({
    map: "/model/texture_diffuse.png",
    metalnessMap: "/model/texture_metallic.png",
    roughnessMap: "/model/texture_roughness.png",
    normalMap: "/model/texture_normal.png",
  });

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!obj) return;
    
    // Ensure textures are vivid and not washed out
    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.map.flipY = false;
    textures.normalMap.flipY = false;
    textures.metalnessMap.flipY = false;
    textures.roughnessMap.flipY = false;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: textures.map,
          normalMap: textures.normalMap,
          metalnessMap: textures.metalnessMap,
          roughnessMap: textures.roughnessMap,
          metalness: 1.5, // High metalness for deep contrast
          roughness: 0.3, // Lower roughness for wet-look red paint
          emissive: "#ff0000",
          emissiveMap: textures.map,
          emissiveIntensity: 3.0, // Overdrive red glow
          side: THREE.DoubleSide,
        });
        child.geometry.computeVertexNormals();
      }
    });
  }, [obj, textures]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.45;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={obj} scale={1.6} />
      </Center>
    </group>
  );
});

export const BotAvatar = memo(function BotAvatar({ onClick }: BotAvatarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 w-64 h-80 z-[99999] overflow-visible pointer-events-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Robot Clicked!"); // Debugging click
        onClick?.();
      }}
    >
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
        </div>
      }>
        <View className="h-full w-full">
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={20} />
          
          {/* Crimson Red Contrast Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={15} color="#ff0000" />
          <pointLight position={[-10, 5, 10]} intensity={10} color="#ff0044" />
          <spotLight position={[0, 20, 0]} intensity={25} color="#ffffff" angle={0.3} penumbra={1} />
          
          <Environment preset="night" />
          
          <RobotModel />
        </View>
      </Suspense>
    </div>
  );
});
