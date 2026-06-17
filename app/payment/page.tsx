import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function PaymentPage() {
  return (
    <AppShell currentStep={2}>
      <PageHeader
        eyebrow="Step 2"
        title="AI Agent Payment Request"
        description="Record the payment intent before token and validator checks run. This is local demo state because the available Cleanverse docs do not include an audit-log endpoint."
      />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-5">
          <StatusPill label="Before compliance" tone="warning" />
          <h2 className="mt-5 text-2xl font-semibold text-white">
            Payment Blocked
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-100">
            Agent must complete A-Pass verification and compliance checks before
            payment.
          </p>
        </div>
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-5">
          <StatusPill label="After compliance" tone="success" />
          <h2 className="mt-5 text-2xl font-semibold text-white">
            Payment Authorized
          </h2>
          <p className="mt-2 text-sm leading-6 text-emerald-100">
            AgentPay Guardian approves only after identity, rule, and risk
            checks pass.
          </p>
        </div>
      </div>
      <Panel>
        <ActionPanel
          title={`${demoAgent.amount} ${demoAgent.currency} to ${demoAgent.merchant}`}
          description={`${demoAgent.agentName} requests authorization from wallet ${demoAgent.walletAddress}.`}
          endpoint="/api/audit"
          buttonLabel="Record payment request"
          body={{
            label: "Payment requested",
            detail: `${demoAgent.agentName} requested ${demoAgent.amount} ${demoAgent.currency} for ${demoAgent.merchant}.`,
            status: "pending",
          }}
        />
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/compliance">Run compliance</PrimaryLink>
      </div>
    </AppShell>
  );
}
