import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Case Studies — Nafisa Sadaf Fahima",
  description: "Selected healthcare AI and medical education case studies.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 pt-24 sm:pt-28">
      <Projects />
    </main>
  );
}
