import {
  Stethoscope,
  BrainCircuit,
  Palette,
  Megaphone,
  FlaskConical,
  Languages,
  Plus,
  Check,
} from "lucide-react";
import { skillCategories, type SkillCategory } from "@/lib/cv-data";
import SectionHeader from "../SectionHeader";

const icons: Record<
  SkillCategory["icon"],
  React.ComponentType<{ className?: string }>
> = {
  stethoscope: Stethoscope,
  brain: BrainCircuit,
  palette: Palette,
  megaphone: Megaphone,
  flask: FlaskConical,
  languages: Languages,
};

function SkillAtlasCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = icons[category.icon];
  const blue = category.accent === "blue";
  const sizes = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
  ];

  return (
    <article
      data-reveal
      className={`spot-card glass group flex min-h-[235px] flex-col border-t-2 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${
        blue ? "border-t-medblue" : "border-t-medteal"
      } ${sizes[index]}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center ${
            blue ? "bg-medblue/12 text-medblue" : "bg-medteal/12 text-medteal"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="text-right">
          <p className="font-mono text-[10px] font-bold text-muted">
            SKILL AREA {String(index + 1).padStart(2, "0")}
          </p>
          <p
            className={`mt-1 text-lg font-extrabold ${
              blue ? "text-medblue" : "text-medteal"
            }`}
          >
            {String(category.skills.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3
          className={`${
            index === 0 || index === 5 ? "text-2xl" : "text-lg"
          } font-extrabold tracking-tight`}
        >
          {category.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {category.description}
        </p>
      </div>

      <ul className="mt-auto space-y-2.5 pt-6">
        {category.skills.map((skill) => (
          <li key={skill.name} className="flex items-center gap-2.5 text-[12px]">
            <Check
              className={`h-3.5 w-3.5 shrink-0 ${
                blue ? "text-medblue" : "text-medteal"
              }`}
              strokeWidth={3}
            />
            <span className="font-semibold">{skill.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <SectionHeader
        index="02"
        eyebrow="Skills"
        title="A hybrid"
        highlight="clinical skill set."
        description="Six connected disciplines, from the bedside and the lab to AI systems and visual health communication."
      />

      <div
        data-reveal
        className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-border-strong)] pb-4"
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Clinical, research, AI and communication skills
        </p>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-medteal">
          <Plus className="h-3.5 w-3.5" strokeWidth={3} /> 06 skill areas
        </p>
      </div>

      <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-4">
        {skillCategories.map((category, index) => (
          <SkillAtlasCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
