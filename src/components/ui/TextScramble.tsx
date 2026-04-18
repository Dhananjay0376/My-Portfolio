"use client";

import { useEffect, useState, useCallback } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TextScramble({ text, duration = 1.5, className }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    const interval = setInterval(() => {
      const currentText = text
        .split("")
        .map((char, index) => {
          if (frame / totalFrames > index / text.length) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(currentText);
      frame++;

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return <span className={className}>{displayText}</span>;
}
