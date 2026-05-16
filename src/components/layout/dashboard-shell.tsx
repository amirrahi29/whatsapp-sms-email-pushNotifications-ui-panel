"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DemoBanner } from "@/components/ui/demo-banner";
import { PageEnter } from "@/components/ui/motion";
import { useUiStore } from "@/lib/stores/ui-store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullBleed = pathname === "/inbox";
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  return (
    <div className="flex h-[100dvh] min-h-0 overflow-hidden bg-background">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 animate-overlay-in bg-black/50 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <DashboardSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <DemoBanner />
        <DashboardHeader />
        <main
          className={
            fullBleed
              ? "min-h-0 flex-1 overflow-hidden"
              : "app-main-pattern min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-muted/20 p-3 sm:p-5 lg:p-6 dark:bg-background"
          }
        >
          <PageEnter key={pathname} subtle={fullBleed} className={fullBleed ? "h-full min-h-0" : undefined}>
            {children}
          </PageEnter>
        </main>
      </div>
    </div>
  );
}
