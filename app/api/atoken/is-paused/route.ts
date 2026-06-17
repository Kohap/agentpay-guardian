import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { queryApassPaused } from "@/lib/cleanverse";

export async function POST() {
  const result = await queryApassPaused();

  addAuditEvent({
    label: "A-Token pause status checked",
    detail: result.mocked
      ? "A-Token status returned active in the demo."
      : `Cleanverse pause status response ${result.response.code}; A-Token is active.`,
    status: result.ok ? "success" : "error",
    source: result.mocked ? "demo" : "cleanverse",
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
