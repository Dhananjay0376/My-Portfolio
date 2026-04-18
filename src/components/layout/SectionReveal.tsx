"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const clipPath = useTransform(
    smoothProgress,
    [0, 0.15, 1],
    [
      "inset(10% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
    ]
  );

  // Use a minimum opacity of 0.1 and jump to 1 faster
  const opacityValue = useTransform(smoothProgress, [0, 0.1], [0.1, 1]);
  const scaleValue = useTransform(smoothProgress, [0, 0.15], [0.99, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{
        clipPath: mounted ? clipPath : "none",
        opacity: mounted ? opacityValue : 1,
        scale: mounted ? scaleValue : 1,
      }}
    >
      {children}
    </motion.div>
  );
}
