"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Gavel,
  HelpCircle,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import type { AuditEvent } from "@/lib/audit-store";

const auditNav = [
  { label: "Dashboard", href: "/", Icon: Activity },
  { label: "Agent Registry", href: "/verification", Icon: Bot },
  { label: "Risk Engine", href: "/compliance", Icon: Gavel },
  { label: "Transaction Log", href: "/audit", Icon: FileText, active: true },
  { label: "Admin Panel", href: "/approval", Icon: Settings },
];

function statusClass(status: AuditEvent["status"]) {
  if (status === "success") {
    return "border-[#00dbe9]/25 bg-[#00dbe9]/10 text-[#00dbe9]";
  }
  if (status === "pending") {
    return "border-[#b9c7e0]/25 bg-[#b9c7e0]/10 text-[#b9c7e0]";
  }
  if (status === "warning") {
    return "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]";
  }
  if (status === "error") {
    return "border-[#ffb4ab]/30 bg-[#ffb4ab]/10 text-[#ffb4ab]";
  }
  return "border-[#00dbe9]/20 bg-[#00dbe9]/10 text-[#dbfcff]";
}

function statusLabel(status: AuditEvent["status"]) {
  if (status === "success") return "Success";
  if (status === "pending") return "Pending";
  if (status === "warning") return "Review";
  if (status === "error") return "Failed";
  return "Logged";
}

function eventHash(event: AuditEvent) {
  const seed = event.id.replace(/-/g, "").padEnd(16, "0");
  return `0x${seed.slice(0, 4)}...${seed.slice(-4)}`;
}

function formatUtc(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function sourceLabel(source: AuditEvent["source"]) {
  return source === "cleanverse" ? "Real API" : "Demo Mock";
}

export function AuditList() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingAudit, setCreatingAudit] = useState(false);

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

  async function startComplianceAudit() {
    setCreatingAudit(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: "Compliance audit started",
          detail:
            "Manual compliance audit opened from the Audit Console sidebar.",
          status: "info",
        }),
      });
      const json = (await response.json()) as { event?: AuditEvent };

      if (json.event) {
        setEvents((currentEvents) => {
          const nextEvents = [json.event!, ...currentEvents];
          window.localStorage.setItem(
            "agentpay_guardian_audit_events",
            JSON.stringify(nextEvents)
          );
          return nextEvents;
        });
      }
    } finally {
      setCreatingAudit(false);
    }
  }

  function scrollToPanel(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const riskEvents = useMemo(
    () =>
      events.filter(
        (event) => event.status === "warning" || event.status === "error"
      ).length,
    [events]
  );
  const failures = useMemo(
    () => events.filter((event) => event.status === "error").length,
    [events]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[17.5rem_1fr]">
      <aside className="rounded-lg border border-[#3b494b] bg-[#122131] p-4">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded border border-[#00dbe9]/30 bg-[#00dbe9]/10 text-[#00dbe9]">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-[#dbfcff]">Audit Console</h2>
            <p className="text-xs text-[#b9cacb]">Digital sovereignty trail</p>
          </div>
        </div>

        <nav className="space-y-2">
          {auditNav.map(({ label, href, Icon, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-[#3f465c] text-[#adb4ce]"
                  : "text-[#b9cacb] hover:bg-[#273647] hover:text-[#d4e4fa]"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${active ? "text-[#00dbe9]" : "text-[#849495]"}`}
              />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-[#3b494b] pt-4">
          <button
            onClick={startComplianceAudit}
            disabled={creatingAudit}
            className="mb-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded bg-[#00f0ff] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {creatingAudit ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {creatingAudit ? "Starting Audit" : "New Compliance Audit"}
          </button>
          <div className="space-y-2 text-sm text-[#b9cacb]">
            <button
              onClick={() => scrollToPanel("system-status")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#273647]"
            >
              <Activity className="h-4 w-4 text-[#849495]" />
              System Status
            </button>
            <button
              onClick={() => scrollToPanel("audit-help")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#273647]"
            >
              <HelpCircle className="h-4 w-4 text-[#849495]" />
              Help Center
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-5">
        <section
          id="system-status"
          className="relative scroll-mt-24 overflow-hidden rounded-lg border border-[#3b494b] bg-[#0d1c2d] p-6 md:p-8"
        >
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,240,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(0,240,255,0.18),transparent_24rem)]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#00dbe9]">
                <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.9)]" />
                Live System Monitoring Active
              </p>
              <h1 className="text-4xl font-bold tracking-normal text-[#d4e4fa]">
                Audit Trail
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#b9cacb]">
                Local demo log until a dedicated Cleanverse audit endpoint is
                available. Events still persist through the demo flow and show
                what is live, simulated, and pending integration.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Total Logs (24h)", "14,289", "text-[#00dbe9]"],
                ["Risk Events", String(riskEvents || 12), "text-[#ffb4ab]"],
                ["Failures", String(failures), "text-emerald-300"],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="min-w-32 rounded border border-[#3b494b] bg-[#122131] p-4"
                >
                  <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                    {label}
                  </p>
                  <p className={`text-2xl font-semibold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex min-h-10 items-center gap-2 rounded border border-[#3b494b] bg-[#122131] px-4 py-2 text-sm text-[#d4e4fa] hover:border-[#00dbe9]">
              <Filter className="h-4 w-4" />
              All Actions
            </button>
            {["High Risk", "Compliance Failures"].map((label) => (
              <label
                key={label}
                className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded border border-[#3b494b] bg-[#122131] px-4 py-2 text-sm text-[#ffb4ab] hover:bg-[#273647]"
              >
                <span className="h-4 w-4 rounded-sm border border-[#849495] bg-[#0d1c2d]" />
                {label}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex min-h-10 items-center gap-2 border-b border-[#3b494b] bg-[#122131] px-3 text-sm text-[#b9cacb] sm:min-w-72">
              <Search className="h-4 w-4" />
              Search Agent ID or Hash...
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded border border-[#00dbe9]/40 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00dbe9] hover:bg-[#00dbe9]/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-[#3b494b] bg-[#122131]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#3b494b] bg-[#1c2b3c]">
                  {[
                    "Agent ID",
                    "Timestamp (UTC)",
                    "Action",
                    "Hash / TxID",
                    "Status",
                    "Source",
                    "Details",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3b494b] font-mono text-[13px] text-[#d4e4fa]">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="group transition-colors hover:bg-[#273647]/55"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-[#b9c7e0]" />
                        PayBot Alpha
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[#b9cacb]">
                      {formatUtc(event.timestamp)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-sm">
                        <p>{event.label}</p>
                        <p className="mt-1 font-sans text-xs leading-5 text-[#b9cacb]">
                          {event.detail}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[#b9cacb]">
                      {eventHash(event)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${statusClass(event.status)}`}
                      >
                        {statusLabel(event.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                          event.source === "cleanverse"
                            ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                            : "border border-[#b9c7e0]/20 bg-[#b9c7e0]/10 text-[#b9c7e0]"
                        }`}
                      >
                        {sourceLabel(event.source)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#00dbe9] opacity-100 hover:text-[#00f0ff] md:opacity-0 md:group-hover:opacity-100">
                        View
                        <TerminalSquare className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#3b494b] bg-[#1c2b3c] px-4 py-3 text-sm text-[#b9cacb] sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing 1-{Math.max(events.length, 1)} of 14,289 audit records
            </span>
            <div className="flex gap-2">
              <button className="rounded p-1 text-[#849495] opacity-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="rounded p-1 text-[#b9cacb] hover:bg-[#273647] hover:text-[#00dbe9]">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="audit-help" className="grid scroll-mt-24 gap-3 md:grid-cols-3">
          {[
            ["Audit Log", "Demo Mock"],
            ["Monad Transaction", "Simulated Record"],
            ["Cleanverse Audit Endpoint", "Pending API Integration"],
          ].map(([label, status]) => (
            <div
              key={label}
              className="rounded border border-[#3b494b] bg-[#122131] p-4"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                {label}
              </p>
              <p className="mt-2 font-semibold text-[#d4e4fa]">{status}</p>
            </div>
          ))}
        </section>

        <footer className="flex flex-col gap-3 border-t border-[#3b494b] pt-4 text-sm text-[#b9cacb] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold text-[#d4e4fa]">
            <Bell className="h-4 w-4 text-[#00dbe9]" />
            Digital Sovereignty Secured.
          </div>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>SOC2 Compliance</span>
            <span className="text-[#00dbe9] underline">Audit Logs</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
