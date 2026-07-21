"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  gradient: string;
}

const staticInsights: Insight[] = [
  {
    slug: "building-ai-agents",
    title: "THE ARCHITECTURE OF RELIABLE AI AGENTS",
    excerpt: "How to move past simple chat wrappers and build autonomous agents that actually execute complex workflows.",
    category: "AI & Automation",
    readTime: "8 MIN READ",
    date: "APRIL 18, 2026",
    gradient: "from-sky-400/30 to-teal-400/20",
  },
  {
    slug: "realtime-systems-scale",
    title: "SCALING REAL-TIME WEBSOCKETS TO 100K",
    excerpt: "Lessons learned from building a synchronized collaborative environment with zero perceived latency.",
    category: "Architecture",
    readTime: "12 MIN READ",
    date: "MARCH 02, 2026",
    gradient: "from-emerald-300/30 to-sky-300/20",
  },
  {
    slug: "cinematic-web-design",
    title: "VIBE CODING: THE FUTURE OF WEB DESIGN",
    excerpt: "Why flat design is dead and how to use 3D, physics, and shaders to create fan-making experiences.",
    category: "Frontend",
    readTime: "6 MIN READ",
    date: "FEBRUARY 14, 2026",
    gradient: "from-amber-300/30 to-rose-300/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function InsightsGrid() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        if (!supabase) {
          setInsights(staticInsights);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setInsights(data);
        } else {
          setInsights(staticInsights);
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
        setInsights(staticInsights);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-[10px] font-mono tracking-[0.5em] text-muted-foreground uppercase">Decrypting Knowledge Nodes</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 px-4"
    >
      {insights.map((post, index) => (
        <Link 
          key={post.slug} 
          href={`/insights/${post.slug}`}
          className="contents"
        >
          <motion.div 
            variants={itemVariants} 
            className={cn(
              "group relative min-h-[600px] glass-card rounded-[3.5rem] border-border hover:border-primary/40 transition-all duration-700 overflow-hidden cursor-pointer flex flex-col shadow-lg",
              index % 3 === 1 && "lg:mt-32", // Staggered effect for 3-col
              index % 3 === 2 && "lg:mt-64"
            )}
          >
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${post.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="p-12 md:p-16 flex flex-col flex-1 gap-12">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="glass-card text-[10px] font-mono border-primary/30 uppercase tracking-[0.25em] text-primary px-5 py-2 rounded-full bg-white/50 dark:bg-[#0C1222]/60 backdrop-blur-md shadow-sm">
                  {post.category}
                </Badge>
                <div className="glass-card flex items-center gap-3 text-[10px] font-mono text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] px-4 py-2 rounded-full border-white/40 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md shadow-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  {post.readTime}
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-6">
                  <div className="w-16 h-[1px] bg-primary/40 group-hover:w-32 transition-all duration-700" />
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-foreground group-hover:text-primary transition-colors duration-500 uppercase break-words">
                    {post.title}
                  </h3>
                </div>
                <div className="glass-card p-5 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/50 border border-white/40 dark:border-sky-300/10">
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic text-base md:text-lg">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-12 border-t border-border flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="glass-card px-4 py-2 rounded-2xl border border-white/30 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md flex flex-col gap-1 shadow-sm">
                    <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-[0.3em]">Transmission</span>
                    <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-bold">{post.date}</span>
                  </div>
                  <div className="group/btn flex items-center gap-4">
                    <span className="text-[10px] font-mono text-primary/0 group-hover/btn:text-primary group-hover/btn:opacity-100 transition-all duration-500 uppercase tracking-[0.4em] translate-x-4 group-hover/btn:translate-x-0">Learn More</span>
                    <div className="w-16 h-16 rounded-full glass-card border border-white/40 dark:border-sky-300/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl group-hover:shadow-primary/30 group-hover:scale-110">
                      <ArrowRight className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract hover background */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
