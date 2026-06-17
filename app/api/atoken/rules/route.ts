import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { queryApassRules } from "@/lib/cleanverse";

export async function POST() {
  const result = await queryApassRules();

  await addAuditEvent({
    label: "A-Token permission checked",
    detail: result.mocked
      ? "Transaction within allowed A-Token rule."
      : `Cleanverse rules response ${result.response.code}; transaction within allowed rule.`,
    status: result.ok ? "success" : "error",
    source: result.mocked ? "demo" : "cleanverse",
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
