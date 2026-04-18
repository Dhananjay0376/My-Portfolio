"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "I don't just code. I build solutions that make clients say ";
const highlightText = '"this changes everything."';

export function TypingHeadline() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, text.length * 50 + 500); // Rough estimate for typing completion
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="z-10 text-center flex flex-col items-center gap-6 px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl leading-tight">
        {text.split("").map((char, index) => (
          <motion.span
            key={`char-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: index * 0.05,
              ease: "easeIn",
            }}
          >
            {char}
          </motion.span>
        ))}
        {isTypingComplete && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block drop-shadow-[0_0_15px_rgba(180,100,255,0.5)]"
          >
            {highlightText}
          </motion.span>
        )}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
        className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium"
      >
        Full-stack solution builder &bull; Real-time systems &bull; AI-powered tools &bull; E-commerce that actually sells
      </motion.p>
    </div>
  );
}
