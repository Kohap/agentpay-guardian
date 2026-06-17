import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";

type Tone = "success" | "warning" | "error" | "info";

const toneClasses: Record<Tone, string> = {
  success: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  error: "border-rose-400/40 bg-rose-400/10 text-rose-200",
  info: "border-sky-400/40 bg-sky-400/10 text-sky-200",
};

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-electric">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-normal text-white md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
      {children}
    </section>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sky-300"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function StatusPill({
  ok,
  label,
  tone,
}: {
  ok?: boolean;
  label: string;
  tone?: Tone;
}) {
  const resolvedTone = tone ?? (ok ? "success" : "info");
  const Icon =
    resolvedTone === "error"
      ? XCircle
      : resolvedTone === "warning"
        ? Clock3
        : CheckCircle2;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium ${toneClasses[resolvedTone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function ApiLabel({ label }: { label: string }) {
  const tone =
    label === "Real Cleanverse API Call"
      ? "success"
      : label === "Pending API Integration"
        ? "warning"
        : "info";

  return <StatusPill label={label} tone={tone} />;
}

export function LoadingButton({
  loading,
  children,
  onClick,
}: {
  loading: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function JsonBlock({ data }: { data: unknown }) {
  return (
    <pre className="max-h-[28rem] overflow-auto rounded-lg border border-white/10 bg-black/30 p-4 text-xs leading-6 text-slate-200">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
