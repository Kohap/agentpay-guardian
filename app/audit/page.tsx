import { AppShell } from "@/components/shell";
import { AuditList } from "@/components/audit-list";
import { PageHeader, Panel } from "@/components/ui";

export default function AuditPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 5"
        title="Audit Trail"
        description="Cleanverse docs in hand do not show a dedicated audit-log endpoint, so these audit events are kept locally in server memory for the hackathon demo."
      />
      <Panel>
        <AuditList />
      </Panel>
    </AppShell>
  );
}
