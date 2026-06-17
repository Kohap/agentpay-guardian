import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PageHeader, Panel, PrimaryLink } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function PaymentPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 2"
        title="AI Agent Payment Request"
        description="Record the payment intent before token and validator checks run. This is local demo state because the available Cleanverse docs do not include an audit-log endpoint."
      />
      <Panel>
        <ActionPanel
          title={`${demoAgent.amount} ${demoAgent.currency} to ${demoAgent.merchant}`}
          description={`${demoAgent.agentName} requests authorization from wallet ${demoAgent.walletAddress}.`}
          endpoint="/api/audit"
          buttonLabel="Record payment request"
          body={{
            label: "Payment requested",
            detail: `${demoAgent.agentName} requested ${demoAgent.amount} ${demoAgent.currency} for ${demoAgent.merchant}.`,
            status: "info",
          }}
        />
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/compliance">Run compliance</PrimaryLink>
      </div>
    </AppShell>
  );
}
