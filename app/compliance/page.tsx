import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PageHeader, Panel, PrimaryLink } from "@/components/ui";
import { demoAgent } from "@/lib/demo-data";

export default function CompliancePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 3"
        title="A-Token Authorization"
        description="Check A-Token rules, paused status, and validator compliance through server API routes that are ready for live Cleanverse credentials."
      />
      <div className="grid gap-5">
        <Panel>
          <ActionPanel
            title="Query A-Token rules"
            description={`Read compliance rules for ${demoAgent.atokenAddress} on Monad.`}
            endpoint="/api/atoken/rules"
            buttonLabel="Check rules"
          />
        </Panel>
        <Panel>
          <ActionPanel
            title="Check paused status"
            description="Confirm the A-Token has not been paused before authorizing payment."
            endpoint="/api/atoken/is-paused"
            buttonLabel="Check status"
          />
        </Panel>
        <Panel>
          <ActionPanel
            title="Verify validator compliance"
            description={`Verify wallet ${demoAgent.walletAddress} against payment contract ${demoAgent.poolContractAddress}.`}
            endpoint="/api/validator/verify"
            buttonLabel="Verify compliance"
          />
        </Panel>
      </div>
      <div className="mt-6">
        <PrimaryLink href="/approval">View approval</PrimaryLink>
      </div>
    </AppShell>
  );
}
