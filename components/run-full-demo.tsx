"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

export function RunFullDemoButton({ className = "" }: { className?: string }) {
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
      className={`inline-flex min-h-11 items-center gap-2 rounded bg-[#00f0ff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#00363a] shadow-[0_0_18px_rgba(0,240,255,0.24)] hover:bg-[#7df4ff] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      <PlayCircle className="h-4 w-4" />
      {loading ? "Running full demo..." : "Run Full Demo"}
    </button>
  );
}
