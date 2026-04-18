"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { Suspense } from "react";

export function SceneContainer() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <Canvas
        className="h-full w-full"
        shadows={false}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: true,
          depth: true,
          precision: "highp",
          dithering: true,
          toneMapping: 0,
        }}
      >
        <Suspense fallback={null}>
          {/* View.Port must be able to receive events if we want interaction, 
              but the container is pointer-events-none. 
              Drei handles the event forwarding from the DOM elements to the Canvas. */}
          <View.Port />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
