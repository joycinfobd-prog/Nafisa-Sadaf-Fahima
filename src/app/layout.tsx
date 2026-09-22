import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/cv-data";

/* Variable font (no static weight array) → one small woff2 instead of six,
   which noticeably cuts first-paint time. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Dr.-to-be ${profile.name} — Final-Year MBBS & Healthcare AI Prompt Specialist`,
  description: profile.summary,
  keywords: ["AI Prompt Specialist", "Healthcare AI", "MBBS", "Medical Education", "Nafisa Sadaf Fahima"],
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.tagline,
    type: "website",
  },
};

const themeScript = `(function(){var r=document.documentElement;var d=true;try{var t=localStorage.getItem('theme');if(t)d=t==='dark';}catch(e){}r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
