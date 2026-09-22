"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { isDark, subscribeTheme, toggleDark } from "@/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => true);

  return (
    <button
      type="button"
      onClick={toggleDark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border-strong)] text-[var(--fg)] transition hover:border-medblue/60 hover:text-medblue hover:shadow-[0_0_20px_var(--glow-blue)] ${className}`}
    >
      <Sun className={`absolute h-4 w-4 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
    </button>
  );
}
