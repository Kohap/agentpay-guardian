import { ReceiptText } from "lucide-react";
import { AppShell } from "@/components/shell";
import { PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";
import { findLatestAuditEvent } from "@/lib/audit-store";

export const dynamic = "force-dynamic";

export default async function ReceiptPage() {
  const approvalEvent = await findLatestAuditEvent("Payment authorized");
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
    <AppShell currentStep={4}>
      <PageHeader
        eyebrow="Transaction receipt"
        title="Professional Payment Receipt"
        description="A complete approval record for the agent payment, including compliance result, A-Token authorization, and simulated Monad transaction hash."
      />
      <Panel>
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
            label={approvalEvent ? "Final status: Authorized" : "Final status: Pending"}
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
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/audit">View audit trail</PrimaryLink>
      </div>
    </AppShell>
  );
}
