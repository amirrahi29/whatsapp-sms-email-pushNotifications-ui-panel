import { cn } from "@/lib/utils";

const variants = {
  default:
    "border-transparent bg-primary/15 text-primary dark:bg-primary/20",
  secondary: "border-transparent bg-muted text-muted-foreground",
  outline: "border-border text-foreground",
  success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-200",
  admin: "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-300",
  supervisor:
    "border-transparent bg-sky-500/15 text-sky-800 dark:text-sky-200",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
