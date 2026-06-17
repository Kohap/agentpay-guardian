import { Bot, FileCheck2, Landmark, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/shell";
import { PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

const steps = [
  ["AI Agent Payment Request", "PayBot Alpha asks to spend from a controlled wallet."],
  ["A-Pass Identity Verification", "The builder identity and wallet are bound through Cleanverse."],
  ["A-Token Rule Check", "The demo reads A-Token rules and paused status."],
  ["Validator Compliance", "The wallet is verified against the payment contract."],
  ["Payment Approval", "A transaction record is simulated and written to local audit logs."],
];

export default function Home() {
  return (
    <AppShell>
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <PageHeader
            eyebrow="Hackathon demo"
            title="AgentPay Guardian"
            description="A compliance-first payment console for AI agents that need identity verification, token authorization, validator checks, and a complete audit story before moving funds."
          />
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href="/verification">Start verification</PrimaryLink>
            <StatusPill ok label="Server-side Cleanverse routes" />
          </div>
        </div>
        <Panel>
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric/10 text-electric">
                <Bot className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{demoAgent.agentName}</h2>
                <p className="text-sm text-slate-400">{demoAgent.agentId}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <FileCheck2 className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Builder</p>
                <p className="font-semibold">{demoAgent.builderName}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Chain</p>
                <p className="font-semibold">Monad</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <Landmark className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Request</p>
                <p className="font-semibold">{demoAgent.amount} {demoAgent.currency}</p>
              </div>
            </div>
          </div>
        </Panel>
      </section>
      <section className="mt-10 grid gap-3 md:grid-cols-5">
        {steps.map(([title, detail], index) => (
          <div key={title} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-3 text-sm font-semibold text-electric">0{index + 1}</p>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
