import { randomUUID } from "crypto";

export type AuditStatus = "info" | "success" | "warning" | "error" | "pending";

export type AuditEvent = {
  id: string;
  label: string;
  detail: string;
  status: AuditStatus;
  timestamp: string;
  source: "demo" | "cleanverse";
};

const globalStore = globalThis as typeof globalThis & {
  __agentPayAuditEvents?: AuditEvent[];
};

const auditKey = process.env.AGENTPAY_AUDIT_KEY ?? "agentpay_guardian_audit";
const kvUrl = process.env.KV_REST_API_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

function initialEvents(): AuditEvent[] {
  return [
    {
      id: randomUUID(),
      label: "Agent profile loaded",
      detail: "PayBot Alpha initialized with a $2,000 transaction limit.",
      status: "success",
      timestamp: new Date().toISOString(),
      source: "demo",
    },
  ];
}

function hasKv() {
  return Boolean(kvUrl && kvToken);
}

async function kvCommand<T>(command: unknown[]) {
  if (!hasKv()) return null;

  const response = await fetch(kvUrl!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Audit KV command failed with ${response.status}`);
  }

  return (await response.json()) as { result: T };
}

async function writeEvents(events: AuditEvent[]) {
  if (hasKv()) {
    await kvCommand(["SET", auditKey, JSON.stringify(events)]);
    return;
  }

  globalStore.__agentPayAuditEvents = events;
}

export async function getAuditEvents() {
  if (hasKv()) {
    const stored = await kvCommand<string | null>(["GET", auditKey]);

    if (stored?.result) {
      return JSON.parse(stored.result) as AuditEvent[];
    }

    const events = initialEvents();
    await writeEvents(events);
    return events;
  }

  if (!globalStore.__agentPayAuditEvents) {
    globalStore.__agentPayAuditEvents = initialEvents();
  }

  return globalStore.__agentPayAuditEvents;
}

export async function addAuditEvent(
  event: Omit<AuditEvent, "id" | "timestamp">
) {
  const nextEvent = {
    ...event,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
  };

  const events = await getAuditEvents();
  events.unshift(nextEvent);
  await writeEvents(events);
  return nextEvent;
}

export async function resetAuditEvents() {
  const events = initialEvents();
  await writeEvents(events);
  return events;
}

export async function findLatestAuditEvent(label: string) {
  const events = await getAuditEvents();
  return events.find((event) => event.label === label);
}
