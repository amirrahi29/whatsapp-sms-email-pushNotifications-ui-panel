import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  /** Stronger top accent + extra top padding. */
  accent?: "soft" | "strong";
  className?: string;
};

export function StatCard({ label, value, hint, accent = "soft", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "app-surface app-surface--hover relative overflow-hidden p-4",
        accent === "strong" && "pt-5",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0" />
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
