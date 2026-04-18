"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, Loader2, Code, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Magnetic } from "@/components/ui/magnetic";

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[550px] w-full perspective cursor-none"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 rounded-[3rem] overflow-hidden glass-card border-white/5 group-hover:border-primary/30 transition-all duration-700 shadow-2xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 p-8">
          <Magnetic>
            <Link href={`/projects/${project.slug}`}>
              <div className="w-14 h-14 rounded-full glass border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/40">
                <ArrowUpRight className="w-7 h-7" />
              </div>
            </Link>
          </Magnetic>
        </div>

        <div 
          style={{ transform: "translateZ(100px)" }}
          className="absolute inset-0 p-16 flex flex-col justify-end gap-10 pointer-events-none"
        >
          <div className="space-y-4 pointer-events-auto">
            <span className="text-[0.6rem] uppercase tracking-[0.5em] font-mono text-primary/80 font-bold">{project.category}</span>
            <h3 className="text-4xl font-black tracking-widest text-white leading-none uppercase">{project.title}</h3>
            <p className="text-muted-foreground/50 text-base font-light leading-relaxed max-w-[90%] italic">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {project.tech.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline" className="border-white/5 bg-white/5 text-[10px] text-white/60 backdrop-blur-md uppercase tracking-widest px-3 py-1">
                {t}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-1 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.metrics.map(m => (
              <span key={m} className="text-[10px] font-mono text-secondary/80">▸ {m}</span>
            ))}
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
    <div className="w-full space-y-20">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((cat) => (
          <Magnetic key={cat}>
            <button
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          </Magnetic>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
