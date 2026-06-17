import { NextRequest, NextResponse } from "next/server";
import { addAuditEvent, getAuditEvents, resetAuditEvents } from "@/lib/audit-store";

export async function GET() {
  return NextResponse.json({ events: getAuditEvents() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  if (body.action === "reset") {
    return NextResponse.json({ events: resetAuditEvents() });
  }

  const event = addAuditEvent({
    label: body.label ?? "Payment requested",
    detail:
      body.detail ??
      "PayBot Alpha requested a payment authorization for the Monad demo.",
    status: body.status ?? "info",
    source: "demo",
  });

  return NextResponse.json({ event });
}
