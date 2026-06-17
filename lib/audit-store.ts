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

export function getAuditEvents() {
  if (!globalStore.__agentPayAuditEvents) {
    globalStore.__agentPayAuditEvents = initialEvents();
  }

  return globalStore.__agentPayAuditEvents;
}

export function addAuditEvent(
  event: Omit<AuditEvent, "id" | "timestamp">
) {
  const nextEvent = {
    ...event,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
  };

  getAuditEvents().unshift(nextEvent);
  return nextEvent;
}

export function resetAuditEvents() {
  globalStore.__agentPayAuditEvents = initialEvents();
  return globalStore.__agentPayAuditEvents;
}
