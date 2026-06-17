"use client";

import { useEffect, useState } from "react";
import type { AuditEvent } from "@/lib/audit-store";
import { LoadingButton, StatusPill } from "@/components/ui";

function statusClass(status: AuditEvent["status"]) {
  if (status === "success") return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
  if (status === "pending") return "border-amber-400/40 bg-amber-400/10 text-amber-200";
  if (status === "warning") return "border-amber-400/40 bg-amber-400/10 text-amber-200";
  if (status === "error") return "border-rose-400/40 bg-rose-400/10 text-rose-200";
  return "border-sky-400/40 bg-sky-400/10 text-sky-200";
}

function statusLabel(status: AuditEvent["status"]) {
  if (status === "success") return "Success";
  if (status === "pending") return "Pending";
  if (status === "warning") return "Review";
  if (status === "error") return "Failed";
  return "Logged";
}

export function AuditList() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/audit", { cache: "no-store" });
    const json = await response.json();
    const browserEvents = window.localStorage.getItem(
      "agentpay_guardian_audit_events"
    );
    const parsedBrowserEvents = browserEvents
      ? (JSON.parse(browserEvents) as AuditEvent[])
      : [];
    const serverEvents = json.events as AuditEvent[];
    const shouldUseBrowserEvents =
      parsedBrowserEvents.length > serverEvents.length ||
      parsedBrowserEvents.some((event) => event.label === "Payment authorized");

    setEvents(shouldUseBrowserEvents ? parsedBrowserEvents : serverEvents);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Transparent Audit Logs</h2>
          <p className="mt-1 text-sm text-slate-400">
            Local demo log until a dedicated Cleanverse audit endpoint is available.
          </p>
        </div>
        <LoadingButton loading={loading} onClick={load}>
          Refresh
        </LoadingButton>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Details</th>
              <th className="px-4 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-white/10">
                <td className="whitespace-nowrap px-4 py-4 text-slate-300">
                  {new Date(event.timestamp).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-4 font-semibold text-white">{event.label}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-md border px-3 py-1 text-xs font-medium ${statusClass(event.status)}`}>
                    {statusLabel(event.status)}
                  </span>
                </td>
                <td className="max-w-xl px-4 py-4 leading-6 text-slate-300">
                  {event.detail}
                </td>
                <td className="px-4 py-4">
                  <StatusPill
                    label={event.source === "cleanverse" ? "Real API" : "Demo Mock"}
                    tone={event.source === "cleanverse" ? "success" : "info"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Audit Log", "Demo Mock"],
          ["Monad Transaction", "Simulated Record"],
          ["Cleanverse Audit Endpoint", "Pending API Integration"],
        ].map(([label, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 font-semibold text-white">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
