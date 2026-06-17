import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { generateApassWithRetry } from "@/lib/cleanverse";

export async function POST() {
  const result = await generateApassWithRetry();

  addAuditEvent({
    label: "A-Pass generated",
    detail: result.mocked
      ? "Demo A-Pass identity record generated locally."
      : `Cleanverse A-Pass response ${result.response.code}.`,
    status: result.ok ? "success" : "error",
    source: result.mocked ? "demo" : "cleanverse",
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
