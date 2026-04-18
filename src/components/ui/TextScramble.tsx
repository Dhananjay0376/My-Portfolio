"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TextScramble({ text, duration = 1.5, className }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
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
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000 / 60);
  }, [text, duration]);

  useEffect(() => {
    scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble]);

  return <span className={className}>{displayText}</span>;
}
