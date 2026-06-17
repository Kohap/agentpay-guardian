import { CheckCircle2, Landmark, ReceiptText } from "lucide-react";
import { AppShell } from "@/components/shell";
import { PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { complianceChecklist, demoAgent } from "@/lib/demo-data";

export default function ApprovalPage() {
  return (
    <AppShell currentStep={4}>
      <PageHeader
        eyebrow="Step 4"
        title="Payment Approval"
        description="Once identity, A-Token, and validator checks pass, the demo displays an approval packet and simulated Monad transaction record."
      />
      <Panel>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex h-full flex-col justify-between rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-5">
            <CheckCircle2 className="h-10 w-10 text-emerald-300" />
            <div>
              <h2 className="mt-8 text-2xl font-semibold text-white">Authorized</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-100">
                AgentPay Guardian approved this transaction after identity,
                rule, and risk checks.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <Landmark className="mb-3 h-5 w-5 text-electric" />
              <p className="text-sm text-slate-400">Amount</p>
              <p className="font-semibold">{demoAgent.amount} {demoAgent.currency}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <ReceiptText className="mb-3 h-5 w-5 text-electric" />
              <p className="text-sm text-slate-400">Transaction</p>
              <p className="break-all font-semibold">{demoAgent.transactionHash}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
              <p className="text-sm text-slate-400">Control checks</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusPill ok label="A-Pass verified" />
                <StatusPill ok label="A-Token active" />
                <StatusPill ok label="Validator valid" />
                <StatusPill ok label="Amount within limit" />
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <section className="mt-6">
        <Panel>
          <h2 className="text-xl font-semibold text-white">
            Final Approval Checklist
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {complianceChecklist.map(([label, status]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <span className="text-sm text-slate-200">{label}</span>
                <StatusPill ok label={status} />
              </div>
            ))}
          </div>
        </Panel>
      </section>
      <div className="mt-6">
        <PrimaryLink href="/receipt">View transaction receipt</PrimaryLink>
      </div>
    </AppShell>
  );
}
