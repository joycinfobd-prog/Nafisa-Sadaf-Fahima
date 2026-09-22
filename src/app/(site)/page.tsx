import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollReveal from "@/components/effects/ScrollReveal";
import CursorGlow from "@/components/effects/CursorGlow";
import ViewTracker from "@/components/ViewTracker";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function HomePage() {
  return (
    <SmoothScroll>
      <CursorGlow />
      <ScrollReveal />
      <ViewTracker />
      <main className="relative z-10">
        <Hero />
        <About />
      </main>
    </SmoothScroll>
  );
}
