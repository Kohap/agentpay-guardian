"use client";

import { useEffect, useState } from "react";
import type { AuditEvent } from "@/lib/audit-store";
import { LoadingButton } from "@/components/ui";

function statusClass(status: AuditEvent["status"]) {
  if (status === "success") return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
  if (status === "warning") return "border-amber-400/40 bg-amber-400/10 text-amber-200";
  if (status === "error") return "border-rose-400/40 bg-rose-400/10 text-rose-200";
  return "border-sky-400/40 bg-sky-400/10 text-sky-200";
}

export function AuditList() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/audit", { cache: "no-store" });
    const json = await response.json();
    setEvents(json.events);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Local Demo Audit Events</h2>
        <LoadingButton loading={loading} onClick={load}>
          Refresh
        </LoadingButton>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <article key={event.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-semibold text-white">{event.label}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">{event.detail}</p>
              </div>
              <span className={`rounded-md border px-3 py-1 text-xs font-medium ${statusClass(event.status)}`}>
                {event.source}
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {new Date(event.timestamp).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
