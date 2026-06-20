import { AppShell } from "@/components/shell";
import { AuditList } from "@/components/audit-list";

export default function AuditPage() {
  return (
    <AppShell currentStep={5}>
      <AuditList />
    </AppShell>
  );
}
