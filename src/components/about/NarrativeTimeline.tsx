"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineEvents = [
  {
    year: "2020",
    title: "The Awakening",
    description: "Built my first full-stack application and realized the power of turning ideas into production-ready software.",
  },
  {
    year: "2022",
    title: "E-commerce Mastery",
    description: "Developed and scaled complex e-commerce platforms handling thousands of transactions with perfect uptime.",
  },
  {
    year: "2024",
    title: "The AI Revolution",
    description: "Integrated custom LLMs and RAG pipelines to create AI-powered tools that fundamentally changed client workflows.",
  },
  {
    year: "2026",
    title: "Ultimate Solution Builder",
    description: "Orchestrating real-time systems, 3D experiences, and AI to build solutions that make clients say 'this changes everything'.",
  },
];

export function NarrativeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-20 px-4">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
        <motion.div
          className="w-full bg-gradient-to-b from-primary via-secondary to-primary origin-top"
          style={{ scaleY: pathLength }}
        />
      </div>

      <div className="space-y-40 relative z-10">
        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={event.year} className={`relative flex flex-col md:flex-row items-center gap-12 ${!isEven ? "md:flex-row-reverse" : ""}`}>
              {/* Year Badge */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-background border border-white/10 z-20 group">
                <div className="absolute inset-2 rounded-full border border-primary/20 group-hover:border-primary transition-colors duration-500" />
                <span className="text-sm font-mono font-black tracking-tighter text-primary">{event.year}</span>
              </div>

              <div className={`flex-1 w-full flex ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-[85%] glass-card p-10 rounded-3xl border-white/5 relative group hover:border-primary/20 transition-all duration-700"
                >
                  <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-primary/40" />
                  <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-primary/40" />
                  
                  <h3 className="text-3xl font-black tracking-tighter text-white mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{event.description}</p>
                </motion.div>
              </div>

              <div className="flex-1 w-full hidden md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
