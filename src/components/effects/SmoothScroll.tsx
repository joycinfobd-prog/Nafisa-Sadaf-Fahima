"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Home-page-only smooth scrolling. Keeping GSAP + Lenis off secondary pages
 * makes route navigation (for example Home → Skills) near-instant.
 */
export default function SmoothScroll({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothWheel: !reduce,
      touchMultiplier: 1.2,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Keep smooth scroll only for same-page #hash links; route links are left
    // untouched so Next.js can switch pages immediately.
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const element = document.querySelector<HTMLElement>(id);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element, { offset: -88, duration: 0.65 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
