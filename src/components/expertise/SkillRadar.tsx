"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Frontend Architecture", level: 95, color: "var(--primary)", angle: 0 },
  { name: "Backend Engineering", level: 90, color: "var(--secondary)", angle: 60 },
  { name: "AI/LLM Integration", level: 85, color: "var(--primary)", angle: 120 },
  { name: "Distributed Systems", level: 80, color: "var(--secondary)", angle: 180 },
  { name: "WebGL & 3D Web", level: 88, color: "var(--primary)", angle: 240 },
  { name: "DevOps & Cloud", level: 82, color: "var(--secondary)", angle: 300 },
];

export function SkillRadar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Calculate the dynamic points for the radar path
  const points = skills.map((skill) => {
    const angleRad = (skill.angle - 90) * (Math.PI / 180);
    const radius = 200 * (skill.level / 100);
    return {
      x: 250 + radius * Math.cos(angleRad),
      y: 250 + radius * Math.sin(angleRad)
    };
  });

  const pathData = `M ${points[0].x} ${points[0].y} ` + 
    points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ") + 
    " Z";

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-24 max-w-7xl mx-auto px-4">
      {/* Description */}
      <div className="flex-1 space-y-10 order-2 lg:order-1">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="glass-card px-4 py-1.5 rounded-full border border-primary/30 text-[0.65rem] uppercase tracking-[0.8em] font-mono text-primary font-black backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/60 shadow-sm inline-block">
              Technical Proficiency
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65 inline-block">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300">
              SYSTEM<br/>CAPABILITIES
            </h2>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/50 border border-white/40 dark:border-sky-300/10 shadow-sm max-w-xl">
          <p className="text-slate-800 dark:text-slate-200 text-base md:text-lg font-medium leading-relaxed italic">
            Multi-disciplinary expertise across the full computational stack, optimized for sub-millisecond efficiency and architectural elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="glass-card p-4 rounded-2xl border border-white/40 dark:border-sky-300/15 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md hover:border-primary/50 transition-all duration-300 space-y-3 group cursor-crosshair shadow-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${hoveredIndex === index ? 'bg-primary shadow-[0_0_10px_var(--primary)] scale-125' : 'bg-primary/40'}`} />
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-widest transition-colors duration-500 ${hoveredIndex === index ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
                    {skill.name}
                  </span>
                </div>
                <span className="glass-card px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-[10px] font-mono text-secondary font-bold tracking-tighter backdrop-blur-md shadow-sm">
                  [{skill.level}%]
                </span>
              </div>
              <div className="h-[3px] w-full bg-primary/10 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "absolute top-0 left-0 h-full transition-all duration-500 rounded-full",
                    hoveredIndex === index ? "bg-primary shadow-[0_0_15px_var(--primary)]" : "bg-gradient-to-r from-primary/40 to-primary/90"
                  )} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Graphic */}
      <div className="flex-1 relative order-1 lg:order-2">
        <div className="glass-card rounded-full aspect-square w-full max-w-[550px] flex items-center justify-center p-12 border-2 border-white/50 dark:border-sky-300/20 backdrop-blur-md bg-white/35 dark:bg-[#0C1222]/60 shadow-2xl relative overflow-hidden">
          {/* Hex-Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-full" 
               style={{ backgroundImage: `radial-gradient(var(--primary) 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
          
          {/* Concentric Circles with labels */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-primary/20 flex items-start justify-center" 
              style={{ width: `${scale * 85}%`, height: `${scale * 85}%` }}
            >
               <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 mt-1 font-bold">{scale * 100}</span>
            </div>
          ))}

          {/* Radial Lines */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div 
              key={i} 
              className="absolute h-px w-full bg-primary/20" 
              style={{ transform: `rotate(${angle}deg)` }}
            />
          ))}

          {/* Radar Sweep */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(74,127,181,0.12)_360deg)] rounded-full animate-[spin_6s_linear_infinite]" />

          {/* Radar Shape and Nodes */}
          <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(74,127,181,0.3)]">
            <defs>
              <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            <motion.path
              d={pathData}
              fill="url(#radar-gradient)"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Hovered Axis Line */}
            {hoveredIndex !== null && (
               <motion.line
                x1="250"
                y1="250"
                x2={points[hoveredIndex].x}
                y2={points[hoveredIndex].y}
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
               />
            )}

            {skills.map((skill, i) => (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <circle 
                  cx={points[i].x} 
                  cy={points[i].y} 
                  r={hoveredIndex === i ? "8" : "4"} 
                  fill="var(--primary)" 
                  className={`transition-all duration-300 ${hoveredIndex === i ? "opacity-40" : "opacity-0"}`} 
                />
                <circle 
                  cx={points[i].x} 
                  cy={points[i].y} 
                  r={hoveredIndex === i ? "5" : "3"} 
                  fill="var(--primary)" 
                  className="transition-all duration-300"
                />
                
                {/* Node labels (only on hover) */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <text
                        x={points[i].x + (points[i].x > 250 ? 15 : -15)}
                        y={points[i].y + (points[i].y > 250 ? 15 : -15)}
                        textAnchor={points[i].x > 250 ? "start" : "end"}
                        className="text-[11px] font-mono fill-primary font-black uppercase tracking-tighter"
                      >
                        {skill.name.split(" ")[0]}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            ))}
          </svg>

          <div className="absolute w-32 h-32 rounded-full glass-card border border-white/40 dark:border-sky-300/20 flex flex-col items-center justify-center bg-white/60 dark:bg-[#0C1222]/80 backdrop-blur-md shadow-xl group cursor-none">
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-20" />
            <span className="text-[12px] font-mono text-primary font-black tracking-widest">SYSTEM</span>
            <span className="text-[9px] font-mono text-slate-700 dark:text-slate-300 mt-1 uppercase font-bold">Operational</span>
            <div className="mt-2 flex gap-1">
              {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
