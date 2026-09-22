"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, FileText, ArrowDownRight, BadgeCheck } from "lucide-react";
import { projects, type Project } from "@/lib/cv-data";
import SectionHeader from "../SectionHeader";
import ProjectModal from "../ProjectModal";

function ViewStudyButton({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="inline-flex items-center gap-1.5 bg-medblue px-3.5 py-2 text-xs font-bold text-white transition hover:shadow-[0_0_26px_var(--glow-blue)]"
    >
      <FileText className="h-3.5 w-3.5" /> View case study
    </button>
  );
}

function MiniCase({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const ref = useRef<HTMLElement>(null);
  const teal = project.accent === "green";
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = ref.current;
    if (!card || e.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  };
  return (
    <article
      ref={ref}
      data-reveal
      onPointerMove={onMove}
      onPointerLeave={() => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"; }}
      className="spot-card glass grid overflow-hidden transition-transform duration-300 md:grid-cols-5"
    >
      <div className="relative aspect-[16/9] md:col-span-2 md:aspect-auto">
        <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        <span className="absolute left-3 top-3 bg-black/55 px-2 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md">CASE 0{index + 1}</span>
      </div>
      <div className="flex flex-col p-5 md:col-span-3 sm:p-6">
        <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${teal ? "text-medteal" : "text-medblue"}`}>{project.subtitle}</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => <span key={tag} className="border border-[var(--card-border-strong)] px-2 py-1 text-[10px] font-semibold text-muted">{tag}</span>)}
        </div>
        <div className="mt-5"><ViewStudyButton project={project} onOpen={onOpen} /></div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const lead = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeader
        index="04"
        eyebrow="Case Studies"
        title="Selected work in"
        highlight="clinical intelligence."
        description="AI systems, clinical workflows and visual health media — presented as concise studies, not just project cards."
      />

      {/* Lead case study */}
      <article data-reveal className="spot-card glass grid overflow-hidden border-t-2 border-t-medblue lg:grid-cols-12">
        <div className="relative min-h-[300px] lg:col-span-7 lg:min-h-[530px]">
          <Image src={lead.image} alt={`${lead.title} preview`} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">Lead case · 01</p>
              <p className="mt-1 text-sm font-bold">Medical education / Prompt system</p>
            </div>
            <Star className="h-5 w-5 fill-medteal text-medteal" />
          </div>
        </div>
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="flex items-center justify-between">
            <FileText className="h-5 w-5 text-medblue" />
            <span className="font-mono text-[10px] font-bold text-muted">01 / 03</span>
          </div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-medblue">{lead.subtitle}</p>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.04em]">{lead.title}</h3>
          <p className="mt-5 text-sm leading-relaxed text-muted">{lead.description}</p>
          <div className="mt-6 border-y border-dashed border-[var(--card-border-strong)] py-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-muted">Protocol / Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lead.tags.map((tag) => <span key={tag} className="border border-medblue/25 bg-medblue/8 px-2.5 py-1 text-[10px] font-bold text-medblue">{tag}</span>)}
            </div>
          </div>
          <div className="mt-auto pt-7"><ViewStudyButton project={lead} onOpen={setActive} /></div>
        </div>
      </article>

      {/* Supporting studies */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pt-16">
          <p data-reveal className="max-w-sm text-2xl font-extrabold leading-tight tracking-tight">
            Every project starts with a question worth diagnosing.
          </p>
          <p data-reveal className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted">
            <BadgeCheck className="h-4 w-4 text-medteal" /> Each case study is grounded in verified CV records
          </p>
        </div>
        <div className="space-y-6 lg:col-span-7">
          {rest.map((project, index) => <MiniCase key={project.title} project={project} index={index + 1} onOpen={setActive} />)}
        </div>
      </div>
      <p data-reveal className="mt-8 flex items-center gap-2 border-t border-[var(--card-border-strong)] pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
        <ArrowDownRight className="h-4 w-4 text-medteal" /> End of selected cases · further work available on request
      </p>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
