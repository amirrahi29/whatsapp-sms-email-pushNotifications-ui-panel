import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

/** Title + optional subtitle + right actions (dashboard pages). */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <FadeIn className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="app-h1">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <FadeIn delay={80} className="flex flex-wrap items-center gap-2">
          {actions}
        </FadeIn>
      ) : null}
    </FadeIn>
  );
}
