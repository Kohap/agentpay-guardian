"use client";

import { useState } from "react";
import { JsonBlock, LoadingButton, StatusPill } from "@/components/ui";

export function ActionPanel({
  title,
  description,
  endpoint,
  buttonLabel,
  body,
}: {
  title: string;
  description: string;
  endpoint: string;
  buttonLabel: string;
  body?: unknown;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const resultRecord = result as
    | { ok?: boolean; mocked?: boolean; event?: { source?: string } }
    | null;
  const isAuditEvent = resultRecord?.event?.source === "demo";
  const isOk = isAuditEvent || Boolean(resultRecord?.ok);
  const label = isAuditEvent
    ? "Local audit event"
    : resultRecord?.mocked
      ? "Demo result"
      : "Live Cleanverse result";

  async function run() {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await response.json();
      setResult(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <LoadingButton loading={loading} onClick={run}>
          {buttonLabel}
        </LoadingButton>
      </div>
      {Boolean(result) && (
        <div className="space-y-3">
          <StatusPill ok={isOk} label={label} />
          <JsonBlock data={result} />
        </div>
      )}
    </div>
  );
}
