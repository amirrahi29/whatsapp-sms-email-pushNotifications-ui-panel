"use client";

import { useEffect, useLayoutEffect } from "react";
import { useUiStore, type ThemeMode } from "@/lib/stores/ui-store";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = mode === "dark" || (mode === "system" && systemDark);
  root.classList.toggle("dark", dark);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useUiStore((s) => s.theme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (useUiStore.getState().theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <>{children}</>;
}
