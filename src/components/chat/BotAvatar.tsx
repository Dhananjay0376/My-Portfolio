"use client";

import { useRef, Suspense, useState, useEffect, memo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { View, PerspectiveCamera, useTexture, Center, Environment } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WebGLErrorBoundary, isWebGLSupported } from "@/components/layout/WebGLErrorBoundary";

interface BotAvatarProps {
  onClick?: () => void;
}

const RobotModel = memo(function RobotModel() {
  const obj = useLoader(OBJLoader, "/model/base.obj");
  
  const textures = useTexture({
    map: "/model/shaded.png",
    metalnessMap: "/model/texture_metallic.png",
    roughnessMap: "/model/texture_roughness.png",
    normalMap: "/model/texture_normal.png",
  });

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
        child.material = new THREE.MeshStandardMaterial({
          map: textures.map,
          metalnessMap: textures.metalnessMap,
          roughnessMap: textures.roughnessMap,
          normalMap: textures.normalMap,
          color: "#ffffff", 
          metalness: 0.0,
          roughness: 0.6,
          envMapIntensity: 0.05,
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
        <primitive object={obj} scale={1.2} />
      </Center>
    </group>
  );
});

export const BotAvatar = memo(function BotAvatar({ onClick }: BotAvatarProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    setWebglOk(isWebGLSupported());
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const fallbackUI = (
    <div className="flex items-center justify-center h-full">
      <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-primary/40">
        <Bot className="w-8 h-8" />
      </div>
    </div>
  );

  return (
    <div 
      className="fixed bottom-0 right-15 w-28 h-36 z-[99999] overflow-visible pointer-events-auto cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
    >
      {/* Interactive Halo Glow */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-primary/20 blur-[40px] transition-all duration-1000",
        isHovered ? "opacity-60 scale-110" : "opacity-0 scale-100"
      )} />

      {webglOk === false ? (
        fallbackUI
      ) : (
        <WebGLErrorBoundary fallback={fallbackUI}>
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          }>
            <motion.div 
              animate={{ 
                scale: isHovered ? 1.08 : 1,
                y: isHovered ? -6 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full w-full"
            >
              <View className="h-full w-full">
                <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={22} />
                
                <ambientLight intensity={0.4} /> 
                
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, 5, 5]} intensity={1.0} color="#ffffff" />
                
                <pointLight position={[0, -5, 5]} intensity={0.5} color="#ffffff" />
                
                <pointLight position={[1, 1, 6]} intensity={3.5} color="#ffffff" distance={15} decay={2} />
                <pointLight position={[-1, 1, 6]} intensity={3.5} color="#ffffff" distance={15} decay={2} />
                
                <Environment preset="studio" />
                
                <RobotModel />
              </View>
            </motion.div>
          </Suspense>
        </WebGLErrorBoundary>
      )}

      {/* Floating Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] rounded-lg whitespace-nowrap shadow-[0_10px_30px_rgba(74,127,181,0.4)]"
          >
            Ask the Builder
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
