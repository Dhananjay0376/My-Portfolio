"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

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

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-muted/30 -translate-x-1/2 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-primary to-secondary origin-top"
          style={{ scaleY: pathLength }}
        />
      </div>

      <div className="space-y-24 relative z-10">
        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 w-full flex justify-center md:justify-end">
                <Card className="w-full md:w-3/4 border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <span className="text-xs font-bold">{event.year}</span>
              </div>

              <div className="flex-1 w-full hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
