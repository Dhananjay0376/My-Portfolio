"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { WebGLErrorBoundary, isWebGLSupported } from "./WebGLErrorBoundary";

export function SceneContainer() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(isWebGLSupported());
  }, []);

  if (webglOk === false) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <WebGLErrorBoundary fallback={null}>
        <Canvas
          className="h-full w-full pointer-events-none"
          style={{ pointerEvents: 'none' }}
          shadows={false}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: true,
            depth: true,
            precision: "highp",
            toneMapping: 4, // ACESFilmicToneMapping
            toneMappingExposure: 0.6,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              console.warn("WebGL Context Lost - handled gracefully");
            }, false);
          }}
        >
          <Suspense fallback={null}>
            <View.Port />
            <Preload all />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
