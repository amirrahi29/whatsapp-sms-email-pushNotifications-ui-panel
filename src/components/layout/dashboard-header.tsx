"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Laptop,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore, type ThemeMode } from "@/lib/stores/ui-store";
import { agentById, agents } from "@/data/mock";
import { useClickOutside } from "@/hooks/use-click-outside";
import { initials } from "@/lib/format";

const TITLES: Record<string, string> = {
  "/home": "Home",
  "/channels": "Channels",
  "/inbox": "Unified inbox",
  "/contacts": "Contacts",
  "/campaigns": "Outbound",
  "/campaigns/new": "New campaign",
  "/automation": "Automation",
  "/pipeline": "Pipeline",
  "/analytics": "Analytics",
  "/team": "Team",
  "/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const title =
    TITLES[pathname] ??
    (pathname.startsWith("/campaigns") ? "Outbound" : "Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const online = useUiStore((s) => s.online);
  const setOnline = useUiStore((s) => s.setOnline);
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const currentAgentId = useUiStore((s) => s.currentAgentId);
  const sessionAgent =
    agentById(currentAgentId) ?? agentById("a2") ?? agents[0]!;

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeNotif = useCallback(() => setNotifOpen(false), []);
  useClickOutside(menuRef, closeMenu, menuOpen);
  useClickOutside(notifRef, closeNotif, notifOpen);

  const themeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Laptop },
  ];

  return (
    <header className="sticky top-0 z-30 flex min-h-14 shrink-0 items-center gap-2 border-b border-border/80 bg-background/80 px-3 py-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-background/70 sm:h-14 sm:gap-3 sm:px-4 sm:py-0">
      <button
        type="button"
        onClick={() => setMobileNavOpen(true)}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {title && (
        <h1 className="hidden min-w-0 max-w-[8rem] shrink-0 truncate text-base font-semibold tracking-tight text-foreground sm:max-w-[11rem] md:block lg:max-w-xs">
          {title}
        </h1>
      )}

      <div className="relative min-w-0 flex-1 px-1 sm:px-2">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground sm:left-3" />
        <input
          type="search"
          placeholder="Search…"
          className="app-input h-9 w-full py-0 pl-9 sm:h-10 sm:pl-10 sm:pr-4"
          readOnly
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => setOnline(!online)}
          className={cn(
            "flex size-10 items-center justify-center rounded-xl border transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-px sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-1.5",
            online
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-sm shadow-emerald-500/15 dark:text-emerald-300"
              : "border-border bg-muted text-muted-foreground"
          )}
          aria-pressed={online}
        >
          {online ? (
            <Wifi className="size-[18px] sm:size-3.5" />
          ) : (
            <WifiOff className="size-[18px] sm:size-3.5" />
          )}
          <span className="hidden text-xs font-medium sm:inline">
            {online ? "Online" : "Offline"}
          </span>
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-1.5 top-1.5 size-2 animate-pulse-soft rounded-full bg-primary ring-2 ring-card" />
          </button>
          {notifOpen && (
            <div className="fixed left-3 right-3 top-16 z-50 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-card)] lg:absolute lg:inset-x-auto lg:left-auto lg:right-0 lg:top-full lg:mt-2 lg:w-80 lg:rounded-xl">
              <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                Notifications
              </p>
              <ul className="max-h-[min(18rem,50vh)] space-y-1 overflow-y-auto text-sm">
                {[
                  "New message from Acme Retail",
                  "Spring promo completed",
                  "Assigned: Elena",
                ].map((t) => (
                  <li
                    key={t}
                    className="cursor-default rounded-lg px-2 py-2.5 text-foreground/90 hover:bg-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-1 rounded-xl py-1 pl-1 pr-1.5 transition-colors hover:bg-muted sm:pr-2"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-600 text-xs font-semibold text-primary-foreground shadow-sm">
              {initials(sessionAgent.name)}
            </span>
            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="fixed left-3 right-3 top-16 z-50 rounded-xl border border-border bg-card py-1 shadow-[var(--shadow-card)] lg:absolute lg:inset-x-auto lg:left-auto lg:right-0 lg:top-full lg:mt-2 lg:w-56"
            >
              <div className="border-b border-border px-3 py-2">
                <p className="text-sm font-medium">{sessionAgent.name}</p>
                <p className="truncate text-xs text-muted-foreground">{sessionAgent.email}</p>
              </div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <User className="size-4 shrink-0 text-muted-foreground" />
                Profile
              </button>
              <div className="px-2 py-1">
                <p className="px-1 pb-1 text-xs font-medium text-muted-foreground">Theme</p>
                <div className="flex gap-1">
                  {themeOptions.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTheme(id)}
                      className={cn(
                        "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium",
                        theme === id
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="size-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-muted"
              >
                <LogOut className="size-4" />
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
