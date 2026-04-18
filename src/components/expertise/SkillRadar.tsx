"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "React / Next.js", color: "from-cyan-400 to-blue-600", x: -100, y: -50 },
  { name: "TypeScript", color: "from-blue-500 to-indigo-600", x: 120, y: -80 },
  { name: "Tailwind CSS", color: "from-teal-400 to-emerald-600", x: -150, y: 100 },
  { name: "Node.js", color: "from-green-500 to-emerald-700", x: 80, y: 120 },
  { name: "PostgreSQL", color: "from-blue-600 to-blue-800", x: -40, y: -160 },
  { name: "Three.js", color: "from-purple-500 to-pink-600", x: 160, y: 40 },
  { name: "AI / LLMs", color: "from-pink-500 to-rose-600", x: 0, y: 180 },
];

export function SkillRadar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
      <div className="flex-1 space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold">Tech Stack Ecosystem</h3>
        <p className="text-muted-foreground text-lg">
          I build with modern, scalable technologies. Grab and throw the skill orbs around. 
          Hover over them to see the tech stack explode into view.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {skills.map((skill) => (
            <Badge 
              key={`badge-${skill.name}`}
              variant={hoveredSkill === skill.name ? "default" : "secondary"}
              className={`text-sm px-3 py-1 transition-all ${hoveredSkill === skill.name ? 'scale-110 shadow-[0_0_15px_rgba(0,240,255,0.5)]' : ''}`}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="flex-1 relative w-full aspect-square max-w-[500px] border border-white/5 rounded-full bg-black/20 overflow-hidden flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Radar concentric circles */}
        <div className="absolute inset-4 rounded-full border border-white/10" />
        <div className="absolute inset-16 rounded-full border border-white/10" />
        <div className="absolute inset-32 rounded-full border border-white/10" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.2)_360deg)] rounded-full animate-[spin_4s_linear_infinite]" />

        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{ x: skill.x, y: skill.y, scale: 1 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            whileDrag={{ scale: 1.1, zIndex: 20, cursor: "grabbing" }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 }}
            className="absolute cursor-grab flex items-center justify-center group"
          >
            {/* 3D Orb Effect */}
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} opacity-80 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.4),0_0_20px_rgba(180,100,255,0.4)] backdrop-blur-md`} />
            
            {/* Tooltip */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: -40 }}
              className="absolute whitespace-nowrap px-3 py-1 bg-black/80 text-white text-xs font-bold rounded pointer-events-none border border-white/10"
            >
              {skill.name}
            </motion.div>
          </motion.div>
        ))}
        
        {/* Center node */}
        <div className="absolute w-8 h-8 rounded-full bg-primary shadow-[0_0_30px_rgba(0,240,255,0.8)] z-0" />
      </div>
    </div>
  );
}
