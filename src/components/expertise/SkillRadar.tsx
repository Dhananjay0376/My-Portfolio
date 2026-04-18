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
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-[0.6rem] uppercase tracking-[0.8em] font-mono text-primary font-black">Technical Proficiency</h3>
            <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">SYSTEM<br/>CAPABILITIES</h2>
        </div>
        
        <p className="text-muted-foreground/60 text-xl font-light leading-relaxed max-w-xl italic">
          Multi-disciplinary expertise across the full computational stack, optimized for sub-millisecond efficiency and architectural elegance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="space-y-3 group cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${hoveredIndex === index ? 'bg-primary shadow-[0_0_10px_rgba(0,240,255,1)] scale-125' : 'bg-white/10'}`} />
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-widest transition-colors duration-500 ${hoveredIndex === index ? 'text-primary' : 'text-muted-foreground/40'}`}>
                    {skill.name}
                  </span>
                </div>
                <span className={`text-[10px] font-mono transition-colors duration-500 ${hoveredIndex === index ? 'text-secondary' : 'text-muted-foreground/20'}`}>[{skill.level}%]</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "absolute top-0 left-0 h-full transition-all duration-500",
                    hoveredIndex === index ? "bg-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]" : "bg-gradient-to-r from-primary/20 to-primary/60"
                  )} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Graphic */}
      <div className="flex-1 relative order-1 lg:order-2">
        <div className="relative w-full aspect-square max-w-[550px] flex items-center justify-center p-12">
          {/* Hex-Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(var(--primary) 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
          
          {/* Concentric Circles with labels */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-white/5 flex items-start justify-center" 
              style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
            >
               <span className="text-[8px] font-mono text-white/5 mt-1">{scale * 100}</span>
            </div>
          ))}

          {/* Radial Lines */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div 
              key={i} 
              className="absolute h-px w-full bg-white/5" 
              style={{ transform: `rotate(${angle}deg)` }}
            />
          ))}

          {/* Radar Sweep */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.08)_360deg)] rounded-full animate-[spin_6s_linear_infinite]" />

          {/* Radar Shape and Nodes */}
          <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(0,240,255,0.25)]">
            <defs>
              <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <motion.path
              d={pathData}
              fill="url(#radar-gradient)"
              stroke="var(--primary)"
              strokeWidth="2"
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
                strokeWidth="1"
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
                  className={`transition-all duration-300 ${hoveredIndex === i ? "opacity-30" : "opacity-0"}`} 
                />
                <circle 
                  cx={points[i].x} 
                  cy={points[i].y} 
                  r={hoveredIndex === i ? "4" : "2"} 
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
                        className="text-[10px] font-mono fill-primary font-black uppercase tracking-tighter"
                      >
                        {skill.name.split(" ")[0]}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            ))}
          </svg>

          {/* Data Readout Center */}
          <div className="absolute w-28 h-28 rounded-full border border-white/10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl group cursor-none">
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
            <span className="text-[11px] font-mono text-primary font-black tracking-widest">SYSTEM</span>
            <span className="text-[9px] font-mono text-muted-foreground/40 mt-1 uppercase">Operational</span>
            <div className="mt-2 flex gap-1">
              {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
