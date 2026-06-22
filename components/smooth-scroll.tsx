"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only load Lenis on desktop for better mobile performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
      // Skip smooth scroll on mobile for better performance
      return;
    }

    // Dynamically import Lenis only on desktop
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      let rafId: number;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    };

    // Defer smooth scroll init further on desktop
    const timeoutId = setTimeout(() => {
      initLenis();
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <>{children}</>;
}
