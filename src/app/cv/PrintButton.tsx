"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-[#0a84d6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(10,132,214,0.35)] transition hover:bg-[#0568ad]"
    >
      <Printer className="h-4 w-4" /> Save as PDF
    </button>
  );
}
