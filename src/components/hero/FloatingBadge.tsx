"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 4, type: "spring", bounce: 0.5 }}
      className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(180,100,255,0.15)]"
    >
      <div className="relative flex h-3 w-3 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </div>
      <MapPin className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">
        Currently in Mathura <span className="text-muted-foreground mx-1">&bull;</span> Open to wild projects
      </span>
    </motion.div>
  );
}
