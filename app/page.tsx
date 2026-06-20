import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Fingerprint,
  Gauge,
  Landmark,
  ListChecks,
  ReceiptText,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { RunFullDemoButton } from "@/components/run-full-demo";
import {
  cleanverseIntegrations,
  complianceChecklist,
  demoAgent,
} from "@/lib/demo-data";

const pipeline = [
  "Agent Verification",
  "Payment Request",
  "Compliance Check",
  "Approval",
  "Audit Trail",
];

const agentStats = [
  { label: "Status", value: "Verified", Icon: BadgeCheck },
  { label: "Risk Level", value: demoAgent.riskLevel, Icon: ShieldCheck },
  { label: "A-Pass", value: "Active", Icon: CheckCircle2 },
  { label: "A-Token Permission", value: "Valid", Icon: ListChecks },
];

const features = [
  {
    title: "Verified Agent Identity",
    detail: "A-Pass binds the builder, agent ID, and wallet before funds can move.",
    Icon: Fingerprint,
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

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-[#1e293b]/45 p-5 shadow-[inset_0_0_18px_rgba(0,240,255,0.06),0_0_36px_rgba(0,240,255,0.05)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function DataSlot({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[#3b494b] bg-[#080f10]/75 p-3">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#b9cacb]">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold leading-5 text-[#dce4e5]">
        {value}
      </p>
    </div>
  );
}

function StatusChip({
  label,
  tone = "success",
}: {
  label: string;
  tone?: "success" | "warning" | "mock";
}) {
  const styles = {
    success: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
    warning: "border-amber-400/35 bg-amber-400/10 text-amber-300",
    mock: "border-cyan-300/25 bg-[#0d1515] text-[#b9cacb]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${styles[tone]}`}
    >
      {tone === "warning" ? (
        <AlertTriangle className="h-3 w-3" />
      ) : (
        <CheckCircle2 className="h-3 w-3" />
      )}
      {label}
    </span>
  );
}

function MobileMonitor() {
  return (
    <section className="grid gap-4 md:hidden">
      <div>
        <h1 className="text-2xl font-semibold text-[#dce4e5]">
          Active Monitor
        </h1>
        <p className="mt-1 text-sm leading-6 text-[#b9cacb]">
          Real-time oversight of autonomous transactions.
        </p>
      </div>

      <section className="relative overflow-hidden rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 shadow-lg">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00dbe9]/10 blur-[64px]" />
        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[#00dbe9]" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#00dbe9]">
                PayBot Alpha
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded border border-[#00dbe9]/30 bg-[#00dbe9]/10 px-2 py-1 font-mono text-[11px] text-[#00dbe9]">
              <span className="h-2 w-2 rounded-full bg-[#00dbe9]" />
              Live
            </span>
          </div>

          <div className="rounded-lg border-l-2 border-[#00dbe9] bg-[#122131] p-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
              Executing Request
            </p>
            <p className="mt-2 text-sm leading-6 text-[#d4e4fa]">
              &quot;Authorize {demoAgent.amount} {demoAgent.currency} payment
              to {demoAgent.merchant}.&quot;
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-[#3b494b]/60 pt-3">
              <span className="font-mono text-[11px] text-[#b9cacb]">
                Est. Value
              </span>
              <span className="font-mono text-[12px] font-bold text-[#00dbe9]">
                {demoAgent.amount} {demoAgent.currency}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                Risk Assessment
              </span>
              <span className="font-mono text-[11px] text-[#00dbe9]">
                Scanning... 65%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#122131]">
              <div className="relative h-full w-[65%] rounded-full bg-[#00dbe9]">
                <span className="absolute bottom-0 right-0 top-0 w-4 animate-pulse bg-white/30" />
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#b9cacb]">
              <ListChecks className="h-4 w-4" />
              Checking SOC2 compliance bounds...
            </p>
          </div>
        </div>
      </section>

      <details className="overflow-hidden rounded-xl border border-[#1e293b] bg-[#0f172a] shadow-lg">
        <summary className="flex cursor-pointer list-none items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-[#b9cacb]" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#d4e4fa]">
              Pre-Auth Checklist
            </h2>
          </div>
          <span className="text-[#b9cacb]">+</span>
        </summary>
        <div className="grid gap-3 px-5 pb-5">
          {[
            ["Agent identity verified", "A-Pass record active.", true],
            ["Budget allocation check", "Transaction below limit.", true],
            ["Managerial override", "Required for high-risk payments.", false],
          ].map(([label, detail, checked]) => (
            <div
              key={label as string}
              className={`flex items-start gap-3 rounded p-2 ${
                checked ? "" : "border border-[#3b494b] bg-[#273647]/30"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border ${
                  checked
                    ? "border-[#00dbe9] bg-[#00dbe9] text-[#051424]"
                    : "border-[#3b494b] bg-[#1e293b]"
                }`}
              >
                {checked && <CheckCircle2 className="h-3.5 w-3.5" />}
              </span>
              <span>
                <span className="block text-sm text-[#d4e4fa]">
                  {label as string}
                </span>
                <span
                  className={`font-mono text-[11px] ${
                    checked ? "text-[#00dbe9]" : "text-[#ffb4ab]"
                  }`}
                >
                  {detail as string}
                </span>
              </span>
            </div>
          ))}
        </div>
      </details>

      <div className="grid gap-2 pt-2">
        <RunFullDemoButton className="w-full justify-center text-sm" />
        <p className="text-center font-mono text-[11px] text-[#b9cacb]">
          Simulates a complete transaction lifecycle.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <AppShell currentStep={1}>
      <MobileMonitor />

      <section className="hidden gap-8 pb-4 md:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#00dbe9]">
              Compliance Command Center
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-normal text-[#dce4e5] md:text-6xl">
              AgentPay Guardian
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#b9cacb]">
              AgentPay Guardian protects AI agent payments with verified
              identity, compliance checks, and transparent audit trails.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <RunFullDemoButton />
            <Link
              href="/audit"
              className="inline-flex min-h-11 items-center gap-2 rounded border border-[#dbfcff]/70 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#dbfcff] hover:bg-[#dbfcff] hover:text-[#00363a]"
            >
              View Audit Trail
              <ReceiptText className="h-4 w-4" />
            </Link>
            <StatusChip label="Demo mode active" tone="warning" />
          </div>
        </div>

        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00f0ff]/10 blur-[100px]" />
          <div className="relative z-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-[#3b494b] bg-[#2e3637] text-[#dbfcff]">
                  <Bot className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-[#dce4e5]">
                    {demoAgent.agentName}
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#b9cacb]">
                    {demoAgent.agentId}
                  </p>
                </div>
              </div>
              <StatusChip label="Low Risk" />
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded border border-[#3b494b] bg-[#151d1e] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#b9cacb]">
                  <CircleDollarSign className="h-4 w-4" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                    Current payment request
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#dce4e5]">
                  {demoAgent.amount} {demoAgent.currency}
                </p>
                <p className="mt-1 text-sm text-[#b9cacb]">
                  to {demoAgent.merchant}
                </p>
              </div>
              <div className="rounded border border-[#3b494b] bg-[#151d1e] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#b9cacb]">
                  <Gauge className="h-4 w-4" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                    Transaction Limit
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#dce4e5]">
                  ${demoAgent.transactionLimit}
                </p>
                <p className="mt-1 text-sm text-[#b9cacb]">
                  enforced before approval
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {agentStats.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="rounded border border-[#3b494b] bg-[#0d1515] p-3"
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                    {label}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-emerald-300">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-mono text-[11px] font-semibold">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="my-8 hidden overflow-x-auto rounded-lg border border-white/10 bg-[#1e293b]/35 p-4 backdrop-blur-xl md:block">
        <div className="flex min-w-[850px] items-center justify-between gap-3">
          {pipeline.map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3">
              <Link
                href={
                  [
                    "/verification",
                    "/payment",
                    "/compliance",
                    "/approval",
                    "/audit",
                  ][index]
                }
                className={`flex min-h-12 flex-1 items-center gap-3 rounded border px-3 ${
                  index === 0
                    ? "border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#dbfcff]"
                    : "border-[#3b494b] bg-[#2e3637]/45 text-[#b9cacb]"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-xs font-bold ${
                    index === 0
                      ? "bg-[#00f0ff] text-[#00363a]"
                      : "bg-[#2e3637] text-[#b9cacb]"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em]">
                  {step}
                </span>
              </Link>
              {index < pipeline.length - 1 && (
                <span className="text-[#3b494b]">-&gt;</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <GlassCard className="lg:col-span-3">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#dce4e5]">
                Agent Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#b9cacb]">
                Identity, wallet, and transaction controls.
              </p>
            </div>
            <Shield className="h-6 w-6 text-[#dbfcff]" />
          </div>
          <div className="grid gap-3">
            <DataSlot label="Builder" value={demoAgent.builderName} />
            <DataSlot label="Wallet" value={demoAgent.walletAddress} />
            <DataSlot label="Chain" value="Monad" />
            <DataSlot label="Purpose" value={demoAgent.purpose} />
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#dce4e5]">
                Compliance Checklist
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#b9cacb]">
                Payment approval stays blocked until every control passes.
              </p>
            </div>
            <StatusChip label="All checks passed" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {complianceChecklist.map(([label, status], index) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 rounded border border-[#3b494b] bg-[#151d1e] p-4 ${
                  index === complianceChecklist.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-sm font-medium text-[#dce4e5]">
                    {label}
                  </span>
                </div>
                <StatusChip label={status} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#dce4e5]">
              Cleanverse API Integration
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#b9cacb]">
              Clear labels show what is live, simulated, or pending.
            </p>
          </div>
          <div className="space-y-3">
            {cleanverseIntegrations.map(([name, detail, status]) => {
              const isMock = status === "Demo Mock";

              return (
                <div
                  key={name}
                  className="relative overflow-hidden rounded border border-[#3b494b] bg-[#151d1e] p-4"
                >
                  <span
                    className={`absolute bottom-0 left-0 top-0 w-1 ${
                      isMock ? "bg-amber-300/70" : "bg-emerald-300/70"
                    }`}
                  />
                  <div className="pl-2">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-[#dce4e5]">{name}</h3>
                      {isMock ? (
                        <Database className="h-4 w-4 text-[#b9cacb]" />
                      ) : (
                        <BadgeCheck className="h-4 w-4 text-emerald-300" />
                      )}
                    </div>
                    <p className="mb-3 text-sm leading-6 text-[#b9cacb]">
                      {detail}
                    </p>
                    <StatusChip
                      label={status}
                      tone={isMock ? "mock" : "success"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </section>

      <section className="my-8 grid gap-6 md:grid-cols-2">
        <GlassCard className="border-l-4 border-l-amber-400">
          <div className="mb-5 flex items-start justify-between gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-300" />
            <StatusChip label="Before compliance" tone="warning" />
          </div>
          <h2 className="text-2xl font-semibold text-[#dce4e5]">
            Payment Blocked
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#b9cacb]">
            Agent must complete A-Pass verification and compliance checks before
            payment.
          </p>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-emerald-400 bg-gradient-to-r from-emerald-400/10 to-[#1e293b]/35">
          <div className="mb-5 flex items-start justify-between gap-4">
            <Landmark className="h-8 w-8 text-emerald-300" />
            <StatusChip label="After compliance" />
          </div>
          <h2 className="text-2xl font-semibold text-[#dce4e5]">
            Payment Authorized
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#b9cacb]">
            AgentPay Guardian approved this transaction after identity, rule,
            and risk checks.
          </p>
        </GlassCard>
      </section>

      <section className="mb-8 grid gap-6 md:grid-cols-3">
        {features.map(({ title, detail, Icon }) => (
          <GlassCard key={title} className="border-t-[#dbfcff]/20">
            <Icon className="mb-4 h-7 w-7 text-[#dbfcff]" />
            <h2 className="text-xl font-semibold text-[#dce4e5]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#b9cacb]">{detail}</p>
          </GlassCard>
        ))}
      </section>

      <GlassCard className="mb-4 flex flex-col gap-6 border-b-[#00f0ff]/35 bg-gradient-to-br from-[#192122] to-[#0d1515] p-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-[#dce4e5]">
            Why AgentPay Guardian Matters
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#b9cacb]">
            AI agents are becoming financial actors. Without identity,
            authorization, compliance checks, and audit trails, autonomous
            payments can create fraud and regulatory risk. AgentPay Guardian
            provides the trust layer needed for safe AI agent finance.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/compliance"
            className="inline-flex min-h-11 items-center gap-2 rounded bg-[#00f0ff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]"
          >
            Review Compliance
            <ListChecks className="h-4 w-4" />
          </Link>
          <Link
            href="/receipt"
            className="inline-flex min-h-11 items-center rounded border border-[#3b494b] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#dce4e5] hover:bg-[#2e3637]"
          >
            View Receipt
          </Link>
        </div>
      </GlassCard>
    </AppShell>
  );
}
