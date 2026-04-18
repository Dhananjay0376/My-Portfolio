"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

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

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-24 max-w-7xl mx-auto px-4">
      {/* Description */}
      <div className="flex-1 space-y-10 order-2 lg:order-1">
        <div className="space-y-4">
          <h3 className="text-[0.6rem] uppercase tracking-[0.8em] font-mono text-primary font-black">Technical Proficiency</h3>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">SYSTEM<br/>CAPABILITIES</h2>
        </div>
        
        <p className="text-muted-foreground/60 text-xl font-light leading-relaxed max-w-xl">
          Multi-disciplinary expertise across the full computational stack, optimized for sub-millisecond efficiency and architectural elegance.
        </p>

        <div className="grid grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="space-y-2 group cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-end">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest transition-colors ${hoveredIndex === index ? 'text-primary' : 'text-muted-foreground/40'}`}>
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/20">{skill.level}%</span>
              </div>
              <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r from-primary/40 to-primary`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Graphic */}
      <div className="flex-1 relative order-1 lg:order-2">
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
          {/* Concentric Circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-white/5" 
              style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
            />
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
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.05)_360deg)] rounded-full animate-[spin_8s_linear_infinite]" />

          {/* Skill Nodes */}
          <svg className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <defs>
              <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* The Radar Shape */}
            <motion.path
              d={`
                M ${250 + 200 * (skills[0].level/100) * Math.cos(skills[0].angle * Math.PI / 180)} ${250 + 200 * (skills[0].level/100) * Math.sin(skills[0].angle * Math.PI / 180)}
                L ${250 + 200 * (skills[1].level/100) * Math.cos(skills[1].angle * Math.PI / 180)} ${250 + 200 * (skills[1].level/100) * Math.sin(skills[1].angle * Math.PI / 180)}
                L ${250 + 200 * (skills[2].level/100) * Math.cos(skills[2].angle * Math.PI / 180)} ${250 + 200 * (skills[2].level/100) * Math.sin(skills[2].angle * Math.PI / 180)}
                L ${250 + 200 * (skills[3].level/100) * Math.cos(skills[3].angle * Math.PI / 180)} ${250 + 200 * (skills[3].level/100) * Math.sin(skills[3].angle * Math.PI / 180)}
                L ${250 + 200 * (skills[4].level/100) * Math.cos(skills[4].angle * Math.PI / 180)} ${250 + 200 * (skills[4].level/100) * Math.sin(skills[4].angle * Math.PI / 180)}
                L ${250 + 200 * (skills[5].level/100) * Math.cos(skills[5].angle * Math.PI / 180)} ${250 + 200 * (skills[5].level/100) * Math.sin(skills[5].angle * Math.PI / 180)}
                Z
              `}
              fill="url(#radar-gradient)"
              stroke="var(--primary)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewBox="0 0 500 500"
            />

            {/* Pulsing Nodes */}
            {skills.map((skill, i) => {
              const x = 250 + 200 * (skill.level/100) * Math.cos(skill.angle * Math.PI / 180);
              const y = 250 + 200 * (skill.level/100) * Math.sin(skill.angle * Math.PI / 180);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="var(--primary)" className={hoveredIndex === i ? "animate-ping" : ""} />
                  <circle cx={x} cy={y} r="2" fill="var(--primary)" />
                </g>
              );
            })}
          </svg>

          {/* Data Readout Center */}
          <div className="absolute w-24 h-24 rounded-full border border-white/10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
            <span className="text-[10px] font-mono text-primary font-bold">CORE</span>
            <span className="text-[8px] font-mono text-muted-foreground/40">v2.0.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
