"use client";

import { useEffect } from "react";

/** Records a profile view once per browser session. */
export default function ViewTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("viewed")) return;
      sessionStorage.setItem("viewed", "1");
    } catch {}
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "profile_views" }),
      keepalive: true,
    }).catch(() => {});
  }, []);
  return null;
}
