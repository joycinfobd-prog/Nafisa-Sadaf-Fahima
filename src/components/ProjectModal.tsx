"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, CheckCircle2, BriefcaseMedical } from "lucide-react";
import type { Project } from "@/lib/cv-data";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lenis otherwise treats wheel/touch input over the dialog as page scrolling.
    // Pause it while the modal is open and use the dialog's native overflow instead.
    window.__lenis?.stop();

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project || typeof document === "undefined") return null;
  const teal = project.accent === "green";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden bg-black/65 backdrop-blur-sm animate-[fadeIn_0.25s_ease] sm:items-center sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        data-lenis-prevent
        className="glass-strong relative max-h-[92dvh] w-full max-w-2xl touch-pan-y overflow-y-auto overscroll-contain rounded-t-3xl border-t-2 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.6)] [scrollbar-gutter:stable] sm:max-h-[88dvh] sm:rounded-3xl"
        style={{ borderTopColor: teal ? "#12a58f" : "#0a84d6", WebkitOverflowScrolling: "touch" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="sticky right-4 top-4 z-20 float-right mr-4 mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-medblue"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative -mt-12 aspect-[16/9] w-full">
          <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 640px) 100vw, 640px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md">
            Case study
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${teal ? "text-medteal" : "text-medblue"}`}>{project.subtitle}</p>
          <h3 id="case-study-title" className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">{project.description}</p>

          {project.context && (
            <p className="mt-5 inline-flex items-center gap-2 border border-[var(--card-border-strong)] bg-[var(--card)] px-3 py-1.5 text-xs font-semibold">
              <BriefcaseMedical className={`h-3.5 w-3.5 ${teal ? "text-medteal" : "text-medblue"}`} /> Rooted in: {project.context}
            </p>
          )}

          {project.highlights.length > 0 && (
            <div className="mt-6 border-t border-dashed border-[var(--card-border-strong)] pt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-muted">Case highlights</p>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${teal ? "text-medteal" : "text-medblue"}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-dashed border-[var(--card-border-strong)] pt-5">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-[var(--card-border-strong)] px-2.5 py-1 text-[10px] font-semibold text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
