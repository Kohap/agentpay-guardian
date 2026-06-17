"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { StatusPill } from "@/components/ui";

const scenarios = [
  {
    label: "Run Valid Payment",
    title: "Payment Authorized",
    detail:
      "AgentPay Guardian approved this transaction after identity, rule, and risk checks.",
    tone: "success" as const,
    amount: "$450",
  },
  {
    label: "Run High-Risk Payment",
    title: "Payment Rejected",
    detail: "AML risk score is elevated and requires manual review.",
    tone: "error" as const,
    amount: "$450",
  },
  {
    label: "Run Over-Limit Payment",
    title: "Payment Rejected",
    detail: "Transaction exceeds the approved $2,000 agent limit.",
    tone: "error" as const,
    amount: "$2,750",
  },
  {
    label: "Run Unverified Agent Payment",
    title: "Payment Blocked",
    detail:
      "Agent must complete A-Pass verification and compliance checks before payment.",
    tone: "warning" as const,
    amount: "$450",
  },
];

export function PaymentSimulator() {
  const [scenario, setScenario] = useState(scenarios[0]);
  const Icon = scenario.tone === "success" ? CheckCircle2 : ShieldAlert;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <h2 className="text-xl font-semibold text-white">Failure Simulation</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Test cases prove the system blocks payments that fail identity, risk,
          or limit checks.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {scenarios.map((item) => (
            <button
              key={item.label}
              onClick={() => setScenario(item)}
              className={`rounded-md border px-3 py-3 text-left text-sm font-medium ${
                scenario.label === item.label
                  ? "border-electric/60 bg-electric/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`rounded-lg border p-5 ${
          scenario.tone === "success"
            ? "border-emerald-400/30 bg-emerald-400/10"
            : scenario.tone === "warning"
              ? "border-amber-400/30 bg-amber-400/10"
              : "border-rose-400/30 bg-rose-400/10"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <Icon className="h-9 w-9 shrink-0 text-white" />
          <StatusPill label={scenario.amount} tone={scenario.tone} />
        </div>
        <h3 className="mt-8 text-2xl font-semibold text-white">
          {scenario.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-100">
          {scenario.detail}
        </p>
        {scenario.tone !== "success" && (
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-200">
            <AlertTriangle className="h-4 w-4" />
            No transaction hash is created for rejected payments.
          </div>
        )}
      </div>
    </div>
  );
}
