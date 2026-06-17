import { NextResponse } from "next/server";
import { addAuditEvent, resetAuditEvents } from "@/lib/audit-store";
import {
  generateApassWithRetry,
  queryApassPaused,
  queryApassRules,
  verifyValidatorCompliance,
} from "@/lib/cleanverse";
import { demoAgent } from "@/lib/demo-data";

export async function POST() {
  await resetAuditEvents();

  const apass = await generateApassWithRetry();
  await addAuditEvent({
    label: "A-Pass generated",
    detail: apass.mocked
      ? "Identity verified with demo A-Pass response."
      : `Identity verified with Cleanverse A-Pass response ${apass.response.code}.`,
    status: apass.ok ? "success" : "error",
    source: apass.mocked ? "demo" : "cleanverse",
  });

  await addAuditEvent({
    label: "Payment requested",
    detail: `${demoAgent.agentName} requested ${demoAgent.amount} ${demoAgent.currency} for ${demoAgent.merchant}.`,
    status: "pending",
    source: "demo",
  });

  const rules = await queryApassRules();
  await addAuditEvent({
    label: "A-Token permission checked",
    detail: rules.mocked
      ? "Transaction within allowed A-Token rule."
      : `Cleanverse rules response ${rules.response.code}; transaction within allowed rule.`,
    status: rules.ok ? "success" : "error",
    source: rules.mocked ? "demo" : "cleanverse",
  });

  const paused = await queryApassPaused();
  await addAuditEvent({
    label: "A-Token pause status checked",
    detail: paused.mocked
      ? "A-Token status returned active in the demo."
      : `Cleanverse pause status response ${paused.response.code}; A-Token is active.`,
    status: paused.ok ? "success" : "error",
    source: paused.mocked ? "demo" : "cleanverse",
  });

  const validator = await verifyValidatorCompliance();
  const valid = Boolean(validator.response.data?.valid);
  await addAuditEvent({
    label: "Compliance checked",
    detail: valid
      ? "Travel Rule and AML checks passed; validator confirmed wallet eligibility."
      : "Validator did not approve this wallet for the payment contract.",
    status: validator.ok && valid ? "success" : "warning",
    source: validator.mocked ? "demo" : "cleanverse",
  });

  if (validator.ok && valid) {
    await addAuditEvent({
      label: "Payment authorized",
      detail: "Payment request met identity, token, amount, and validator checks.",
      status: "success",
      source: validator.mocked ? "demo" : "cleanverse",
    });
    await addAuditEvent({
      label: "Monad transaction record simulated",
      detail: `Transaction hash ${demoAgent.transactionHash} generated.`,
      status: "success",
      source: "demo",
    });
  }

  return NextResponse.json({
    ok: validator.ok && valid,
    steps: { apass, rules, paused, validator },
    next: "/audit",
  });
}
