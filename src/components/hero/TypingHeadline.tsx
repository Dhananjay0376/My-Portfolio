"use client";

import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/TextScramble";

export function TypingHeadline() {
  return (
    <div className="z-10 text-center flex flex-col items-center gap-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-16 md:p-24 rounded-[3rem] border-white/5 relative group"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-primary/20" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/20" />

        <div className="space-y-8">
          <h2 className="text-[0.6rem] uppercase tracking-[1em] font-mono text-primary font-black opacity-60">
            System Architect &bull; Solution Engineer
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-widest leading-[0.9] max-w-5xl">
            <TextScramble text="ENGINEERING" duration={1.5} className="block" />
            <TextScramble text="THE FUTURE" duration={2} className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10" />
          </h1>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="text-xl md:text-2xl text-muted-foreground/50 max-w-2xl font-light leading-relaxed tracking-wide italic"
      >
        &quot;We don&apos;t just build apps. We engineer <span className="text-white font-medium not-italic">digital ecosystems</span> that defy institutional complexity.&quot;
      </motion.p>
    </div>
  );
}
