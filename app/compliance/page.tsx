import {
  CalendarClock,
  FileUp,
  LockKeyhole,
  Plus,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PaymentSimulator } from "@/components/payment-simulator";
import {
  ApiLabel,
  PageHeader,
  Panel,
  PrimaryLink,
  StatusPill,
} from "@/components/ui";
import { complianceChecklist, demoAgent } from "@/lib/demo-data";

const policies = [
  {
    title: "Daily Spend Limit",
    icon: ShieldCheck,
    detail: "Hard cap on aggregate 24h outgoing transactions per agent cluster.",
    condition: "> $5,000",
    action: "BLOCK",
    status: "ENFORCED",
  },
  {
    title: "Restricted Recipient List",
    icon: ShieldAlert,
    detail: "Prevents transfers to known OFAC sanctioned wallets and entities.",
    condition: "ALL",
    action: "QUARANTINE",
    status: "ENFORCED",
  },
  {
    title: "Mandatory 2FA for >$1k",
    icon: LockKeyhole,
    detail: "Requires human-in-the-loop cryptographic signature for high-value operations.",
    condition: "Amount > $1k",
    action: "REQUIRE_SIG",
    status: "ENFORCED",
  },
  {
    title: "Weekend Velocity Check",
    icon: CalendarClock,
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
  { label: "Policy Manager", Icon: ShieldCheck },
  { label: "Logs", Icon: FileUp },
];

const enforcementActions = [
  { label: "BLOCK_TRANSACTION", tone: "error" as const },
  { label: "REQUIRE_APPROVAL", tone: "warning" as const },
  { label: "QUARANTINE_AGENT", tone: "error" as const },
  { label: "LOG_ONLY", tone: "info" as const },
];

export default function CompliancePage() {
  return (
    <AppShell currentStep={3}>
      <div className="grid gap-5 xl:grid-cols-[16rem_1fr]">
        <aside className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-electric">
              Admin Console
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Level 4 Authorization
            </h2>
          </div>
          <nav className="space-y-2 text-sm">
            {engineNav.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 hover:bg-white/10"
              >
                <Icon className="h-4 w-4 text-electric" />
                {label}
              </div>
            ))}
          </nav>
        </aside>

        <div>
          <PageHeader
            eyebrow="Step 3"
            title="Compliance Rule Engine"
            description="Define and enforce payment logic for autonomous agents, then validate A-Token and validator eligibility through server-side Cleanverse routes."
          />

          <div className="mb-6 flex flex-wrap gap-3">
            <button className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              <Upload className="h-4 w-4" />
              Import Policy
            </button>
            <button className="inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sky-300">
              <Plus className="h-4 w-4" />
              New Rule
            </button>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["A-Pass Verification", "Real Cleanverse API Call"],
              ["A-Token Rules", "Real Cleanverse API Call"],
              ["Validator", "Real Cleanverse API Call"],
              ["Monad Transaction", "Demo Mock"],
            ].map(([label, status]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-sm font-semibold text-white">{label}</p>
                <ApiLabel label={status} />
              </div>
            ))}
          </div>

          <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <Panel>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Active Policies
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    14 policies monitored. Four rules shown for demo review.
                  </p>
                </div>
                <StatusPill ok label="14 enforced" />
              </div>
              <div className="space-y-3">
                {policies.map(({ title, icon: Icon, detail, condition, action, status }) => (
                  <div
                    key={title}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-white">
                            {title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {detail}
                          </p>
                        </div>
                      </div>
                      <StatusPill
                        label={status}
                        tone={status === "INACTIVE" ? "warning" : "success"}
                      />
                    </div>
                    <div className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                      <p className="rounded-md bg-black/20 px-3 py-2">
                        Condition: {condition}
                      </p>
                      <p className="rounded-md bg-black/20 px-3 py-2">
                        Action: {action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                  Rule Editor: Daily Spend Limit
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Configure logical conditions and enforcement actions for the
                  current payment request.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Rule Name
                  </label>
                  <div className="mt-2 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white">
                    Daily Spend Limit
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Condition Logic
                  </label>
                  <div className="mt-2 space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    {[
                      ["IF", "Transaction.Amount", "is greater than", "$2,000"],
                      ["AND", "Agent.RiskScore", "is less than", "25"],
                      ["AND", "Time.Window", "within last", "24 hours"],
                    ].map(([joiner, field, operator, value]) => (
                      <div
                        key={`${joiner}-${field}`}
                        className="grid gap-2 rounded-md border border-white/10 bg-black/20 p-3 text-sm md:grid-cols-[4rem_1fr_1fr_1fr]"
                      >
                        <span className="font-semibold text-electric">{joiner}</span>
                        <span className="text-white">{field}</span>
                        <span className="text-slate-300">{operator}</span>
                        <span className="font-semibold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Enforcement Action
                  </label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {enforcementActions.map(({ label, tone }) => (
                      <div
                        key={label}
                        className="rounded-md border border-white/10 bg-black/20 p-3"
                      >
                        <StatusPill label={label} tone={tone} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                    Test Rule
                  </button>
                  <button className="rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sky-300">
                    Deploy Policy
                  </button>
                </div>
              </div>
            </Panel>
          </section>

          <section className="mt-5">
            <Panel>
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                  Visible Compliance Checklist
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Payment approval stays blocked until every required control passes.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {complianceChecklist.map(([label, status]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <span className="text-sm font-medium text-white">{label}</span>
                    <StatusPill ok label={status} />
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <div className="mt-5 grid gap-5">
            <Panel>
              <ActionPanel
                title="Query A-Token rules"
                description={`Read compliance rules for ${demoAgent.atokenAddress} on Monad.`}
                endpoint="/api/atoken/rules"
                buttonLabel="Check rules"
              />
            </Panel>
            <Panel>
              <ActionPanel
                title="Check paused status"
                description="Confirm the A-Token has not been paused before authorizing payment."
                endpoint="/api/atoken/is-paused"
                buttonLabel="Check status"
              />
            </Panel>
            <Panel>
              <ActionPanel
                title="Verify validator compliance"
                description={`Verify wallet ${demoAgent.walletAddress} against payment contract ${demoAgent.poolContractAddress}.`}
                endpoint="/api/validator/verify"
                buttonLabel="Verify compliance"
              />
            </Panel>
            <Panel>
              <PaymentSimulator />
            </Panel>
          </div>
          <div className="mt-6">
            <PrimaryLink href="/approval">View approval</PrimaryLink>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
