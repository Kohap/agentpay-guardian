import Link from "next/link";
import { ShieldCheck } from "lucide-react";

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
      <header className="border-b border-white/10 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-electric/40 bg-electric/10 text-electric">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold">AgentPay Guardian</span>
              <span className="block text-xs text-slate-400">Compliance-first agent payments</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8">
        {currentStep && (
          <div className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex min-w-[760px] items-center gap-2">
              {flowSteps.map(([number, label, href], index) => {
                const stepNumber = Number(number);
                const isActive = stepNumber === currentStep;
                const isDone = stepNumber < currentStep;

                return (
                  <div key={href} className="flex flex-1 items-center gap-2">
                    <Link
                      href={href}
                      className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                        isActive
                          ? "border-electric/50 bg-electric/15 text-white"
                          : isDone
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                            : "border-white/10 bg-white/[0.02] text-slate-400"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-xs font-semibold">
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
