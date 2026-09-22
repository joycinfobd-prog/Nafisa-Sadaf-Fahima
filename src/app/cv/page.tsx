import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { profile, experience, education, skillCategories, certifications, reference } from "@/lib/cv-data";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: `${profile.name} — CV / Resume`,
  description: profile.summary,
  keywords: ["AI Prompt Specialist", "Healthcare AI", "MBBS", "Medical Education", "Portfolio", "CV"],
  openGraph: {
    title: `${profile.name} — CV`,
    description: profile.tagline,
    type: "article",
  },
};

export default function CvPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="no-print sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0a84d6]">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-10 print:px-0 print:py-0">
        <header className="border-b-2 border-slate-900 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-base font-medium text-slate-800">{profile.title}</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {profile.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {profile.phone}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {profile.shortLocation}</span>
          </div>
        </header>

        <Section title="Profile Summary">
          <p className="text-sm leading-relaxed text-slate-700">{profile.summary}</p>
        </Section>

        <Section title="Professional Experience">
          <div className="space-y-6">
            {experience.map((item) => (
              <div key={item.role + item.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-base">{item.role}</h3>
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{item.company}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.degree} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <h3 className="font-bold">{item.degree}</h3>
                  <p className="text-sm text-slate-600">{item.institution}</p>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{item.period}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Technical & Clinical Skills">
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.id} className="rounded-lg border border-slate-200 p-4">
                <h4 className="text-sm font-bold">{category.title}</h4>
                <p className="text-sm text-slate-600">{category.skills.map((skill) => skill.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Certifications & Professional Development">
          <ul className="grid gap-1.5 text-sm text-slate-700 sm:grid-cols-2">
            {certifications.map((item) => (
              <li key={item.name}>
                <span className="font-semibold">{item.name}</span> — {item.issuer} <span className="text-slate-500">({item.year})</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-6 sm:grid-cols-2">
          <Section title="Languages">
            <p className="text-sm text-slate-700">
              {profile.languages.map((language) => `${language.name} (${language.level})`).join(" · ")}
            </p>
          </Section>
          <Section title="Reference">
            <p className="text-sm font-bold">{reference.name}</p>
            <p className="text-sm text-slate-600">{reference.role}</p>
            <p className="mt-1 text-xs text-slate-500">Contact details available upon request.</p>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-2 border-b border-slate-900 pb-1 text-xs font-extrabold uppercase tracking-[0.25em] text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
