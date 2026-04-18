"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, User, Cpu, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 100);
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -60% 0%",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Sync URL hash with active section
          const targetHash = entry.target.id === "hero" ? "/" : `#${entry.target.id}`;
          if (window.location.hash !== (targetHash.startsWith("#") ? targetHash : "")) {
            window.history.replaceState(null, "", targetHash);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["hero", "about", "expertise", "projects", "insights", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "About", href: "#about", id: "about", icon: <User className="w-4 h-4" /> },
    { name: "Skills", href: "#expertise", id: "expertise", icon: <Cpu className="w-4 h-4" /> },
    { name: "Works", href: "#projects", id: "projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Connect", href: "#contact", id: "contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 rounded-full transition-all duration-700",
          scrolled ? "glass-card px-8 py-4 scale-100" : "bg-transparent scale-110"
        )}
      >
        <Link href="/">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative group overflow-hidden",
            activeSection === "hero" 
              ? "bg-primary text-primary-foreground shadow-[0_0_30px_rgba(0,240,255,0.4)]" 
              : "bg-white/5 text-muted-foreground/60 hover:text-white"
          )}>
            <Home className="w-5 h-5 z-10" />
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" 
            />
          </div>
        </Link>

        <div className="h-4 w-px bg-white/10 mx-3" />

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="relative group">
              <div className={cn(
                "px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3",
                activeSection === item.id 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground/60 hover:text-white"
              )}>
                <span className="hidden lg:inline">{item.name}</span>
                <span>{item.icon}</span>
              </div>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 border border-primary/20 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
