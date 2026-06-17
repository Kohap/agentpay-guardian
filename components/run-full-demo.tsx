"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

export function RunFullDemoButton() {
  const [loading, setLoading] = useState(false);

  async function runFullDemo() {
    setLoading(true);
    try {
      const response = await fetch("/api/demo/run-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (Array.isArray(json.events)) {
        window.localStorage.setItem(
          "agentpay_guardian_audit_events",
          JSON.stringify(json.events)
        );
      }
      window.location.href = "/audit";
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={runFullDemo}
      disabled={loading}
      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-emerald-300/50 bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <PlayCircle className="h-4 w-4" />
      {loading ? "Running full demo..." : "Run Full Demo"}
    </button>
  );
}
