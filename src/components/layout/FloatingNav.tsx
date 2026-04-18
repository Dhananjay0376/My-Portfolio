"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { Home, User, Cpu, Briefcase, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 100);
  });

  const navItems = [
    { name: "About", href: "#about", icon: <User className="w-4 h-4" /> },
    { name: "Skills", href: "#expertise", icon: <Cpu className="w-4 h-4" /> },
    { name: "Works", href: "#projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Connect", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 rounded-full transition-all duration-500",
          scrolled ? "glass-card px-6 py-3" : "bg-transparent"
        )}
      >
        <Link href="/">
          <Magnetic>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.5)]">
              <Home className="w-5 h-5" />
            </div>
          </Magnetic>
        </Link>

        <div className="h-4 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Magnetic>
                <div className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="hidden md:inline">{item.name}</span>
                  <span className="md:hidden">{item.icon}</span>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all group-hover:w-4" />
                </div>
              </Magnetic>
            </Link>
          ))}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
