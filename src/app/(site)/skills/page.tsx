import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills — Nafisa Sadaf Fahima",
  description: "Clinical, AI prompt engineering, research, creative and communication competencies.",
};

export default function SkillsPage() {
  return (
    <main className="relative z-10 pt-24 sm:pt-28">
      <Skills />
    </main>
  );
}
