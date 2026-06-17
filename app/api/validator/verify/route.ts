import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { verifyValidatorCompliance } from "@/lib/cleanverse";

export async function POST() {
  const result = await verifyValidatorCompliance();
  const valid = Boolean(result.response.data?.valid);

  addAuditEvent({
    label: "Validator compliance checked",
    detail: valid
      ? "Validator confirmed the wallet can interact with the payment contract."
      : "Validator did not approve this wallet for the payment contract.",
    status: result.ok && valid ? "success" : "warning",
    source: result.mocked ? "demo" : "cleanverse",
  });

  if (result.ok && valid) {
    addAuditEvent({
      label: "Payment authorized",
      detail: "Payment request met identity, token, and validator checks.",
      status: "success",
      source: result.mocked ? "demo" : "cleanverse",
    });
    addAuditEvent({
      label: "Monad transaction record simulated",
      detail: "Demo transaction hash 0xmonad-agentpay-guardian was recorded.",
      status: "info",
      source: "demo",
    });
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
