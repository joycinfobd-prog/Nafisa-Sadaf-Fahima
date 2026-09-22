import { Check, BriefcaseMedical, Stethoscope, Microscope, ArrowDownRight } from "lucide-react";
import { experience } from "@/lib/cv-data";
import SectionHeader from "../SectionHeader";

const roleIcons = [BriefcaseMedical, Stethoscope, Microscope];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="03"
          eyebrow="Case History"
          title="A chronology of"
          highlight="care & craft."
          description="Clinical training, AI workflow design and independent medical research — recorded as a living trajectory."
        />

        <div data-reveal className="relative mt-3">
          {/* Desktop chronology rail */}
          <div className="absolute left-[8.333%] right-[8.333%] top-[18px] hidden h-px bg-gradient-to-r from-medblue via-medteal to-medblue/20 lg:block" />
          <ol className="grid gap-5 lg:grid-cols-3 lg:gap-8">
            {experience.map((item, index) => {
              const Icon = roleIcons[index];
              const teal = item.accent === "green";
              return (
                <li key={item.role} className="relative pt-0 lg:pt-0">
                  <div className="relative z-10 mb-5 flex items-center gap-3 lg:block">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--bg)] text-white ${teal ? "bg-medteal shadow-[0_0_20px_var(--glow-green)]" : "bg-medblue shadow-[0_0_20px_var(--glow-blue)]"}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="lg:mt-4">
                      <p className={`font-mono text-sm font-bold ${teal ? "text-medteal" : "text-medblue"}`}>{item.period}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Entry 0{index + 1} · {item.type}</p>
                    </div>
                  </div>

                  <article className="spot-card glass flex h-[calc(100%-4.4rem)] flex-col border-t-2 border-t-transparent p-6 transition-transform duration-500 hover:-translate-y-1" style={{ borderTopColor: teal ? "#12a58f" : "#0a84d6" }}>
                    <p className={`mb-2 text-xs font-bold uppercase tracking-[0.16em] ${teal ? "text-medteal" : "text-medblue"}`}>{item.company}</p>
                    <h3 className="text-xl font-extrabold leading-tight tracking-tight">{item.role}</h3>
                    <ul className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${teal ? "text-medteal" : "text-medblue"}`} strokeWidth={3} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {item.tags.map((tag) => (
                        <span key={tag} className="border border-[var(--card-border-strong)] px-2 py-1 text-[10px] font-semibold text-muted">{tag}</span>
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <div data-reveal className="mt-8 flex items-center justify-between border-t border-[var(--card-border-strong)] pt-4 text-xs text-muted">
          <span className="font-mono">2020 — PRESENT</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-medblue">Next case: healthcare innovation <ArrowDownRight className="h-4 w-4" /></span>
        </div>
      </div>
    </section>
  );
}
