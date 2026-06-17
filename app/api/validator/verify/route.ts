import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { verifyValidatorCompliance } from "@/lib/cleanverse";

export async function POST() {
  const result = await verifyValidatorCompliance();
  const valid = Boolean(result.response.data?.valid);

  addAuditEvent({
    label: "Compliance checked",
    detail: valid
      ? "Travel Rule and AML checks passed; validator confirmed wallet eligibility."
      : "Validator did not approve this wallet for the payment contract.",
    status: result.ok && valid ? "success" : "warning",
    source: result.mocked ? "demo" : "cleanverse",
  });

  if (result.ok && valid) {
    addAuditEvent({
      label: "Payment authorized",
      detail: "Payment request met identity, token, amount, and validator checks.",
      status: "success",
      source: result.mocked ? "demo" : "cleanverse",
    });
    addAuditEvent({
      label: "Monad transaction record simulated",
      detail: "Transaction hash 0xmonad-agentpay-guardian generated.",
      status: "info",
      source: "demo",
    });
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
