"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 300;

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll();

  // Helper to format frame numbers e.g. 1 -> "001"
  const getFramePath = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/scroll-frames/ezgif-frame-${padded}.jpg`;
  };

  // Preload frames with mobile optimization
  useEffect(() => {
    let isMounted = true;
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // Detect mobile / low memory
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 2 : 1; // Step 2 frames on mobile to save memory

    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i - 1] = img;
        loaded++;
        setLoadedCount(loaded);

        if (loaded >= Math.floor(TOTAL_FRAMES / step) * 0.3) {
          // Ready after 30% preloaded for fast interaction
          setIsReady(true);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find nearest loaded frame if current isn't loaded yet
    let img = imagesRef.current[frameIndex];
    if (!img) {
      for (let offset = 1; offset < 10; offset++) {
        if (imagesRef.current[frameIndex - offset]) {
          img = imagesRef.current[frameIndex - offset];
          break;
        }
        if (imagesRef.current[frameIndex + offset]) {
          img = imagesRef.current[frameIndex + offset];
          break;
        }
      }
    }

    if (!img) return;

    // Set canvas dimensions considering high-DPI (Retina) displays
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;
    const physicalWidth = logicalWidth * dpr;
    const physicalHeight = logicalHeight * dpr;

    if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
      canvas.width = physicalWidth;
      canvas.height = physicalHeight;
    }

    ctx.clearRect(0, 0, physicalWidth, physicalHeight);

    // Object-fit: cover implementation using physical dimensions for maximum crispness
    const imgRatio = img.width / img.height;
    const canvasRatio = physicalWidth / physicalHeight;

    let drawWidth = physicalWidth;
    let drawHeight = physicalHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = physicalWidth / imgRatio;
      offsetY = (physicalHeight - drawHeight) / 2;
    } else {
      drawWidth = physicalHeight * imgRatio;
      offsetX = (physicalWidth - drawWidth) / 2;
    }

    // Enable high quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Sync with scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    requestAnimationFrame(() => drawFrame(targetFrame));
  });

  // Initial draw once ready or resized
  useEffect(() => {
    const handleResize = () => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor((scrollYProgress.get() || 0) * TOTAL_FRAMES))
      );
      drawFrame(frameIndex);
    };

    if (isReady) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-filter duration-700 dark:brightness-[0.50] dark:contrast-[1.10] dark:saturate-[0.95]"
      />
      {/* Blurred patch covering the watermark logo, shifted left and upwards */}
      <div className="absolute bottom-12 right-12 md:bottom-7 md:right-22 w-16 h-16 rounded-full bg-background/85 backdrop-blur-xl pointer-events-none shadow-2xl border border-white/20 dark:border-sky-300/10" />
    </div>
  );
}
