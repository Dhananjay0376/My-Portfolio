"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const projectsData = [
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

const categories = ["All", "Web Apps", "E-commerce", "AI & Automation", "Real-time"];

export function ProjectGrid() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projectsData.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="group perspective"
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="h-full bg-black/40 border-white/5 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,240,255,0.2)] preserve-3d group-hover:rotate-x-2 group-hover:rotate-y-[-2deg]">
                  <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    {/* Abstract placeholder */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded border border-white/20 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                  </div>
                  
                  <CardContent className="pt-6 relative z-10 bg-black/40">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{project.tagline}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(t => (
                        <Badge key={t} variant="outline" className="border-white/10 bg-white/5 text-xs text-white/80">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 bg-black/40 border-t border-white/5 mt-auto flex items-center justify-between">
                    <div className="flex flex-col gap-1 mt-4">
                      {project.metrics.map(m => (
                        <span key={m} className="text-xs font-semibold text-secondary">✓ {m}</span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
