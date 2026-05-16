"use client";

import { Info, X } from "lucide-react";
import Link from "next/link";
import { useUiStore } from "@/lib/stores/ui-store";

export function DemoBanner() {
  const dismissed = useUiStore((s) => s.demoBannerDismissed);
  const setDemoBannerDismissed = useUiStore((s) => s.setDemoBannerDismissed);

  if (dismissed) return null;

  return (
    <div
      role="status"
      className="flex shrink-0 animate-slide-down items-start gap-3 border-b border-primary/20 bg-gradient-to-r from-primary/[0.08] via-primary/[0.04] to-transparent px-3 py-2.5 sm:items-center sm:px-4"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0" aria-hidden />
      <p className="min-w-0 flex-1 text-xs leading-relaxed text-foreground/90 sm:text-sm">
        <span className="font-semibold text-foreground">Omnichannel demo</span>
        {" — "}
        WhatsApp, SMS, Email, Push — sample data. Production mein har channel alag API se connect hoga.{" "}
        <Link href="/home" className="font-medium text-primary hover:underline">
          Home
        </Link>{" "}
        par poora app map dekhein.
      </p>
      <button
        type="button"
        onClick={() => setDemoBannerDismissed(true)}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Dismiss demo notice"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
