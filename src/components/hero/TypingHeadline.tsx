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
        className="glass-card p-16 md:p-24 rounded-[3rem] border-primary/20 relative group"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/40" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/40" />

        <div className="space-y-8">
          <div className="inline-block">
            <h2 className="glass-card px-6 py-2 rounded-full border border-primary/30 text-[0.75rem] md:text-sm uppercase tracking-[1.2em] font-mono text-primary font-black backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/60 shadow-sm">
              System Architect &bull; Solution Engineer
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest leading-[0.9] max-w-5xl">
            <TextScramble text="WHERE IDEAS" duration={1.5} className="block text-foreground" />
            <TextScramble text="TAKE FLIGHT" duration={2} className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-foreground/40" />
          </h1>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="glass-card px-8 py-5 rounded-full border border-white/40 dark:border-sky-300/20 backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/60 shadow-lg text-lg md:text-2xl text-slate-800 dark:text-slate-200 max-w-2xl font-light leading-relaxed tracking-wide italic"
      >
        &quot;Engineering <span className="text-primary font-semibold not-italic">digital ecosystems </span> that soar above the ordinary.&quot;
      </motion.p>
    </div>
  );
}
