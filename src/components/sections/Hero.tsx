"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, Download, FolderHeart, MapPin, Stethoscope, HeartPulse, Hospital, BrainCircuit, Dna } from "lucide-react";
import { profile, metrics } from "@/lib/cv-data";
import Magnetic from "../effects/Magnetic";
import EcgLine from "../effects/EcgLine";

function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index];
    const speed = deleting ? 32 : 58;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (!next) {
          setDeleting(false);
          setIndex((value) => (value + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return (
    <span className="text-gradient">
      {text}<span className="ml-1 inline-block h-[0.85em] w-[2px] animate-pulse bg-medblue" />
    </span>
  );
}

function useVitals() {
  const [bpm, setBpm] = useState(72);
  const [spo2, setSpo2] = useState(98);
  useEffect(() => {
    const timer = setInterval(() => {
      setBpm(70 + Math.floor(Math.random() * 6));
      setSpo2(97 + Math.floor(Math.random() * 3));
    }, 2200);
    return () => clearInterval(timer);
  }, []);
  return { bpm, spo2 };
}

export default function Hero() {
  const { bpm, spo2 } = useVitals();
  const trackDownload = () => {
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "cv_downloads" }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        {/* Journal masthead */}
        <div data-reveal className="flex items-center justify-between border-y border-[var(--card-border-strong)] py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <span>Healthcare AI · MBBS Final Year</span>
          <span className="hidden sm:block">Sirajganj, Bangladesh · 2026</span>
          <span className="inline-flex items-center gap-1.5 text-medteal"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-medteal" /> Accepting roles</span>
        </div>

        <div className="grid border-b border-[var(--card-border-strong)] lg:grid-cols-12">
          {/* Margin notes */}
          <aside data-reveal className="order-2 grid grid-cols-2 gap-5 border-t border-[var(--card-border)] py-6 text-xs sm:grid-cols-4 lg:order-1 lg:col-span-2 lg:grid-cols-1 lg:border-r lg:border-t-0 lg:py-10 lg:pr-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Issue</p>
              <p className="mt-1 font-bold">01 / Portfolio</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Specialty</p>
              <p className="mt-1 font-bold text-medblue">Medicine × AI</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Institution</p>
              <p className="mt-1 leading-relaxed font-bold">Shaheed Monsur Medical College</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Class</p>
              <p className="mt-1 font-bold">MBBS · 2026</p>
            </div>
          </aside>

          {/* Main cover */}
          <div className="relative order-1 py-10 lg:order-2 lg:col-span-7 lg:px-8 lg:py-14">
            <span data-reveal className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-medblue">
              <Stethoscope className="h-4 w-4" /> Cover story
            </span>
            <h1 data-reveal className="mt-5 text-[3.65rem] font-extrabold leading-[0.84] tracking-[-0.065em] sm:text-[6.5rem] xl:text-[8rem]">
              Nafisa<br />
              <span className="text-gradient-shimmer">Sadaf</span><br />
              Fahima
            </h1>
            <div data-reveal className="mt-7 max-w-xl border-l-2 border-vital pl-4">
              <p className="text-lg font-bold tracking-tight sm:text-xl"><RoleRotator roles={profile.roles} /></p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {profile.tagline} A final-year MBBS student turning clinical knowledge into smarter, safer, more structured AI systems.
              </p>
            </div>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <Link href="/projects" className="inline-flex items-center gap-2 bg-medblue px-5 py-3 text-sm font-bold text-white transition hover:shadow-[0_0_30px_var(--glow-blue)]">
                  <FolderHeart className="h-4 w-4" /> Read case studies <ArrowDownRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/cv" onClick={trackDownload} className="inline-flex items-center gap-2 border border-[var(--card-border-strong)] bg-[var(--card)] px-5 py-3 text-sm font-bold transition hover:border-medteal hover:text-medteal">
                  <Download className="h-4 w-4" /> Download CV
                </Link>
              </Magnetic>
            </div>
            <div data-reveal className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-medblue" /> {profile.shortLocation}</span>
              <span className="inline-flex items-center gap-1.5"><Hospital className="h-3.5 w-3.5 text-medteal" /> MBBS, class of 2026</span>
              <span className="inline-flex items-center gap-1.5"><BrainCircuit className="h-3.5 w-3.5 text-medblue" /> Healthcare AI</span>
            </div>
          </div>

          {/* Medical monitor */}
          <aside data-scale-in className="order-3 border-t border-[var(--card-border)] py-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:py-10 lg:pl-6">
            <div className="ecg-paper relative overflow-hidden border border-[var(--card-border-strong)] bg-[var(--card)] p-4">
              <div className="absolute inset-0 bg-[var(--card)]/50 backdrop-blur-sm" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted">Live Clinical Monitor</p>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-medteal" />
                </div>
                <EcgLine className="mt-5 h-20 w-full" color="#ef4444" strokeWidth={2.2} />
                <div className="mt-3 grid grid-cols-2 gap-px bg-[var(--card-border-strong)]">
                  <div className="bg-[var(--bg)] p-3">
                    <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted"><HeartPulse className="h-3 w-3 text-vital" /> Heart rate</p>
                    <p className="mt-1 text-2xl font-extrabold tabular-nums text-vital">{bpm}<span className="ml-1 text-[9px] text-muted">bpm</span></p>
                  </div>
                  <div className="bg-[var(--bg)] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted">SpO₂</p>
                    <p className="mt-1 text-2xl font-extrabold tabular-nums text-medblue">{spo2}<span className="ml-1 text-[9px] text-muted">%</span></p>
                  </div>
                </div>
                <div className="mt-4 border-t border-[var(--card-border-strong)] pt-3 font-mono text-[10px] text-muted">
                  <p className="text-medteal">STATUS: STABLE</p>
                  <p className="mt-1">MODE: PROMPT ENGINEERING</p>
                </div>
              </div>
            </div>
            <div data-parallax="0.12" className="mt-4 border-l-2 border-medteal bg-medteal/8 p-3 text-xs leading-relaxed text-muted">
              <Dna className="mb-2 h-4 w-4 text-medteal" />
              Building at the intersection of patient care, clinical evidence, and generative intelligence.
            </div>
          </aside>
        </div>

        {/* Editorial metrics */}
        <div data-reveal-group className="grid divide-x divide-[var(--card-border-strong)] border-b border-[var(--card-border-strong)] sm:grid-cols-4">
          {metrics.map((metric, i) => (
            <div key={metric.label} data-reveal className="p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">0{i + 1} · {metric.label}</p>
              <p className={`mt-1 text-3xl font-extrabold tracking-[-0.05em] ${i % 2 ? "text-medteal" : "text-medblue"}`}>
                {metric.value}<span className="text-lg">{metric.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <a href="#about" className="mx-auto mt-8 flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted transition hover:text-medblue">
        Begin reading <ArrowDownRight className="h-4 w-4" />
      </a>
    </section>
  );
}
