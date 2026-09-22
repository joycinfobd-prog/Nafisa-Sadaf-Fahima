import type { Metadata } from "next";
import Education from "@/components/sections/Education";

export const metadata: Metadata = {
  title: "Education — Nafisa Sadaf Fahima",
  description: "MBBS at Shaheed Monsur Medical College, HSC and SSC academic record.",
};

export default function EducationPage() {
  return (
    <main className="relative z-10 pt-24 sm:pt-28">
      <Education />
    </main>
  );
}
