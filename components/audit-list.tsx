"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  Filter,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { AuditEvent } from "@/lib/audit-store";
import { LoadingButton, StatusPill } from "@/components/ui";

const auditNav = [
  { label: "Dashboard", Icon: Activity },
  { label: "Agent Registry", Icon: Bot },
  { label: "Risk Engine", Icon: ShieldCheck },
  { label: "Transaction Log", Icon: Filter },
  { label: "Settings", Icon: Settings },
];

const auditMetrics = [
  { label: "Total Logs (24h)", value: "14,289", tone: "info" as const },
  { label: "Risk Events", value: "12", tone: "warning" as const },
  { label: "Compliance Failures", value: "0", tone: "success" as const },
];

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
    <div className="grid gap-5 xl:grid-cols-[16rem_1fr]">
      <aside className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric/10 text-electric">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-white">Audit Console</h2>
            <p className="text-xs text-slate-400">SOC2-ready trail</p>
          </div>
        </div>
        <nav className="space-y-2 text-sm">
          {auditNav.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 hover:bg-white/10"
            >
              <Icon className="h-4 w-4 text-electric" />
              {label}
            </div>
          ))}
        </nav>
      </aside>
      <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <StatusPill ok label="Live System Monitoring Active" />
            <StatusPill label="Audit Logs" tone="info" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Transparent Audit Logs</h2>
          <p className="mt-1 text-sm text-slate-400">
            Local demo log until a dedicated Cleanverse audit endpoint is available.
          </p>
        </div>
        <LoadingButton loading={loading} onClick={load}>
          Refresh
        </LoadingButton>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {auditMetrics.map(({ label, value, tone }) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-sm text-slate-400">{label}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <StatusPill label={tone === "success" ? "Healthy" : "Live"} tone={tone} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All Actions", "High Risk", "Compliance Failures"].map((label) => (
            <button
              key={label}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 text-sm text-slate-400 md:min-w-72">
          <Search className="h-4 w-4" />
          Search agent, hash, or action
        </div>
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
              <th className="px-4 py-3 font-medium">View</th>
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
                <td className="px-4 py-4">
                  <button className="rounded-md border border-white/10 px-3 py-1 text-xs text-slate-300 hover:bg-white/10">
                    Details
                  </button>
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
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Bell className="h-4 w-4" />
        Digital sovereignty secured. Audit data remains visible even when demo API calls are simulated.
      </div>
      </div>
    </div>
  );
}
