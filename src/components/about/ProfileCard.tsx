"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ProfileCard() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <GithubIcon className="w-5 h-5" />,
      href: "https://github.com/Dhananjay0376/",
      color: "hover:text-primary hover:bg-primary/10",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="w-5 h-5" />,
      href: "https://linkedin.com/in/dhananjay-narula-6519363a1/",
      color: "hover:text-primary hover:bg-primary/10",
    },
    {
      name: "X (Twitter)",
      icon: <XIcon className="w-5 h-5" />,
      href: "https://x.com/Dhananjay0376",
      color: "hover:text-primary hover:bg-primary/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <Card className="overflow-hidden glass-card border-border bg-card/60 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center p-8 gap-10">
          {/* Profile Image Container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-amber-300 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 bg-card flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dxw1yg7if/image/upload/v1772521159/photo_6116175361453264265_y_ka8fie.jpg"
                alt="Dhananjay Narula"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge variant="outline" className="glass-card text-sky-600 border-sky-500/30 bg-sky-500/10 dark:text-sky-300 px-4 py-1 rounded-full font-bold backdrop-blur-md shadow-sm">
                  Architect
                </Badge>
                <Badge variant="outline" className="glass-card text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-300 px-4 py-1 rounded-full font-bold backdrop-blur-md shadow-sm">
                  Solution Builder
                </Badge>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Dhananjay Narula
              </h2>
              
              <p className="glass-card p-5 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/50 border border-white/40 dark:border-sky-300/10 text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl shadow-sm">
                Specializing in high-performance digital ecosystems, blending <span className="text-primary font-bold">Immersive 3D experiences</span> with <span className="text-primary font-bold">AI-driven architecture</span> and robust scalable backends.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "w-12 h-12 rounded-full glass-card border-white/40 dark:border-sky-300/20 bg-white/50 dark:bg-[#0C1222]/60 text-foreground transition-all duration-500 group/btn shadow-md",
                    link.color
                  )}
                >
                  <div className="group-hover/btn:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
