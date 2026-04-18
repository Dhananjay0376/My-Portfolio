"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [hoverType, setHoverType] = useState<"none" | "button" | "link">("none");
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setHoverType("button");
      } else if (target.tagName === "A" || target.closest("a")) {
        setHoverType("link");
      } else {
        setHoverType("none");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Main Cursor Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-primary rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Outer Halo/Ring */}
      <motion.div
        className="absolute rounded-full border border-primary/30"
        animate={{
          width: hoverType !== "none" ? 80 : 40,
          height: hoverType !== "none" ? 80 : 40,
          opacity: hoverType !== "none" ? 1 : 0.5,
          backgroundColor: hoverType !== "none" ? "rgba(0, 240, 255, 0.05)" : "rgba(0, 240, 255, 0)",
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* Dynamic Glow Spotlight */}
      <motion.div
        className="absolute w-64 h-64 bg-primary/5 rounded-full blur-[100px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
