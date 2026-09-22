import { Activity, HeartPulse, Microscope, Thermometer, MapPin, Mail, Languages, Quote, ClipboardCheck } from "lucide-react";
import { profile, philosophy, focusStack } from "@/lib/cv-data";
import SectionHeader from "../SectionHeader";
import EcgLine from "../effects/EcgLine";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeader
        index="01"
        eyebrow="Doctor's Profile"
        title="Medicine meets"
        highlight="machine intelligence."
        description="A medical perspective on building responsible, clinically useful AI systems."
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Editorial story */}
        <article data-reveal className="lg:col-span-7">
          <p className="max-w-2xl text-[1.2rem] leading-[1.75] text-muted sm:text-[1.35rem]">
            <span className="float-left mr-3 mt-2 font-serif text-7xl font-bold leading-[0.65] text-medblue">N</span>
            {profile.summary.replace(/^MBBS final-year student/, "afisa is a final-year MBBS student")}
          </p>
          <EcgLine className="my-9 h-12 w-full opacity-75" color="#0a84d6" strokeWidth={1.6} />
          <div className="grid gap-6 border-t border-[var(--card-border-strong)] pt-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-medblue">Clinical orientation</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Every AI workflow begins with clinical accuracy: evidence, context, safety, then clarity. Technology should make medical knowledge easier to act on, never harder to trust.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-medteal">Current direction</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Designing prompt systems and health education content where structured reasoning, clear communication, and a human clinician always remain at the center.</p>
            </div>
          </div>
        </article>

        {/* Marginalia */}
        <aside data-reveal className="lg:col-span-5">
          <div className="border-y border-[var(--card-border-strong)] py-6 lg:border-t-0 lg:pt-0">
            <Quote className="h-7 w-7 text-medteal" />
            <blockquote className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              “The best healthcare AI feels less like software — and more like a thoughtful clinical colleague.”
            </blockquote>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">— Personal practice note, 2026</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-px bg-[var(--card-border-strong)]">
            {[
              ["Location", profile.shortLocation, MapPin],
              ["Institution", "Shaheed Monsur Medical College", ClipboardCheck],
              ["Languages", "Bengali · English · Hindi", Languages],
              ["Contact", profile.email, Mail],
            ].map(([label, value, Icon]) => {
              const ItemIcon = Icon as typeof MapPin;
              return (
                <div key={label as string} className="bg-[var(--bg)] p-4">
                  <ItemIcon className="h-4 w-4 text-medblue" />
                  <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted">{label as string}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed">{value as string}</p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Lower editorial modules */}
      <div data-reveal-group className="mt-14 grid gap-5 lg:grid-cols-12">
        <article data-reveal className="spot-card glass border-t-2 border-t-medblue p-6 sm:p-7 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-medblue/12 text-medblue"><HeartPulse className="h-5 w-5" /></span>
              <h3 className="text-lg font-extrabold tracking-tight">Practice principles</h3>
            </div>
            <span className="rx-mark text-3xl text-medblue/50">Rx</span>
          </div>
          <ol className="mt-6 space-y-5">
            {philosophy.map((item, i) => (
              <li key={item.step} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="font-mono text-xs font-bold text-medblue">0{i + 1}</span>
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article data-reveal className="spot-card glass border-t-2 border-t-medteal p-6 sm:p-7 lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-medteal/12 text-medteal"><Microscope className="h-5 w-5" /></span>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">Instruments in daily use</h3>
              <p className="text-xs text-muted">A practical stack for medical AI, communication and visual education.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {focusStack.map((tool, i) => (
              <span key={tool} className={`border px-3 py-2 text-xs font-semibold ${i % 3 === 0 ? "border-medblue/30 bg-medblue/8 text-medblue" : i % 3 === 1 ? "border-medteal/30 bg-medteal/8 text-medteal" : "border-[var(--card-border-strong)]"}`}>
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-7 grid gap-4 border-t border-dashed border-[var(--card-border-strong)] pt-5 sm:grid-cols-2">
            <div className="flex gap-3"><Activity className="h-5 w-5 shrink-0 text-vital" /><p className="text-sm text-muted"><strong className="block text-[var(--fg)]">Clinical rigor</strong>Evidence-based outputs, always reviewed through a medical lens.</p></div>
            <div className="flex gap-3"><Thermometer className="h-5 w-5 shrink-0 text-medteal" /><p className="text-sm text-muted"><strong className="block text-[var(--fg)]">Human-in-the-loop</strong>AI accelerates work; clinical judgement remains the authority.</p></div>
          </div>
        </article>
      </div>
    </section>
  );
}
