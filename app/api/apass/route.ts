import { NextResponse } from "next/server";
import { addAuditEvent } from "@/lib/audit-store";
import { generateApassWithRetry } from "@/lib/cleanverse";

export async function POST() {
  const result = await generateApassWithRetry();

  await addAuditEvent({
    label: "A-Pass generated",
    detail: result.mocked
      ? "Identity verified with demo A-Pass response."
      : `Identity verified with Cleanverse A-Pass response ${result.response.code}.`,
    status: result.ok ? "success" : "error",
    source: result.mocked ? "demo" : "cleanverse",
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
