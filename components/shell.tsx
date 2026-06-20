"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Gavel,
  LayoutDashboard,
  Menu,
  ReceiptText,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";
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

const mobileNavItems = [
  { label: "Dash", href: "/", Icon: LayoutDashboard },
  { label: "Risk", href: "/compliance", Icon: Gavel },
  { label: "Logs", href: "/audit", Icon: ReceiptText },
  { label: "Admin", href: "/verification", Icon: ShieldCheck },
];

export function AppShell({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep?: number;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentFlowStep = currentStep
    ? flowSteps.find(([number]) => Number(number) === currentStep)
    : undefined;

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-[#3b494b] bg-[#0d1515]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:h-auto md:px-8 md:py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-[#00f0ff]/35 bg-[#00f0ff]/10 text-[#dbfcff] md:h-10 md:w-10">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold text-[#dbfcff] md:text-base">
                AgentPay Guardian
              </span>
              <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b9cacb] md:block">
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
          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded text-[#b9cacb] hover:text-[#00dbe9]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ffb4ab]" />
            </button>
            <button
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded text-[#b9cacb] hover:text-[#00dbe9]"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#051424]/98 pt-16 md:hidden">
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-6 flex items-center gap-3 border-b border-[#3b494b] pb-5">
              <span className="flex h-12 w-12 items-center justify-center rounded border-2 border-[#00dbe9] bg-[#122131] text-[#00dbe9]">
                <UserCircle className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-semibold text-[#d4e4fa]">
                  Guardian Admin
                </h2>
                <p className="text-sm text-[#b9cacb]">Clinical Oversight</p>
              </div>
            </div>

            <nav className="grid gap-3">
              {[
                ["Dashboard", "/"],
                ["Agent Registry", "/verification"],
                ["Risk Engine", "/compliance"],
                ["Transaction Log", "/audit"],
                ["Admin Panel", "/approval"],
              ].map(([label, href]) => {
                const active = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 border-l-4 px-4 py-3 ${
                      active
                        ? "border-[#00dbe9] bg-[#122131] text-[#00dbe9]"
                        : "border-transparent text-[#b9cacb] hover:text-[#00dbe9]"
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-[#3b494b] pt-5">
              <RunFullDemoButton />
            </div>
          </div>
        </div>
      )}

      <section className="hidden border-b border-[#3b494b] bg-[#232b2c] md:block">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 text-sm text-[#b9cacb] md:flex-row md:items-center md:justify-between md:px-8">
          <p className="leading-6">
            <span className="font-semibold text-[#dbfcff]">Demo mode active:</span> Cleanverse
            calls use live API when credentials exist; audit + Monad receipt are
            simulated.
          </p>
          <RunFullDemoButton />
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-4 py-5 md:px-8 md:py-8">
        {currentStep && (
          <div className="mb-5 rounded-lg border border-[#3b494b] bg-[#122131] p-3 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#849495]">
                  Demo flow
                </p>
                <p className="mt-1 text-sm font-semibold text-[#d4e4fa]">
                  Step {currentStep} of 5
                </p>
              </div>
              <div className="max-w-[11rem] text-right text-xs font-semibold text-[#00dbe9]">
                {currentFlowStep?.[1]}
              </div>
            </div>
          </div>
        )}
        {currentStep && (
          <div className="mb-8 hidden overflow-x-auto rounded-lg border border-white/10 bg-[#1e293b]/35 p-3 backdrop-blur-xl md:block">
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
      <nav className="fixed bottom-0 left-0 z-30 w-full border-t border-[#3b494b] bg-[#1c2b3c] md:hidden">
        <div className="grid h-16 grid-cols-4 px-2">
          {mobileNavItems.map(({ label, href, Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
                  active ? "text-[#00dbe9]" : "text-[#b9cacb]"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {active && (
                  <span className="absolute right-5 top-2 h-2 w-2 rounded-full bg-[#00dbe9]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
