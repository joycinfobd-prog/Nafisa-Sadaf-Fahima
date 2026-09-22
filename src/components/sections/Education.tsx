import { GraduationCap, Award, BadgeCheck, UserCheck, CheckCircle2 } from "lucide-react";
import { education, certifications, reference } from "@/lib/cv-data";
import SectionHeader from "../SectionHeader";

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeader
        index="05"
        eyebrow="Academic Record"
        title="Credentials for"
        highlight="a clinical future."
        description="A formal medical foundation, supported by continuous independent training in technology and communication."
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Transcript */}
        <article data-reveal className="border border-[var(--card-border-strong)] bg-[var(--card)] p-5 sm:p-7 lg:col-span-8">
          <div className="flex flex-col gap-4 border-b-2 border-[var(--fg)] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-medblue/30 bg-medblue/10 text-medblue"><GraduationCap className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Official learning record</p>
                <h3 className="text-xl font-extrabold tracking-tight">Academic Transcript</h3>
              </div>
            </div>
            <span className="w-fit border border-medteal/30 bg-medteal/10 px-2.5 py-1 font-mono text-[10px] font-bold text-medteal">RECORD VERIFIED</span>
          </div>

          <div className="mt-2 overflow-x-auto" data-lenis-prevent>
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-[var(--card-border-strong)] font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
                  <th className="py-4 pr-4">Program / Qualification</th>
                  <th className="px-4 py-4">Institution</th>
                  <th className="px-4 py-4">Period</th>
                  <th className="py-4 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {education.map((item, index) => (
                  <tr key={item.degree} className="border-b border-[var(--card-border)] last:border-b-0">
                    <td className="py-5 pr-4 align-top">
                      <p className="text-sm font-bold">{item.degree}</p>
                      <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">{item.detail}</p>
                    </td>
                    <td className="px-4 py-5 align-top text-xs font-semibold text-medblue">{item.institution}</td>
                    <td className="px-4 py-5 align-top font-mono text-xs font-bold text-muted">{item.period}</td>
                    <td className="py-5 pl-4 text-right align-top">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${index === 0 ? "text-medteal" : "text-muted"}`}>
                        {index === 0 && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-medteal" />}{item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[var(--card-border-strong)] pt-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Registrar&apos;s note: final-year candidate in good academic standing</p>
            <span className="text-xs font-semibold text-medblue">Record No. NSF / 2026</span>
          </div>
        </article>

        {/* Side notes */}
        <aside className="space-y-6 lg:col-span-4">
          <div data-reveal className="border-l-2 border-medteal bg-medteal/7 p-5">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-medteal" /><p className="text-xs font-bold uppercase tracking-[0.16em]">Continuing education</p></div>
            <p className="mt-3 text-sm leading-relaxed text-muted">Focused professional development alongside clinical training — in prompt engineering, healthcare AI, animation and digital communication.</p>
          </div>
          <article data-reveal className="border border-[var(--card-border-strong)] p-5">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-muted"><BadgeCheck className="h-4 w-4 text-medteal" /> Training log</p>
            <ul className="space-y-4">
              {certifications.map((certificate) => (
                <li key={certificate.name} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-medteal" />
                  <div className="flex-1">
                    <p className="text-xs font-bold leading-snug">{certificate.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{certificate.issuer}</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted">{certificate.year}</span>
                </li>
              ))}
            </ul>
          </article>
          <article data-reveal className="bg-medblue p-5 text-white">
            <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/65"><UserCheck className="h-4 w-4" /> Reference</p>
            <p className="mt-4 text-lg font-extrabold">{reference.name}</p>
            <p className="text-sm text-white/75">{reference.role}</p>
            <p className="mt-4 border-t border-white/20 pt-3 text-xs text-white/65">Professional contact details available upon request.</p>
          </article>
        </aside>
      </div>
    </section>
  );
}
