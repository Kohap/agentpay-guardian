"use client";

import { useEffect, useState } from "react";
import { ReceiptText } from "lucide-react";
import type { AuditEvent } from "@/lib/audit-store";
import { demoAgent } from "@/lib/demo-data";
import { StatusPill } from "@/components/ui";

function chooseEvents(serverEvents: AuditEvent[]) {
  const browserEvents = window.localStorage.getItem(
    "agentpay_guardian_audit_events"
  );
  const parsedBrowserEvents = browserEvents
    ? (JSON.parse(browserEvents) as AuditEvent[])
    : [];
  const shouldUseBrowserEvents =
    parsedBrowserEvents.length > serverEvents.length ||
    parsedBrowserEvents.some((event) => event.label === "Payment authorized");

  return shouldUseBrowserEvents ? parsedBrowserEvents : serverEvents;
}

export function ReceiptCard({
  initialApprovalTimestamp,
}: {
  initialApprovalTimestamp?: string;
}) {
  const [approvalEvent, setApprovalEvent] = useState<AuditEvent | null>(
    initialApprovalTimestamp
      ? {
          id: "receipt-cookie",
          label: "Payment authorized",
          detail: "Payment request met identity, token, amount, and validator checks.",
          status: "success",
          timestamp: initialApprovalTimestamp,
          source: "demo",
        }
      : null
  );

  useEffect(() => {
    async function loadReceipt() {
      const response = await fetch("/api/audit", { cache: "no-store" });
      const json = await response.json();
      const events = chooseEvents(json.events as AuditEvent[]);
      const event = events.find((item) => item.label === "Payment authorized");
      if (event) {
        setApprovalEvent(event);
      }
    }

    loadReceipt();
  }, []);

  const receiptRows = [
    ["Agent name", demoAgent.agentName],
    ["Recipient", demoAgent.merchant],
    ["Amount", `${demoAgent.amount} ${demoAgent.currency}`],
    ["Purpose", demoAgent.purpose],
    ["Compliance result", approvalEvent ? "Passed" : "Pending"],
    ["A-Token authorization", approvalEvent ? "Valid" : "Pending"],
    ["Monad transaction hash", approvalEvent ? demoAgent.transactionHash : "Pending approval"],
    [
      "Timestamp",
      approvalEvent
        ? new Date(approvalEvent.timestamp).toLocaleString()
        : "Run approval or full demo first",
    ],
    ["Final status", approvalEvent ? "Payment Authorized" : "Awaiting Approval"],
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric/10 text-electric">
            <ReceiptText className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {demoAgent.agentName}
            </h2>
            <p className="text-sm text-slate-400">{demoAgent.agentId}</p>
          </div>
        </div>
        <StatusPill
          ok={Boolean(approvalEvent)}
          label={
            approvalEvent ? "Final status: Authorized" : "Final status: Pending"
          }
          tone={approvalEvent ? "success" : "warning"}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {receiptRows.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 break-words font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
