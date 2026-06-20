import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileUp,
  LockKeyhole,
  Plus,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PaymentSimulator } from "@/components/payment-simulator";
import { complianceChecklist, demoAgent } from "@/lib/demo-data";

const policies = [
  {
    title: "Daily Spend Limit",
    Icon: ShieldCheck,
    detail: "Hard cap on aggregate 24h outgoing transactions per agent cluster.",
    condition: "> $5,000",
    action: "BLOCK",
    status: "ENFORCED",
    active: true,
  },
  {
    title: "Restricted Recipient List",
    Icon: ShieldAlert,
    detail: "Prevents transfers to known OFAC sanctioned wallets and entities.",
    condition: "ALL",
    action: "QUARANTINE",
    status: "ENFORCED",
  },
  {
    title: "Mandatory 2FA for >$1k",
    Icon: LockKeyhole,
    detail:
      "Requires human-in-the-loop cryptographic signature for high-value operations.",
    condition: "Amount > $1k",
    action: "REQUIRE_SIG",
    status: "ENFORCED",
  },
  {
    title: "Weekend Velocity Check",
    Icon: CalendarClock,
    detail: "Limits transaction frequency outside standard banking hours.",
    condition: "Weekend activity",
    action: "LOG_ONLY",
    status: "INACTIVE",
  },
];

const engineNav = [
  { label: "Dashboard", Icon: SlidersHorizontal },
  { label: "Active Agents", Icon: Users },
  { label: "Risk Engine", Icon: ShieldAlert },
  { label: "Policy Manager", Icon: ShieldCheck, active: true },
  { label: "Logs", Icon: FileUp },
];

const integrations = [
  ["A-Pass Verification", "Real Cleanverse API Call"],
  ["A-Token Rules", "Real Cleanverse API Call"],
  ["Validator", "Real Cleanverse API Call"],
  ["Monad Transaction", "Demo Mock"],
];

function StatusChip({
  label,
  tone = "success",
}: {
  label: string;
  tone?: "success" | "warning" | "error" | "info";
}) {
  const styles = {
    success: "border-[#00dbe9]/25 bg-[#00dbe9]/10 text-[#00dbe9]",
    warning: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
    error: "border-[#ffb4ab]/30 bg-[#ffb4ab]/10 text-[#ffb4ab]",
    info: "border-[#b9c7e0]/25 bg-[#b9c7e0]/10 text-[#b9c7e0]",
  };

  return (
    <span
      className={`inline-flex items-center rounded px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${styles[tone]}`}
    >
      {label}
    </span>
  );
}

function FieldSlot({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded transition-shadow focus-within:border-[#00f0ff] focus-within:shadow-[0_0_0_2px_rgba(0,240,255,0.2)]">
      <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#b9cacb]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CompliancePage() {
  return (
    <AppShell currentStep={3}>
      <div className="grid gap-5 xl:grid-cols-[17.5rem_1fr]">
        <aside className="rounded-lg border border-[#3b494b] bg-[#122131] p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#00f0ff]">
              Admin Console
            </h2>
            <p className="mt-2 text-sm text-[#b9cacb]">
              Level 4 Authorization
            </p>
          </div>

          <nav className="space-y-2">
            {engineNav.map(({ label, Icon, active }) => (
              <div
                key={label}
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
              </div>
            ))}
          </nav>

          <button className="mt-8 inline-flex min-h-10 w-full items-center justify-center rounded bg-[#00f0ff] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]">
            Generate Report
          </button>
        </aside>

        <div className="min-w-0 space-y-5">
          <header className="flex flex-col gap-4 border-b border-[#3b494b] pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#00dbe9]">
                Step 3
              </p>
              <h1 className="text-4xl font-bold tracking-normal text-[#d4e4fa]">
                Compliance Rule Engine
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#b9cacb]">
                Define and enforce payment logic for autonomous agents, then
                validate A-Token and validator eligibility through server-side
                Cleanverse routes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex min-h-10 items-center gap-2 rounded border border-[#3b494b] bg-[#122131] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#d4e4fa] hover:border-[#00f0ff] hover:text-[#00f0ff]">
                <Upload className="h-4 w-4" />
                Import Policy
              </button>
              <button className="inline-flex min-h-10 items-center gap-2 rounded bg-[#00f0ff] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]">
                <Plus className="h-4 w-4" />
                New Rule
              </button>
            </div>
          </header>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {integrations.map(([label, status]) => (
              <div
                key={label}
                className="rounded border border-[#3b494b] bg-[#122131] p-4"
              >
                <p className="mb-3 text-sm font-semibold text-[#d4e4fa]">
                  {label}
                </p>
                <StatusChip
                  label={status}
                  tone={status === "Demo Mock" ? "info" : "success"}
                />
              </div>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-3">
            <div className="overflow-hidden rounded-lg border border-[#3b494b] bg-[#0f172a] xl:col-span-1">
              <div className="flex items-center justify-between border-b border-[#3b494b] bg-[#0d1c2d] p-4">
                <h2 className="text-2xl font-semibold text-[#d4e4fa]">
                  Active Policies
                </h2>
                <StatusChip label="14 enforced" />
              </div>
              <div className="grid gap-3 p-4">
                {policies.map(
                  ({
                    title,
                    Icon,
                    detail,
                    condition,
                    action,
                    status,
                    active,
                  }) => (
                    <div
                      key={title}
                      className={`rounded border bg-[#122131] p-4 transition hover:border-[#00f0ff]/50 ${
                        active
                          ? "border-[#00f0ff]/50 border-l-2 border-l-[#00f0ff]"
                          : status === "INACTIVE"
                            ? "border-[#3b494b] opacity-65"
                            : "border-[#3b494b]"
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <Icon
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              active ? "text-[#00f0ff]" : "text-[#849495]"
                            }`}
                          />
                          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#d4e4fa]">
                            {title}
                          </h3>
                        </div>
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            status === "INACTIVE"
                              ? "text-[#849495]"
                              : "text-[#00dbe9]"
                          }`}
                        />
                      </div>
                      <p className="mb-3 text-sm leading-6 text-[#b9cacb]">
                        {detail}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded bg-[#273647] px-2 py-1 font-mono text-[10px] text-[#b9cacb]">
                          Condition: {condition}
                        </span>
                        <span
                          className={`rounded px-2 py-1 font-mono text-[10px] ${
                            action === "LOG_ONLY"
                              ? "bg-[#b9c7e0]/10 text-[#b9c7e0]"
                              : action === "REQUIRE_SIG"
                                ? "bg-[#d5e3fd]/10 text-[#d5e3fd]"
                                : "bg-[#93000a]/25 text-[#ffb4ab]"
                          }`}
                        >
                          Action: {action}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-[#3b494b] bg-[#0f172a] xl:col-span-2">
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="relative z-10 flex flex-col gap-4 border-b border-[#3b494b] bg-[#0d1c2d] p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#d4e4fa]">
                    Rule Editor:{" "}
                    <span className="text-[#00f0ff]">Daily Spend Limit</span>
                  </h2>
                  <p className="mt-1 text-sm text-[#b9cacb]">
                    Configure logical conditions and enforcement actions.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                    Status
                  </span>
                  <span className="relative h-6 w-11 rounded-full bg-[#00f0ff]">
                    <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-[#d4e4fa]" />
                  </span>
                </div>
              </div>

              <div className="relative z-10 grid gap-6 p-5">
                <section className="grid gap-4 md:grid-cols-2">
                  <FieldSlot label="Rule Name">
                    <input
                      className="w-full border-0 border-b border-[#3b494b] bg-[#1e293b] px-3 py-2 text-sm text-[#d4e4fa] outline-none focus:border-[#00f0ff]"
                      defaultValue="Daily Spend Limit"
                    />
                  </FieldSlot>
                  <FieldSlot label="Description">
                    <input
                      className="w-full border-0 border-b border-[#3b494b] bg-[#1e293b] px-3 py-2 text-sm text-[#d4e4fa] outline-none focus:border-[#00f0ff]"
                      defaultValue="Hard cap on aggregate 24h outgoing transactions per agent cluster."
                    />
                  </FieldSlot>
                </section>

                <section className="relative rounded border border-[#3b494b] bg-[#051424] p-4">
                  <div className="absolute -top-3 left-4 bg-[#0f172a] px-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#00f0ff]">
                    Condition Logic
                  </div>
                  <div className="mt-2 grid gap-3 font-mono text-[13px]">
                    {[
                      ["IF", "Transaction.Amount", "is greater than", "$5,000"],
                      ["AND", "Time.Window", "within last", "24 hours"],
                    ].map(([joiner, field, operator, value], index) => (
                      <div
                        key={`${joiner}-${field}`}
                        className={`grid gap-2 rounded border-l-2 border-l-[#3b494b] bg-[#1e293b] p-3 md:grid-cols-[3rem_1.3fr_1fr_0.8fr_auto] ${
                          index > 0 ? "md:ml-4" : ""
                        }`}
                      >
                        <span className="font-bold text-[#849495]">
                          {joiner}
                        </span>
                        <span className="rounded border border-[#3b494b] bg-[#122131] px-2 py-1 text-[#d4e4fa]">
                          {field}
                        </span>
                        <span className="rounded border border-[#3b494b] bg-[#122131] px-2 py-1 text-[#d4e4fa]">
                          {operator}
                        </span>
                        <span className="rounded border border-[#3b494b] bg-[#122131] px-2 py-1 font-bold text-[#00f0ff]">
                          {value}
                        </span>
                        <Trash2 className="h-4 w-4 self-center text-[#849495]" />
                      </div>
                    ))}
                    <button className="inline-flex w-fit items-center gap-2 rounded border border-dashed border-[#3b494b] px-3 py-2 text-xs text-[#b9cacb] hover:border-[#00f0ff] hover:text-[#00f0ff]">
                      <Plus className="h-3.5 w-3.5" />
                      Add Condition
                    </button>
                  </div>
                </section>

                <section className="relative rounded border border-[#3b494b] bg-[#051424] p-4">
                  <div className="absolute -top-3 left-4 bg-[#0f172a] px-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#ffb4ab]">
                    Enforcement Action
                  </div>
                  <div className="mt-2 grid gap-3 font-mono text-[13px] lg:grid-cols-[4rem_15rem_1fr] lg:items-center">
                    <span className="font-bold text-[#849495]">THEN</span>
                    <div className="rounded border border-[#ffb4ab]/50 bg-[#93000a]/10 px-3 py-2 font-bold text-[#ffb4ab]">
                      BLOCK_TRANSACTION
                    </div>
                    <div className="border-b border-[#3b494b] bg-[#1e293b] px-3 py-2 text-[#d4e4fa]">
                      https://api.agentpay.io/hooks/alert
                    </div>
                  </div>
                </section>
              </div>

              <div className="relative z-10 flex flex-wrap justify-end gap-3 border-t border-[#3b494b] bg-[#010f1f] p-5">
                <button className="rounded px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb] hover:text-[#d4e4fa]">
                  Discard Changes
                </button>
                <button className="rounded border border-[#00f0ff] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00f0ff] hover:bg-[#00f0ff]/10">
                  Test Rule
                </button>
                <button className="rounded bg-[#00f0ff] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00363a] shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:bg-[#7df4ff]">
                  Deploy Policy
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#3b494b] bg-[#0f172a] p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#d4e4fa]">
                  Visible Compliance Checklist
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#b9cacb]">
                  Payment approval stays blocked until every required control
                  passes.
                </p>
              </div>
              <StatusChip label="All checks passed" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {complianceChecklist.map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded border border-[#3b494b] bg-[#122131] p-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#00dbe9]" />
                    <span className="text-sm font-medium text-[#d4e4fa]">
                      {label}
                    </span>
                  </div>
                  <StatusChip label={status} />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5">
            <div className="rounded-lg border border-[#3b494b] bg-[#0f172a] p-5">
              <ActionPanel
                title="Query A-Token rules"
                description={`Read compliance rules for ${demoAgent.atokenAddress} on Monad.`}
                endpoint="/api/atoken/rules"
                buttonLabel="Check rules"
              />
            </div>
            <div className="rounded-lg border border-[#3b494b] bg-[#0f172a] p-5">
              <ActionPanel
                title="Check paused status"
                description="Confirm the A-Token has not been paused before authorizing payment."
                endpoint="/api/atoken/is-paused"
                buttonLabel="Check status"
              />
            </div>
            <div className="rounded-lg border border-[#3b494b] bg-[#0f172a] p-5">
              <ActionPanel
                title="Verify validator compliance"
                description={`Verify wallet ${demoAgent.walletAddress} against payment contract ${demoAgent.poolContractAddress}.`}
                endpoint="/api/validator/verify"
                buttonLabel="Verify compliance"
              />
            </div>
            <div className="rounded-lg border border-[#3b494b] bg-[#0f172a] p-5">
              <PaymentSimulator />
            </div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-[#3b494b] pt-4 text-sm text-[#849495] md:flex-row md:items-center md:justify-between">
            <p>
              <span className="mr-2 font-semibold text-[#00f0ff]">
                AgentPay Guardian
              </span>
              © 2024 AgentPay Guardian. Digital Sovereignty Guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security Disclosure</span>
            </div>
          </footer>

          <Link
            href="/approval"
            className="inline-flex min-h-11 items-center gap-2 rounded bg-[#00f0ff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]"
          >
            View Approval
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
