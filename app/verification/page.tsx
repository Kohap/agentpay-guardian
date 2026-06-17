import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { ApiLabel, PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function VerificationPage() {
  return (
    <AppShell currentStep={1}>
      <PageHeader
        eyebrow="Step 1"
        title="A-Pass Identity Verification"
        description="Generate an A-Pass record for the builder identity and bind it to the agent wallet. This route is server-side and retries once with override enabled if Cleanverse returns code 1000."
      />
      <Panel>
        <div className="mb-5 flex flex-wrap gap-2">
          <ApiLabel label="Real Cleanverse API Call" />
          <StatusPill ok label="A-Pass Verification: Real API" />
        </div>
        <ActionPanel
          title={`${demoAgent.agentName} identity packet`}
          description={`Builder ${demoAgent.builderName} is linked to customer ID ${demoAgent.customerId} and wallet ${demoAgent.walletAddress}.`}
          endpoint="/api/apass"
          buttonLabel="Generate A-Pass"
        />
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/payment">Continue to request</PrimaryLink>
      </div>
    </AppShell>
  );
}
