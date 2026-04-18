"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2, ease: "easeOut" }}
      className="absolute top-10 right-10 z-20 hidden lg:flex items-center gap-4 p-1 pr-6 rounded-full glass-card border-white/5 shadow-2xl"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
        <Globe className="w-5 h-5 text-primary animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 leading-none">Status</span>
        <span className="text-xs font-bold text-white tracking-tight">Available for high-stakes missions</span>
      </div>
      <div className="flex gap-1 ml-2">
        <div className="w-1 h-1 rounded-full bg-primary" />
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <div className="w-1 h-1 rounded-full bg-primary/20" />
      </div>
    </motion.div>
  );
}
