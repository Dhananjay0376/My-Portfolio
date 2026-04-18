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
            // Update URL hash without jumping
            window.history.pushState(null, "", href);
          }
        } else if (href && href.startsWith("/#")) {
          // Handle cases like /#about when on the home page
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
