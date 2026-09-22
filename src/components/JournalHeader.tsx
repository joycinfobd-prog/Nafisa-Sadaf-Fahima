"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, HeartPulse, CalendarCheck, ArrowUpRight, Home } from "lucide-react";
import { navLinks, profile } from "@/lib/cv-data";
import ThemeToggle from "./ThemeToggle";

function CrossLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
    </svg>
  );
}

const allLinks = [{ href: "/", label: "Home" }, ...navLinks];

export default function JournalHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBpm(70 + Math.floor(Math.random() * 6)), 2300);
    return () => clearInterval(t);
  }, []);

  // Skills is the most common first destination, so prefetch it immediately.
  // The remaining static routes warm in idle time without blocking the home UI.
  useEffect(() => {
    if (pathname !== "/skills") router.prefetch("/skills");
    const warmRoutes = () => {
      allLinks
        .filter((link) => link.href !== pathname && link.href !== "/skills")
        .forEach((link) => router.prefetch(link.href));
    };
    const idle = window.requestIdleCallback?.(warmRoutes, { timeout: 800 }) ?? window.setTimeout(warmRoutes, 120);
    return () => {
      if ("cancelIdleCallback" in window && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, [pathname, router]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled || pathname !== "/"
              ? "rounded-2xl border-[var(--card-border-strong)] bg-[var(--bg)]/85 shadow-[0_14px_45px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-medblue text-white transition group-hover:rotate-90 group-hover:bg-medteal">
              <CrossLogo />
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg)] bg-vital" />
            </span>
            <span className="leading-none">
              <span className="block text-sm font-extrabold tracking-tight">{profile.name}</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-medteal">Healthcare AI · MBBS Final Year</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {allLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                onMouseEnter={() => router.prefetch(link.href)}
                onFocus={() => router.prefetch(link.href)}
                className={`relative px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive(link.href) ? "text-medblue" : "text-muted hover:text-[var(--fg)]"
                }`}
              >
                {link.href !== "/" && <span className="mr-1 font-mono text-[9px] opacity-50">0{i}</span>}
                {link.label}
                {isActive(link.href) && <span className="absolute bottom-0 left-3 right-3 h-px bg-medblue" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-md border border-vital/20 bg-vital/8 px-2 py-1 font-mono text-[10px] font-bold text-vital sm:inline-flex">
              <HeartPulse className="h-3 w-3 animate-heartbeat" /> {bpm} bpm
            </span>
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-lg bg-medblue px-3 py-2 text-xs font-bold text-white transition hover:bg-medblue-dark hover:shadow-[0_0_22px_var(--glow-blue)] sm:inline-flex"
            >
              <CalendarCheck className="h-3.5 w-3.5" /> Consultation
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border-strong)] lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[var(--bg)]/97 px-5 pb-8 pt-24 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">Contents</p>
        <ul className="border-y border-[var(--card-border-strong)]">
          {allLinks.map((link, i) => (
            <li key={link.href} className="border-b border-[var(--card-border)] last:border-b-0">
              <Link
                href={link.href}
                prefetch
                onMouseEnter={() => router.prefetch(link.href)}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-4 text-lg font-bold ${
                  isActive(link.href) ? "text-medblue" : ""
                }`}
              >
                <span>
                  <span className="mr-3 font-mono text-xs text-muted">{String(i).padStart(2, "0")}</span>
                  {link.label}
                </span>
                {link.href === "/" ? <Home className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" onClick={() => setOpen(false)} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-medblue py-3.5 text-sm font-bold text-white">
          <CalendarCheck className="h-4 w-4" /> Book a Consultation
        </Link>
      </div>
    </>
  );
}
