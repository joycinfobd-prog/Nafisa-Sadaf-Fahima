import Link from "next/link";
import { ArrowUp, HeartPulse } from "lucide-react";
import { navLinks, profile } from "@/lib/cv-data";
import EcgLine from "./effects/EcgLine";

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-6 sm:px-8 lg:px-12">
      <EcgLine className="h-10 w-full opacity-50" color="#0a84d6" strokeWidth={1.5} />
      <div className="mt-4 flex flex-col gap-6 border-t border-dashed border-[var(--card-border-strong)] pt-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-medblue to-medteal text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden><path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" /></svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">{profile.name}</p>
            <p className="text-[11px] text-muted">© {new Date().getFullYear()} · Crafted with <HeartPulse className="inline h-3 w-3 text-vital" /> care in {profile.shortLocation}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
          <Link href="/" className="text-muted transition hover:text-medblue">Home</Link>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted transition hover:text-medblue">
              {l.label}
            </Link>
          ))}
          <Link href="/cv" className="text-muted transition hover:text-medblue">CV / Resume</Link>
        </nav>

        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-xs font-semibold transition hover:border-medblue/60 hover:text-medblue"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </Link>
      </div>
    </footer>
  );
}
