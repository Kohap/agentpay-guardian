import { AppShell } from "@/components/shell";
import { ActionPanel } from "@/components/action-panel";
import { PaymentSimulator } from "@/components/payment-simulator";
import { ApiLabel, PageHeader, Panel, PrimaryLink, StatusPill } from "@/components/ui";
import { complianceChecklist, demoAgent } from "@/lib/demo-data";

export default function CompliancePage() {
  return (
    <AppShell currentStep={3}>
      <PageHeader
        eyebrow="Step 3"
        title="A-Token Authorization"
        description="Check A-Token rules, paused status, and validator compliance through server API routes that are ready for live Cleanverse credentials."
      />
      <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["A-Pass Verification", "Real Cleanverse API Call"],
          ["A-Token Rules", "Real Cleanverse API Call"],
          ["Validator", "Real Cleanverse API Call"],
          ["Monad Transaction", "Demo Mock"],
        ].map(([label, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-3 text-sm font-semibold text-white">{label}</p>
            <ApiLabel label={status} />
          </div>
        ))}
      </div>
      <Panel>
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">
            Visible Compliance Checklist
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Payment approval stays blocked until every required control passes.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {complianceChecklist.map(([label, status]) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <span className="text-sm font-medium text-white">{label}</span>
              <StatusPill ok label={status} />
            </div>
          ))}
        </div>
      </Panel>
      <div className="mt-5 grid gap-5">
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
        <Panel>
          <PaymentSimulator />
        </Panel>
      </div>
      <div className="mt-6">
        <PrimaryLink href="/approval">View approval</PrimaryLink>
      </div>
    </AppShell>
  );
}
