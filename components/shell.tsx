import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { RunFullDemoButton } from "@/components/run-full-demo";

const navItems = [
  ["Verify", "/verification"],
  ["Request", "/payment"],
  ["Compliance", "/compliance"],
  ["Approval", "/approval"],
  ["Receipt", "/receipt"],
  ["Audit", "/audit"],
];

const flowSteps = [
  ["1", "Agent Verification", "/verification"],
  ["2", "Payment Request", "/payment"],
  ["3", "Compliance Check", "/compliance"],
  ["4", "Approval", "/approval"],
  ["5", "Audit Trail", "/audit"],
];

export function AppShell({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep?: number;
}) {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[#3b494b] bg-[#0d1515]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-[#00f0ff]/35 bg-[#00f0ff]/10 text-[#dbfcff]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold text-[#dbfcff]">
                AgentPay Guardian
              </span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b9cacb]">
                Compliance-first agent payments
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="border-b-2 border-transparent px-1 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#b9cacb] hover:border-[#00dbe9] hover:text-[#dbfcff]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <section className="border-b border-[#3b494b] bg-[#232b2c]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 text-sm text-[#b9cacb] md:flex-row md:items-center md:justify-between md:px-8">
          <p className="leading-6">
            <span className="font-semibold text-[#dbfcff]">Demo mode active:</span> Cleanverse
            calls use live API when credentials exist; audit + Monad receipt are
            simulated.
          </p>
          <RunFullDemoButton />
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8">
        {currentStep && (
          <div className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-[#1e293b]/35 p-3 backdrop-blur-xl">
            <div className="flex min-w-[760px] items-center gap-2">
              {flowSteps.map(([number, label, href], index) => {
                const stepNumber = Number(number);
                const isActive = stepNumber === currentStep;
                const isDone = stepNumber < currentStep;

                return (
                  <div key={href} className="flex flex-1 items-center gap-2">
                    <Link
                      href={href}
                      className={`flex w-full items-center gap-2 rounded border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] ${
                        isActive
                          ? "border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#dbfcff]"
                          : isDone
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                            : "border-[#3b494b] bg-[#2e3637]/45 text-[#b9cacb]"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-white/10 text-xs font-semibold">
                        {number}
                      </span>
                      {label}
                    </Link>
                    {index < flowSteps.length - 1 && (
                      <span className="text-slate-500">&rarr;</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
