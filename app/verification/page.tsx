import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PageHeader, Panel, PrimaryLink } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function VerificationPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 1"
        title="A-Pass Identity Verification"
        description="Generate an A-Pass record for the builder identity and bind it to the agent wallet. This route is server-side and retries once with override enabled if Cleanverse returns code 1000."
      />
      <Panel>
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
