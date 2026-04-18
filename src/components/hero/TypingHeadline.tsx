"use client";

import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/TextScramble";

export function TypingHeadline() {
  return (
    <div className="z-10 text-center flex flex-col items-center gap-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <h2 className="text-[0.6rem] uppercase tracking-[0.6em] font-mono text-primary font-black">
          System Architect & Solution Engineer
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] max-w-6xl">
          <TextScramble text="ENGINEERING" duration={1.5} className="block" />
          <TextScramble text="THE FUTURE" duration={2} className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20" />
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        className="text-xl md:text-2xl text-muted-foreground/60 max-w-2xl font-light leading-relaxed tracking-wide"
      >
        I translate complex institutional challenges into <span className="text-white font-medium">high-performance digital systems</span> with sub-millisecond precision.
      </motion.p>
    </div>
  );
}
