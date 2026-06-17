import { AppShell } from "@/components/shell";
import { ReceiptCard } from "@/components/receipt/receipt-card";
import { PageHeader, Panel, PrimaryLink } from "@/components/ui";

export const dynamic = "force-dynamic";

export default function ReceiptPage() {
  return (
    <AppShell currentStep={4}>
      <PageHeader
        eyebrow="Transaction receipt"
        title="Professional Payment Receipt"
        description="A complete approval record for the agent payment, including compliance result, A-Token authorization, and simulated Monad transaction hash."
      />
      <Panel>
        <ReceiptCard />
      </Panel>
      <div className="mt-6">
        <PrimaryLink href="/audit">View audit trail</PrimaryLink>
      </div>
    </AppShell>
  );
}
