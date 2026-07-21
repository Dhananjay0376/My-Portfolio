"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-primary/10" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme mode"
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all duration-300 group overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform group-hover:scale-110" />
        )}
      </motion.div>
    </button>
  );
}
