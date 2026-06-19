import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Bot,
  CheckCircle2,
  FileCheck2,
  Gauge,
  Landmark,
  ListChecks,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { RunFullDemoButton } from "@/components/run-full-demo";
import {
  ApiLabel,
  PageHeader,
  Panel,
  PrimaryLink,
  StatusPill,
} from "@/components/ui";
import {
  cleanverseIntegrations,
  complianceChecklist,
  demoAgent,
} from "@/lib/demo-data";

const agentStats = [
  { label: "Status", value: "Verified", tone: "success" as const },
  { label: "Risk Level", value: demoAgent.riskLevel, tone: "success" as const },
  { label: "A-Pass", value: "Active", tone: "success" as const },
  { label: "A-Token Permission", value: "Valid", tone: "success" as const },
];

const pipeline = [
  "Agent Verification",
  "Payment Request",
  "Compliance Check",
  "Approval",
  "Audit Trail",
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
    <AppShell currentStep={1}>
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <PageHeader
            eyebrow="Compliance command center"
            title="AgentPay Guardian"
            description="AgentPay Guardian protects AI agent payments with verified identity, compliance checks, and transparent audit trails."
          />
          <div className="flex flex-wrap gap-3">
            <RunFullDemoButton />
            <PrimaryLink href="/audit">View Audit Trail</PrimaryLink>
            <StatusPill label="Demo mode active" tone="warning" />
          </div>
        </div>
        <Panel>
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-electric/30 bg-electric/10 text-electric">
                  <Bot className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {demoAgent.agentName}
                  </h2>
                  <p className="text-sm text-slate-400">{demoAgent.agentId}</p>
                </div>
              </div>
              <StatusPill ok label="Low Risk" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <Wallet className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Current payment request</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  {demoAgent.amount} {demoAgent.currency}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  to {demoAgent.merchant}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <Gauge className="mb-3 h-5 w-5 text-electric" />
                <p className="text-sm text-slate-400">Transaction Limit</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  ${demoAgent.transactionLimit}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  enforced before approval
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {agentStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <div className="mt-2">
                    <StatusPill label={item.value} tone={item.tone} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
          {pipeline.map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div className="flex min-h-16 flex-1 items-center gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-300 text-xs font-bold text-ink">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-white">{step}</span>
              </div>
              {index < pipeline.length - 1 && (
                <span className="hidden text-slate-500 md:block">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[0.92fr_1.26fr_0.82fr]">
        <Panel>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Agent Profile
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Identity, wallet, and transaction controls.
              </p>
            </div>
            <ShieldCheck className="h-6 w-6 text-electric" />
          </div>
          <div className="space-y-3">
            {[
              ["Builder", demoAgent.builderName],
              ["Wallet", demoAgent.walletAddress],
              ["Chain", "Monad"],
              ["Purpose", demoAgent.purpose],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 break-words text-sm font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Compliance Checklist
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Payment approval stays blocked until every control passes.
              </p>
            </div>
            <StatusPill ok label="All checks passed" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {complianceChecklist.map(([label, status]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-sm font-medium text-white">{label}</span>
                </div>
                <StatusPill ok label={status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Cleanverse API Integration
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Clear labels show what is live, simulated, or pending.
            </p>
          </div>
          <div className="space-y-3">
            {cleanverseIntegrations.map(([name, detail, status]) => (
              <div
                key={name}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{name}</h3>
                  <BadgeCheck className="h-4 w-4 text-electric" />
                </div>
                <p className="mb-3 text-sm leading-6 text-slate-400">{detail}</p>
                <ApiLabel label={status} />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-5">
          <div className="flex items-start justify-between gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-200" />
            <StatusPill label="Before compliance" tone="warning" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            Payment Blocked
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-100">
            Agent must complete A-Pass verification and compliance checks before
            payment.
          </p>
        </div>
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-5">
          <div className="flex items-start justify-between gap-4">
            <Landmark className="h-8 w-8 text-emerald-200" />
            <StatusPill ok label="After compliance" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            Payment Authorized
          </h2>
          <p className="mt-2 text-sm leading-6 text-emerald-100">
            AgentPay Guardian approved this transaction after identity, rule,
            and risk checks.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map(({ title, detail, Icon }) => (
          <Panel key={title}>
            <Icon className="mb-4 h-6 w-6 text-electric" />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
          </Panel>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold text-white">
          Why AgentPay Guardian Matters
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          AI agents are becoming financial actors. Without identity,
          authorization, compliance checks, and audit trails, autonomous payments
          can create fraud and regulatory risk. AgentPay Guardian provides the
          trust layer needed for safe AI agent finance.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PrimaryLink href="/compliance">Review Compliance</PrimaryLink>
          <Link
            href="/receipt"
            className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            View Receipt
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
