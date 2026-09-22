"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global scroll-driven reveal system, re-scanned on every route change so it
 * works across the multi-page site.
 * - [data-reveal]            → fade-up on enter
 * - [data-reveal-group]      → stagger direct children marked [data-reveal]
 * - [data-parallax="0.2"]    → subtle parallax on scroll
 * - [data-scale-in]          → scale from 0.92 to 1
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(":scope [data-reveal]"));
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: reduce ? 0 : 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
            onComplete: () => items.forEach((i) => i.classList.add("is-visible")),
          },
        );
        items.forEach((i) => i.setAttribute("data-grouped", "true"));
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-grouped])").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: reduce ? 0 : 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => el.classList.add("is-visible"),
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: reduce ? 1 : 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      if (!reduce) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.2");
          gsap.to(el, {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
