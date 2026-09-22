import type { ReactNode } from "react";
import MeshBackground from "@/components/effects/MeshBackground";
import JournalHeader from "@/components/JournalHeader";
import Footer from "@/components/Footer";

/**
 * Lightweight shared shell for every route. Heavy interactive effects live on
 * the home page only, allowing secondary pages to open immediately.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MeshBackground />
      <JournalHeader />
      {children}
      <Footer />
    </>
  );
}
