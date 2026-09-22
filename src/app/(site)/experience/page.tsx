import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience — Nafisa Sadaf Fahima",
  description: "AI Prompt Specialist at Healthcare AI, MBBS clinical training and medical research work.",
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 pt-24 sm:pt-28">
      <Experience />
    </main>
  );
}
