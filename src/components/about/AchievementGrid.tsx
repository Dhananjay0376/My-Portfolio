"use client";

import { motion } from "framer-motion";
import { Award, Trophy, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    title: "Global Hackathon Winner",
    org: "TechFest 2024",
    type: "Hackathon",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    description: "Built an AI-powered logistics optimizer that reduced waste by 30%.",
    date: "March 2024",
    tags: ["AI", "Next.js", "Python"],
  },
  {
    title: "AWS Certified Architect",
    org: "Amazon Web Services",
    type: "Certification",
    icon: <Award className="w-5 h-5 text-blue-500" />,
    description: "Validation of expertise in designing distributed systems and cloud infrastructure.",
    date: "Jan 2024",
    tags: ["Cloud", "DevOps"],
  },
  {
    title: "Top 1% React Developer",
    org: "DevRank",
    type: "Award",
    icon: <Award className="w-5 h-5 text-purple-500" />,
    description: "Recognized for contributions to high-performance open-source frontend frameworks.",
    date: "Dec 2023",
    tags: ["Frontend", "Performance"],
  },
  {
    title: "Master in Systems Design",
    org: "Academic Excellence",
    type: "Education",
    icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
    description: "Deep dive into microservices, data consistency, and low-latency architecture.",
    date: "Ongoing",
    tags: ["Backend", "Scale"],
  },
];

export function AchievementGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h3 className="text-3xl font-bold tracking-tight text-white">Milestones & Recognition</h3>
        <p className="text-zinc-400 max-w-2xl">Validating the journey through technical excellence, competitive wins, and professional credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="h-full border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-6 flex flex-col justify-between group cursor-default hover:border-zinc-700/50 transition-colors">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider opacity-60 font-mono">
                    {item.type}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium">{item.org} • {item.date}</p>
                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
