"use client";

import { useMagnetic } from "@/hooks/useMagnetic";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useMagnetic();
  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
