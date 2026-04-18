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
    map: "/model/shaded.png", // Switching back to shaded as it's more saturated
    metalnessMap: "/model/texture_metallic.png",
    roughnessMap: "/model/texture_roughness.png",
    normalMap: "/model/texture_normal.png",
  });

  // Enforce SRGB color space to prevent washed out look
  if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!obj) return;
    
    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.map.flipY = false;
    textures.normalMap.flipY = false;
    textures.metalnessMap.flipY = false;
    textures.roughnessMap.flipY = false;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log("Mesh Name:", child.name);
        
        const name = child.name.toLowerCase();
        const isEyeBase = name.includes("eye") || name.includes("lens");
        const isPupil = name.includes("pupil") || name.includes("iris");
        const isAnyEyePart = isEyeBase || isPupil;

        child.material = new THREE.MeshStandardMaterial({
          map: textures.map,
          metalnessMap: textures.metalnessMap,
          roughnessMap: textures.roughnessMap,
          normalMap: textures.normalMap,
          color: "#ffffff", 
          metalness: 0.0,   // Pure plastic look for maximum color saturation
          roughness: 0.5,   
          envMapIntensity: 0.0, // Totally disable environment wash for now
          side: THREE.DoubleSide,
        });
        child.geometry.computeVertexNormals();
      }
    });
  }, [obj, textures]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={obj} scale={1.2} /> {/* Reduced scale to match corner */}
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
      className="fixed bottom-4 right-4 w-40 h-48 z-[99999] overflow-visible pointer-events-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
    >
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
        </div>
      }>
        <View className="h-full w-full">
          <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={22} />
          
          <ambientLight intensity={0.1} /> {/* Minimal ambient to avoid washing */}
          
          {/* Key Light - Slightly tinted red to boost body color */}
          <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffdada" />
          <pointLight position={[-5, 5, 5]} intensity={1.5} color="#ffffff" />
          
          {/* Fill Light */}
          <pointLight position={[0, -5, 5]} intensity={0.5} color="#ffffff" />
          
          {/* Eye Catchlights - Kept crisp white */}
          <pointLight position={[1, 1, 6]} intensity={3.5} color="#ffffff" distance={15} decay={2} />
          <pointLight position={[-1, 1, 6]} intensity={3.5} color="#ffffff" distance={15} decay={2} />
          
          <Environment preset="studio" />
          
          <RobotModel />
        </View>





      </Suspense>
    </div>
  );
});
