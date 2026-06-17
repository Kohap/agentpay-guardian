import {
  Bot,
  FileCheck2,
  Landmark,
  ListChecks,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import {
  ApiLabel,
  PageHeader,
  Panel,
  PrimaryLink,
  StatusPill,
} from "@/components/ui";
import {
  cleanverseIntegrations,
  demoAgent,
} from "@/lib/demo-data";
import { RunFullDemoButton } from "@/components/run-full-demo";

const steps = [
  ["Start Demo", "Launch the compliance flow for PayBot Alpha."],
  ["Verify Agent", "Bind builder identity and wallet through A-Pass."],
  ["Request Payment", "Create the payment intent before checks run."],
  ["Run Compliance Check", "Evaluate A-Token rules, limits, AML risk, and validator status."],
  ["Authorize Payment", "Approve only after each control passes."],
  ["View Audit Trail", "Show every decision in a transparent local log."],
];

const features = [
  {
    title: "Verified Agent Identity",
    detail: "A-Pass binds the builder, agent ID, and wallet before funds can move.",
    Icon: FileCheck2,
  },
  {
    title: "Compliance-Native Payments",
    detail:
      "A-Token rules and validator checks decide whether the agent is allowed to pay.",
    Icon: ListChecks,
  },
  {
    title: "Transparent Audit Logs",
    detail:
      "Every verification, request, rule check, and simulated Monad record is visible.",
    Icon: ReceiptText,
  },
];

export default function Home() {
  return (
    <AppShell>
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <PageHeader
            eyebrow="Hackathon demo"
            title="AgentPay Guardian"
            description="AgentPay Guardian protects AI agent payments with verified identity, compliance checks, and transparent audit trails."
          />
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href="/verification">Start Compliance Demo</PrimaryLink>
            <RunFullDemoButton />
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
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Status</p>
                <div className="mt-2">
                  <StatusPill ok label="Verified" />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Risk Level</p>
                <div className="mt-2">
                  <StatusPill ok label={demoAgent.riskLevel} />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">A-Pass</p>
                <div className="mt-2">
                  <StatusPill ok label="Active" />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">A-Token Permission</p>
                <div className="mt-2">
                  <StatusPill ok label="Valid" />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <Landmark className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Transaction Limit</p>
                <p className="font-semibold">${demoAgent.transactionLimit}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Demo Request</p>
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
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map(({ title, detail, Icon }) => (
          <Panel key={title}>
            <Icon className="mb-4 h-6 w-6 text-electric" />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
          </Panel>
        ))}
      </section>
      <section className="mt-10">
        <Panel>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Cleanverse API Integration
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The demo labels each integration honestly so judges can see what
              is live, simulated, or pending.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {cleanverseIntegrations.map(([name, detail, status]) => (
              <div key={name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-semibold text-white">{name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                  {detail}
                </p>
                <ApiLabel label={status} />
              </div>
            ))}
          </div>
        </Panel>
      </section>
      <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold text-white">
          Why AgentPay Guardian Matters
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          AI agents are becoming financial actors. Without identity,
          authorization, compliance checks, and audit trails, autonomous payments
          can create fraud and regulatory risk. AgentPay Guardian provides the
          trust layer needed for safe AI agent finance.
        </p>
      </section>
    </AppShell>
  );
}
