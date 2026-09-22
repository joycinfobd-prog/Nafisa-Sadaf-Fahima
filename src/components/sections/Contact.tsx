"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/cv-data";
import { GithubIcon, LinkedinIcon, XIcon } from "../BrandIcons";
import SectionHeader from "../SectionHeader";
import Magnetic from "../effects/Magnetic";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; id: number; emailSent: boolean }
  | { state: "error"; msg: string };

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      fetch("/api/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "email_copies" }) }).catch(() => {});
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const buildMailto = (data: Record<string, FormDataEntryValue>) => {
    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const subject = String(data.subject ?? "").trim();
    const message = String(data.message ?? "").trim();
    const mailSubject = subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`;
    const body = `Hello Nafisa,\n\n${message}\n\n—\nName: ${name}\nEmail: ${email}`;
    return `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const fallbackMailto = buildMailto(data);
    setStatus({ state: "loading" });

    const openMailFallback = () => {
      try {
        window.location.href = fallbackMailto;
      } catch {
        // If the browser blocks navigation, the direct email links still work.
      }
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) {
        openMailFallback();
        throw new Error(json?.error || "Opening your email app…");
      }
      const emailSent = Boolean(json.emailSent);
      setStatus({ state: "success", id: json.id ?? 0, emailSent });
      form.reset();
      // If no server email provider is configured, hand the message to the
      // visitor's mail app so a missing env var never blocks a real inquiry.
      if (!emailSent) openMailFallback();
    } catch (error) {
      setStatus({ state: "error", msg: error instanceof Error ? error.message : "Something went wrong." });
    }
  };

  const contacts = [
    { title: "Email", value: profile.email, Icon: Mail, action: copyEmail, actionLabel: copied ? "Copied" : "Copy" },
    { title: "Phone", value: profile.phone, Icon: Phone, href: `tel:${profile.phoneIntl}` },
    { title: "Location", value: profile.location, Icon: MapPin },
  ];
  const inputClass = "w-full border-b border-[var(--card-border-strong)] bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-medblue";

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeader
        index="06"
        eyebrow="Correspondence"
        title="Let&apos;s start a"
        highlight="useful conversation."
        description="Open to healthcare AI roles, research partnerships, prompt engineering and medical education projects."
      />

      <div className="grid border-y border-[var(--card-border-strong)] lg:grid-cols-12">
        {/* Editorial contact side */}
        <div data-reveal className="flex flex-col border-b border-[var(--card-border-strong)] py-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-12 lg:pr-10">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-medteal">Open correspondence</p>
          <h3 className="mt-4 text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] sm:text-6xl">
            Write<br />a <span className="text-gradient">better</span><br />future.
          </h3>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">Whether you&apos;re building a healthcare product, advancing medical education, or exploring a new AI workflow, I&apos;d love to hear the clinical problem behind it.</p>

          <div className="mt-9 divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
            {contacts.map(({ title, value, Icon, action, actionLabel, href }) => {
              const content = <>
                <span className="flex h-9 w-9 items-center justify-center bg-medblue/10 text-medblue"><Icon className="h-4 w-4" /></span>
                <span className="min-w-0 flex-1"><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted">{title}</span><span className="mt-1 block truncate text-sm font-bold">{value}</span></span>
                {actionLabel && <span className={`inline-flex items-center gap-1 text-xs font-bold ${copied ? "text-medteal" : "text-medblue"}`}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{actionLabel}</span>}
                {href && <ArrowUpRight className="h-4 w-4 text-medblue" />}
              </>;
              return action ? (
                <button type="button" key={title} onClick={action} className="flex w-full items-center gap-3 py-4 text-left transition hover:bg-medblue/[0.03]">{content}</button>
              ) : href ? (
                <a key={title} href={href} className="flex items-center gap-3 py-4 transition hover:bg-medblue/[0.03]">{content}</a>
              ) : <div key={title} className="flex items-center gap-3 py-4">{content}</div>;
            })}
          </div>

          <div className="mt-auto flex gap-2 pt-8">
            {[
              { name: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
              { name: "GitHub", href: profile.socials.github, Icon: GithubIcon },
              { name: "X", href: profile.socials.twitter, Icon: XIcon },
            ].map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="flex h-10 w-10 items-center justify-center border border-[var(--card-border-strong)] text-muted transition hover:border-medblue hover:text-medblue">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Correspondence form */}
        <form data-reveal onSubmit={onSubmit} className="p-0 lg:col-span-7 lg:pl-10">
          <div className="py-8 lg:py-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-medblue">Message form</p>
                <p className="mt-1 text-sm text-muted">All fields marked essential for a thoughtful reply.</p>
              </div>
              <Send className="h-5 w-5 text-medteal" />
            </div>

            <div className="mt-8 grid gap-x-6 sm:grid-cols-2">
              <label>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Your name *</span>
                <input name="name" required minLength={2} maxLength={120} placeholder="Full name" className={inputClass} />
              </label>
              <label className="mt-6 sm:mt-0">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Email address *</span>
                <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
              </label>
              <label className="mt-7 sm:col-span-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Subject / reason for writing</span>
                <input name="subject" maxLength={200} placeholder="Healthcare AI collaboration, research, hiring…" className={inputClass} />
              </label>
              <label className="mt-7 sm:col-span-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Your message *</span>
                <textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Share the opportunity, clinical problem, or idea you have in mind…" className={`${inputClass} resize-none`} />
              </label>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs text-xs leading-relaxed text-muted">Correspondence is securely stored and reviewed within 48 hours.</p>
              <Magnetic strength={0.2}>
                <button type="submit" disabled={status.state === "loading"} className="inline-flex items-center gap-2 bg-medblue px-5 py-3 text-sm font-bold text-white transition hover:shadow-[0_0_30px_var(--glow-blue)] disabled:opacity-60">
                  {status.state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status.state === "loading" ? "Sending…" : "Send correspondence"}
                </button>
              </Magnetic>
            </div>
            <div aria-live="polite" className="mt-5 min-h-[1.5rem]">
              {status.state === "success" && (
                <p className="inline-flex items-center gap-2 border border-medteal/30 bg-medteal/10 px-3 py-2 text-xs font-bold text-medteal">
                  <CheckCircle2 className="h-4 w-4" />
                  {status.emailSent
                    ? `Message #${status.id} sent straight to my inbox. Thank you!`
                    : `Message #${status.id} received and saved. Thank you!`}
                </p>
              )}
              {status.state === "error" && <p className="inline-flex items-center gap-2 border border-vital/30 bg-vital/10 px-3 py-2 text-xs font-bold text-vital"><AlertCircle className="h-4 w-4" /> {status.msg}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
