import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, string, number][] = [
    ["/", "Home — Healthcare AI portfolio", 1],
    ["/skills", "Skills — Clinical, AI and communication competencies", 0.8],
    ["/experience", "Experience — AI Prompt Specialist and clinical training", 0.8],
    ["/projects", "Case studies — Healthcare AI and medical education", 0.8],
    ["/education", "Education — MBBS, HSC and SSC record", 0.8],
    ["/contact", "Contact — Book a consultation", 0.8],
    ["/cv", "CV — Printable résumé", 0.9],
  ];

  return routes.map(([path, description, priority]) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
