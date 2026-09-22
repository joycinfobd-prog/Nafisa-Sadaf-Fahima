import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Nafisa Sadaf Fahima",
  description: "Book a consultation or send a message about healthcare AI roles and collaborations.",
};

export default function ContactPage() {
  return (
    <main className="relative z-10 pt-24 sm:pt-28">
      <Contact />
    </main>
  );
}
