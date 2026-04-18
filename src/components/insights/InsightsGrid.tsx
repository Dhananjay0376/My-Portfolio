"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
    gradient: "from-blue-600/20 to-purple-600/20",
  },
  {
    slug: "realtime-systems-scale",
    title: "SCALING REAL-TIME WEBSOCKETS TO 100K",
    excerpt: "Lessons learned from building a synchronized collaborative environment with zero perceived latency.",
    category: "Architecture",
    readTime: "12 MIN READ",
    date: "MARCH 02, 2026",
    gradient: "from-emerald-600/20 to-cyan-600/20",
  },
  {
    slug: "cinematic-web-design",
    title: "VIBE CODING: THE FUTURE OF WEB DESIGN",
    excerpt: "Why flat design is dead and how to use 3D, physics, and shaders to create fan-making experiences.",
    category: "Frontend",
    readTime: "6 MIN READ",
    date: "FEBRUARY 14, 2026",
    gradient: "from-rose-600/20 to-orange-600/20",
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
        <p className="text-[10px] font-mono tracking-[0.5em] text-muted-foreground/40 uppercase">Decrypting Knowledge Nodes</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {insights.map((post) => (
        <motion.div 
          key={post.slug} 
          variants={itemVariants} 
          className="group relative h-[500px] glass-card rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all duration-700 overflow-hidden"
        >
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          <div className="p-12 flex flex-col h-full gap-8">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="text-[10px] font-mono border-white/10 uppercase tracking-widest text-primary/60">
                {post.category}
              </Badge>
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/30">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-black tracking-tighter leading-[1.1] text-white group-hover:text-primary transition-colors duration-500">
                {post.title}
              </h3>
              <p className="text-muted-foreground/50 font-light leading-relaxed italic text-sm">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground/20">{post.date}</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Abstract hover background */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
      ))}
    </motion.div>
  );
}
