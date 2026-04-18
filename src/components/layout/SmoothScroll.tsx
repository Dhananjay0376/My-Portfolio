"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            window.history.pushState(null, "", href);
          }
        } else if (href === "/" || href === "/#") {
          if (window.location.pathname === "/") {
            e.preventDefault();
            lenis.scrollTo(0, {
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            window.history.pushState(null, "", "/");
          }
        } else if (href && href.startsWith("/#")) {
          const hash = href.split("#")[1];
          if (window.location.pathname === "/") {
            e.preventDefault();
            const targetElement = document.getElementById(hash);
            if (targetElement) {
              lenis.scrollTo(targetElement, {
                offset: 0,
                duration: 1.5,
              });
              window.history.pushState(null, "", `#${hash}`);
            }
          }
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    
    // Handle initial hash on mount
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure everything is rendered
        setTimeout(() => {
          lenis.scrollTo(element, { immediate: true });
        }, 100);
      }
    }

    return () => {
      lenis.destroy();
      window.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
}
