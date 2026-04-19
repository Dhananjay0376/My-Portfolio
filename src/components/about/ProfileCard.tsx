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
      color: "hover:text-white hover:bg-zinc-800",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="w-5 h-5" />,
      href: "https://linkedin.com/in/dhananjay-narula-6519363a1/",
      color: "hover:text-white hover:bg-blue-600",
    },
    {
      name: "X (Twitter)",
      icon: <XIcon className="w-5 h-5" />,
      href: "https://x.com/Dhananjay0376",
      color: "hover:text-white hover:bg-zinc-800",
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
      <Card className="overflow-hidden border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center p-8 gap-10">
          {/* Profile Image Container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-zinc-800 bg-zinc-900 flex items-center justify-center">
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
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="outline" className="text-red-500 border-red-500/20 bg-red-500/10 px-3 py-0.5">
                  Architect
                </Badge>
                <Badge variant="outline" className="text-orange-500 border-orange-500/20 bg-orange-500/10 px-3 py-0.5">
                  Solution Builder
                </Badge>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Dhananjay Narula
              </h2>
              
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Specializing in high-performance digital ecosystems, blending <span className="text-white">Immersive 3D experiences</span> with <span className="text-white">AI-driven architecture</span> and robust scalable backends.
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
                    "w-12 h-12 rounded-full border-zinc-800 bg-zinc-900/80 transition-all duration-500 group/btn",
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
