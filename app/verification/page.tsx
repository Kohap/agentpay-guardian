import {
  Activity,
  Fingerprint,
  Gauge,
  Play,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import {
  ApiLabel,
  PageHeader,
  Panel,
  PrimaryLink,
  StatusPill,
} from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

const pathway = [
  {
    title: "Builder Signature Check",
    detail: "Cryptographic validation of creator origin.",
    icon: Fingerprint,
    status: "Verified",
    tone: "success" as const,
  },
  {
    title: "Wallet Ownership",
    detail: "Multi-sig validation sequence for the Monad payment wallet.",
    icon: Wallet,
    status: "Verified",
    tone: "success" as const,
  },
  {
    title: "KYA (Know Your Agent) Score",
    detail: "Behavioral pattern analysis for autonomous payment intent.",
    icon: Radar,
    status: "Analyzing",
    tone: "warning" as const,
  },
];

const ruleLines = [
  "async function verifyAPass(agentId: string) {",
  "  const builderSig = await checkBuilderSignature(agentId);",
  "  if (!builderSig.isValid) throw new ComplianceError('Invalid Signature');",
  "  const walletStatus = await verifyWalletOwnership(agentId);",
  "  if (walletStatus !== 'CONFIRMED') throw new ComplianceError('Wallet Mismatch');",
  "  const kyaScore = await calculateKYAScore(agentId);",
  "  if (kyaScore < 85.0) return 'REQUIRE_AUDIT';",
  "  return 'VERIFIED';",
  "}",
];

const verificationNav = [
  { label: "Dashboard", Icon: Activity },
  { label: "Active Agents", Icon: ShieldCheck },
  { label: "Risk Engine", Icon: Gauge },
  { label: "Policy Manager", Icon: TerminalSquare },
  { label: "Logs", Icon: Radar },
];

export default function VerificationPage() {
  return (
    <AppShell currentStep={1}>
      <div className="grid gap-5 xl:grid-cols-[16rem_1fr]">
        <aside className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-electric">
            Admin Console
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Level 4 Authorization
          </h2>
          <nav className="mt-5 space-y-2 text-sm">
            {verificationNav.map(({ label, Icon }) => (
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
            eyebrow="Step 1"
            title="A-Pass Verification Logic"
            description={`Deep-dive analysis of ${demoAgent.agentName} protocol execution before the agent is allowed to request payment.`}
          />

          <div className="mb-6 flex flex-wrap gap-2">
            <ApiLabel label="Real Cleanverse API Call" />
            <StatusPill ok label="A-Pass Verification: Real API" />
            <StatusPill label="Active Audit" tone="info" />
          </div>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <Panel>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Execution Pathway
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Each identity gate must clear before PayBot Alpha can move
                    into payment authorization.
                  </p>
                </div>
                <ShieldCheck className="h-6 w-6 text-electric" />
              </div>
              <div className="space-y-3">
                {pathway.map(({ title, detail, icon: Icon, status, tone }) => (
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
                          <h3 className="font-semibold text-white">{title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {detail}
                          </p>
                        </div>
                      </div>
                      <StatusPill label={status} tone={tone} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Rule Definition
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    A-Pass v2.1 verification path used by the server-side route.
                  </p>
                </div>
                <TerminalSquare className="h-6 w-6 text-electric" />
              </div>
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/35 p-4 text-xs leading-6 text-slate-200">
                {ruleLines.map((line) => (
                  <code key={line} className="block">
                    {line}
                  </code>
                ))}
              </pre>
            </Panel>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel>
              <ActionPanel
                title={`${demoAgent.agentName} identity packet`}
                description={`Builder ${demoAgent.builderName} is linked to customer ID ${demoAgent.customerId} and wallet ${demoAgent.walletAddress}.`}
                endpoint="/api/apass"
                buttonLabel="Generate A-Pass"
              />
            </Panel>

            <Panel>
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                  Manual Interventions
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Demo-only controls for explaining what compliance operators
                  can do when a verification gate needs review.
                </p>
              </div>
              <div className="grid gap-3">
                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sky-300">
                  <Play className="h-4 w-4" />
                  Force Execute KYA
                </button>
                <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-rose-300/40 bg-rose-300/10 px-4 py-2.5 text-sm font-semibold text-rose-100 hover:bg-rose-300/20">
                  Halt Verification
                </button>
              </div>
            </Panel>
          </section>

          <div className="mt-6">
            <PrimaryLink href="/payment">Continue to request</PrimaryLink>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
