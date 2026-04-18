"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    slug: "building-ai-agents",
    title: "The Architecture of Reliable AI Agents",
    excerpt: "How to move past simple chat wrappers and build autonomous agents that actually execute complex workflows.",
    category: "AI & Automation",
    readTime: "8 min read",
    date: "April 18, 2026",
    gradient: "from-blue-600/20 to-purple-600/20",
  },
  {
    slug: "realtime-systems-scale",
    title: "Scaling Real-time WebSockets to 100k Users",
    excerpt: "Lessons learned from building a synchronized collaborative environment with zero perceived latency.",
    category: "Architecture",
    readTime: "12 min read",
    date: "March 02, 2026",
    gradient: "from-emerald-600/20 to-cyan-600/20",
  },
  {
    slug: "cinematic-web-design",
    title: "Vibe Coding: The Future of Web Design",
    excerpt: "Why flat design is dead and how to use 3D, physics, and shaders to create fan-making experiences.",
    category: "Frontend",
    readTime: "6 min read",
    date: "February 14, 2026",
    gradient: "from-rose-600/20 to-orange-600/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
};

export function InsightsGrid() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {insights.map((post) => (
        <motion.div key={post.slug} variants={itemVariants} className="group h-full">
          <Card className={`h-full flex flex-col border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:-translate-y-2`}>
            {/* Image Placeholder with Gradient */}
            <div className={`h-48 w-full bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              {/* Fake abstract geometric shapes for the thumbnail */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-black/50 backdrop-blur-md border-white/10 text-white">
                  {post.category}
                </Badge>
              </div>
            </div>

            <CardHeader className="flex-1 pb-4">
              <div className="flex items-center text-xs text-muted-foreground gap-4 mb-3">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {post.excerpt}
              </p>
            </CardContent>

            <CardFooter className="pt-4 border-t border-white/5 flex justify-between items-center">
              <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:text-primary group/btn">
                Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
