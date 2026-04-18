"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, Loader2, Code, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  tech: string[];
  metrics: string[];
  gradient: string;
  live_url?: string;
  github_url?: string;
}

export const projectsData: Project[] = [
  {
    slug: "jewellery-ecommerce",
    title: "Jewellery Store E-commerce",
    tagline: "High-end bespoke jewellery shopping experience.",
    category: "E-commerce",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Three.js"],
    metrics: ["+45% Conversion", "<1s Load Time"],
    gradient: "from-amber-500/20 to-orange-700/20",
  },
  {
    slug: "realtime-organizer",
    title: "Team & Solo Work Organizer",
    tagline: "Zero-latency collaborative workspace for teams.",
    category: "Real-time",
    tech: ["React", "WebSockets", "Redis", "Node.js"],
    metrics: ["10k+ active users", "0ms perceived lag"],
    gradient: "from-blue-500/20 to-cyan-700/20",
  },
  {
    slug: "ai-content-generator",
    title: "AI Content Calendar Generator",
    tagline: "Automated social media pipelines with custom LLMs.",
    category: "AI & Automation",
    tech: ["OpenAI", "Supabase", "Next.js", "Vercel AI"],
    metrics: ["100x Faster Output", "Auto-posting API"],
    gradient: "from-purple-500/20 to-pink-700/20",
  },
  {
    slug: "customer-management",
    title: "Customer Information System",
    tagline: "Enterprise-grade CRM with advanced analytics.",
    category: "Web Apps",
    tech: ["React", "Tailwind", "GraphQL", "Prisma"],
    metrics: ["99.99% Uptime", "HIPAA Compliant"],
    gradient: "from-emerald-500/20 to-teal-700/20",
  },
  {
    slug: "memory-universe",
    title: "Personal 'Memory Universe'",
    tagline: "Interactive 3D canvas for mapping thoughts and memories.",
    category: "Web Apps",
    tech: ["Three.js", "R3F", "Framer Motion", "Zustand"],
    metrics: ["60fps Mobile", "WebXR Ready"],
    gradient: "from-indigo-500/20 to-violet-700/20",
  },
];

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Cursor following logic
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    cursorX.set(mouseX);
    cursorY.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative h-[650px] w-full perspective cursor-none mb-20",
        index % 2 !== 0 && "md:mt-32" // Staggered effect
      )}
    >
      {/* Custom Section Cursor */}
      <motion.div
        className="absolute z-50 pointer-events-none flex items-center justify-center"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
      >
        <div className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-full shadow-[0_0_40px_rgba(0,240,255,0.6)]">
          Explore
        </div>
      </motion.div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 rounded-[4rem] overflow-hidden glass-card border-white/5 group-hover:border-primary/40 transition-all duration-700 shadow-2xl"
      >
        {/* Grain/Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Dynamic Light Flare */}
        <motion.div
          className="absolute -inset-px rounded-[4rem] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [x, y],
              ([xVal, yVal]) => {
                const posX = (xVal as number + 0.5) * 100;
                const posY = (yVal as number + 0.5) * 100;
                return `radial-gradient(800px circle at ${posX}% ${posY}%, rgba(0, 240, 255, 0.2), transparent 50%)`;
              }
            ),
          }}
        />

        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-1000`} />
        
        {/* Corner Accents */}
        <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-white/10 rounded-tl-2xl group-hover:border-primary/40 transition-colors" />
        <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-white/10 rounded-br-2xl group-hover:border-primary/40 transition-colors" />

        <div 
          style={{ transform: "translateZ(120px)" }}
          className="absolute inset-0 p-20 flex flex-col justify-end gap-12 pointer-events-none"
        >
          <div className="space-y-6 pointer-events-auto">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] uppercase tracking-[0.8em] font-mono text-primary font-black">{project.category}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.9] uppercase group-hover:translate-x-2 transition-transform duration-700">{project.title}</h3>
            <p className="text-muted-foreground/60 text-lg font-light leading-relaxed max-w-[85%] italic">{project.tagline}</p>
          </div>

          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex flex-wrap gap-3">
              {project.tech.slice(0, 3).map((t) => (
                <Badge key={t} variant="outline" className="border-white/10 bg-white/5 text-[10px] text-white/80 backdrop-blur-xl uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              {project.metrics.map(m => (
                <span key={m} className="text-[11px] font-mono text-secondary font-bold tracking-tighter">
                  <span className="text-primary/40 mr-2">/</span> {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const categories = ["All", "Web Apps", "E-commerce", "AI & Automation", "Real-time"];

export function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(projectsData);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects(projectsData);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest animate-pulse">Synchronizing with system archive...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-32">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {categories.map((cat) => (
          <Magnetic key={cat}>
            <button
              onClick={() => setFilter(cat)}
              className={cn(
                "px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 border",
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_50px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          </Magnetic>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
