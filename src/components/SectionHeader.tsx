import { Plus } from "lucide-react";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  compact?: boolean;
};

export default function SectionHeader({ index, eyebrow, title, highlight, description, compact = false }: Props) {
  return (
    <header className={`grid gap-5 ${compact ? "mb-8" : "mb-12 sm:mb-16"} border-t-2 border-[var(--fg)] pt-4 md:grid-cols-12 md:gap-8`}>
      <div className="md:col-span-3">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-medteal">
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-medblue text-[11px] text-white"><Plus className="h-3 w-3" strokeWidth={3} /></span>
          Chapter {index}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      </div>
      <div className="md:col-span-6">
        <h2 data-reveal className="text-3xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </div>
      {description && (
        <div className="self-end border-l border-medblue/40 pl-4 md:col-span-3">
          <p data-reveal className="text-sm leading-relaxed text-muted">{description}</p>
        </div>
      )}
    </header>
  );
}
