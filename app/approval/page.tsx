import { CheckCircle2, Landmark, ReceiptText } from "lucide-react";
import { AppShell } from "@/components/shell";
import { PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function ApprovalPage() {
  return (
    <AppShell>
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
                This screen reflects the successful demo state after validator compliance is checked.
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
              <p className="break-all font-semibold">0xmonad-agentpay-guardian</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
              <p className="text-sm text-slate-400">Control checks</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusPill ok label="A-Pass verified" />
                <StatusPill ok label="A-Token active" />
                <StatusPill ok label="Validator valid" />
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/audit">Open audit trail</PrimaryLink>
      </div>
    </AppShell>
  );
}
