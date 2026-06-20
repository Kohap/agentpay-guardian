import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Fingerprint,
  Gauge,
  HelpCircle,
  Play,
  Radar,
  ShieldCheck,
  Square,
  TerminalSquare,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { demoAgent } from "@/lib/demo-data";

const pathway = [
  {
    title: "Builder Signature Check",
    detail: "Cryptographic validation of creator origin.",
    Icon: Fingerprint,
    status: "Verified",
    tone: "success" as const,
  },
  {
    title: "Wallet Ownership",
    detail: "Multi-sig validation sequence for the Monad payment wallet.",
    Icon: Wallet,
    status: "Verified",
    tone: "success" as const,
  },
  {
    title: "KYA (Know Your Agent) Score",
    detail: "Behavioral pattern analysis in progress.",
    Icon: Radar,
    status: "Analyzing",
    tone: "warning" as const,
  },
];

const ruleLines = [
  { text: "async function verifyAPass(agentId: string) {", tone: "keyword" },
  { text: "  // Phase 1: Origin Validation", tone: "comment" },
  {
    text: "  const builderSig = await checkBuilderSignature(agentId);",
    tone: "default",
  },
  { text: "  if (!builderSig.isValid) {", tone: "keyword" },
  {
    text: "    throw new ComplianceError('Invalid Signature');",
    tone: "error",
  },
  { text: "  }", tone: "default" },
  { text: "", tone: "default" },
  { text: "  // Phase 2: Asset Control", tone: "comment" },
  {
    text: "  const walletStatus = await verifyWalletOwnership(agentId);",
    tone: "default",
  },
  { text: "  if (walletStatus !== 'CONFIRMED') {", tone: "keyword" },
  {
    text: "    throw new ComplianceError('Wallet Mismatch');",
    tone: "error",
  },
  { text: "  }", tone: "default" },
  { text: "", tone: "default" },
  { text: "  // Phase 3: Behavioral Analysis (KYA)", tone: "comment" },
  {
    text: "  const kyaScore = await calculateKYAScore(agentId);",
    tone: "default",
  },
  { text: "  if (kyaScore < 85.0) {", tone: "keyword" },
  { text: "    /* Status: Pending Human Review */", tone: "comment" },
  { text: "    return 'REQUIRE_AUDIT';", tone: "warning" },
  { text: "  }", tone: "default" },
  { text: "", tone: "default" },
  { text: "  return 'VERIFIED';", tone: "success" },
  { text: "}", tone: "default" },
];

const verificationNav = [
  { label: "Dashboard", Icon: Activity },
  { label: "Active Agents", Icon: ShieldCheck },
  { label: "Risk Engine", Icon: Gauge, active: true },
  { label: "Policy Manager", Icon: TerminalSquare },
  { label: "Logs", Icon: Radar },
];

const toneStyles = {
  success: {
    card: "border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.12)]",
    icon: "text-[#00f0ff]",
    badge: "text-[#00f0ff]",
  },
  warning: {
    card: "border-[#3b494b] shadow-[0_0_10px_rgba(251,191,36,0.12)]",
    icon: "text-[#fbbf24]",
    badge: "text-[#fbbf24]",
  },
};

const codeTone = {
  keyword: "text-[#006970]",
  comment: "text-[#3b494b]",
  error: "text-[#ffb4ab]",
  warning: "text-[#fbbf24]",
  success: "text-[#7df4ff]",
  default: "text-[#b9cacb]",
};

export default function VerificationPage() {
  return (
    <AppShell currentStep={1}>
      <div className="grid gap-5 xl:grid-cols-[17.5rem_1fr]">
        <aside className="rounded-lg border border-[#3b494b] bg-[#122131] p-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 text-[#00f0ff]">
              <ShieldCheck className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Admin Console</h2>
            </div>
            <p className="mt-2 text-sm text-[#b9cacb]">
              Level 4 Authorization
            </p>
          </div>

          <nav className="space-y-2">
            {verificationNav.map(({ label, Icon, active }) => (
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

          <div className="mt-8 border-t border-[#3b494b] pt-4">
            <button className="mb-3 inline-flex min-h-10 w-full items-center justify-center rounded bg-[#00f0ff] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]">
              Generate Report
            </button>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#b9cacb] hover:bg-[#273647]">
              <HelpCircle className="h-4 w-4 text-[#849495]" />
              Help
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#00dbe9]">
                Step 1
              </p>
              <h1 className="text-4xl font-bold tracking-normal text-[#d4e4fa]">
                A-Pass Verification Logic
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#b9cacb]">
                Deep-dive analysis of {demoAgent.agentName} protocol execution
                before the agent is allowed to request payment.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded border border-[#3b494b] bg-[#1c2b3c] px-4 py-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00f0ff]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#00f0ff]">
                Active Audit
              </span>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-5">
              <div className="mb-6 flex items-center gap-3">
                <Activity className="h-5 w-5 text-[#849495]" />
                <h2 className="text-2xl font-semibold text-[#d4e4fa]">
                  Execution Pathway
                </h2>
              </div>

              <div className="relative flex flex-col items-center gap-10 py-6">
                <div className="absolute bottom-8 top-8 w-px bg-[#3b494b]" />
                {pathway.map(({ title, detail, Icon, status, tone }) => {
                  const style = toneStyles[tone];

                  return (
                    <div
                      key={title}
                      className={`relative z-10 flex w-full max-w-xl items-center justify-between gap-4 rounded-lg border bg-[#1e293b] p-5 ${style.card}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#122131]">
                          <Icon className={`h-5 w-5 ${style.icon}`} />
                        </span>
                        <div>
                          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#d4e4fa]">
                            {title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-[#b9cacb]">
                            {detail}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex shrink-0 flex-col items-end gap-1 ${style.badge}`}
                      >
                        {tone === "warning" ? (
                          <Radar className="h-5 w-5 animate-pulse" />
                        ) : (
                          <BadgeCheck className="h-5 w-5" />
                        )}
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <div className="overflow-hidden rounded-lg border border-[#1e293b] bg-[#0f172a]">
                <div className="flex items-center justify-between gap-3 border-b border-[#1e293b] bg-[#010f1f] p-4">
                  <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#d4e4fa]">
                    <TerminalSquare className="h-4 w-4 text-[#849495]" />
                    Rule Definition
                  </h2>
                  <span className="font-mono text-xs text-[#00f0ff]">
                    a-pass-v2.1.ts
                  </span>
                </div>
                <pre className="max-h-[34rem] overflow-auto bg-[#010f1f] p-5 font-mono text-[13px] leading-6">
                  {ruleLines.map((line, index) => (
                    <code
                      key={`${line.text}-${index}`}
                      className={`block ${codeTone[line.tone as keyof typeof codeTone]}`}
                    >
                      {line.text || " "}
                    </code>
                  ))}
                </pre>
              </div>

              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-5">
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#d4e4fa]">
                  Manual Interventions
                </h3>
                <div className="grid gap-3">
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-[#00f0ff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#00f0ff] hover:bg-[#00f0ff]/10">
                    <Play className="h-4 w-4" />
                    Force Execute KYA
                  </button>
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-[#ffb4ab] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#ffb4ab] hover:bg-[#ffb4ab]/10">
                    <Square className="h-4 w-4" />
                    Halt Verification
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-5">
              <ActionPanel
                title={`${demoAgent.agentName} identity packet`}
                description={`Builder ${demoAgent.builderName} is linked to customer ID ${demoAgent.customerId} and wallet ${demoAgent.walletAddress}.`}
                endpoint="/api/apass"
                buttonLabel="Generate A-Pass"
              />
            </div>

            <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-5">
              <h2 className="text-xl font-semibold text-[#d4e4fa]">
                Verification Output
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#b9cacb]">
                The demo calls the real Cleanverse A-Pass route when credentials
                are available. The KYA stage remains visible so judges can see
                where operator review would happen.
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  ["A-Pass Verification", "Real Cleanverse API Call"],
                  ["KYA Scoring", "Demo Review Signal"],
                  ["Audit Trail", "Local Demo Log"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded border border-[#3b494b] bg-[#010f1f] p-3"
                  >
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#849495]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#d4e4fa]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-[#3b494b] pt-4 text-sm text-[#849495] md:flex-row md:items-center md:justify-between">
            <p>© 2024 AgentPay Guardian. Digital Sovereignty Guaranteed.</p>
            <div className="flex flex-wrap gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security Disclosure</span>
            </div>
          </footer>

          <div>
            <Link
              href="/payment"
              className="inline-flex min-h-11 items-center gap-2 rounded bg-[#00f0ff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#00363a] hover:bg-[#7df4ff]"
            >
              Continue to Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
