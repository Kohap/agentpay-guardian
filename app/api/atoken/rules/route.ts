import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { queryApassRules } from "@/lib/cleanverse";

export async function POST() {
  const result = await queryApassRules();

  addAuditEvent({
    label: "A-Token rules checked",
    detail: result.mocked
      ? "Demo rule check confirmed agent subgroup AG and tier requirements."
      : `Cleanverse rules response ${result.response.code}.`,
    status: result.ok ? "success" : "error",
    source: result.mocked ? "demo" : "cleanverse",
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
