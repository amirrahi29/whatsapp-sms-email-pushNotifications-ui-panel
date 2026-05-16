"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  ChevronLeft,
  ChevronRight,
  Home,
  Inbox,
  Kanban,
  Layers,
  Mail,
  Megaphone,
  MessageCircle,
  Settings,
  Smartphone,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/stores/ui-store";
import {
  CHANNEL_ORDER,
  channelMeta,
  type ChannelFilter,
  type ChannelId,
} from "@/lib/channels";

type NavLink = {
  href: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  channelFilter?: ChannelFilter;
};

type NavGroup = { title: string; items: NavLink[] };

const channelIcons: Record<ChannelId, LucideIcon> = {
  whatsapp: MessageCircle,
  sms: Smartphone,
  email: Mail,
  push: Bell,
};

const navGroups: NavGroup[] = [
  {
    title: "Start",
    items: [{ href: "/home", label: "Home", hint: "Overview", icon: Home }],
  },
  {
    title: "Inbox",
    items: [
      {
        href: "/inbox",
        label: "Unified inbox",
        hint: "All channels",
        icon: Inbox,
        channelFilter: "all",
      },
    ],
  },
  {
    title: "Channels",
    items: [
      {
        href: "/channels",
        label: "Channel hub",
        hint: "Connections",
        icon: Layers,
      },
      ...CHANNEL_ORDER.map((id) => ({
        href: "/inbox",
        label: channelMeta(id).label,
        hint: channelMeta(id).shortLabel,
        icon: channelIcons[id],
        channelFilter: id as ChannelFilter,
      })),
    ],
  },
  {
    title: "Engage",
    items: [
      { href: "/contacts", label: "Contacts", hint: "Audiences", icon: Users },
      {
        href: "/campaigns",
        label: "Outbound",
        hint: "Multi-channel",
        icon: Megaphone,
      },
      { href: "/automation", label: "Automation", hint: "Journeys", icon: Bot },
      { href: "/pipeline", label: "Pipeline", hint: "Sales", icon: Kanban },
    ],
  },
  {
    title: "Insights",
    items: [
      { href: "/analytics", label: "Analytics", hint: "By channel", icon: BarChart3 },
    ],
  },
  {
    title: "Admin",
    items: [
      { href: "/team", label: "Team", hint: "Agents", icon: UsersRound },
      { href: "/settings", label: "Settings", hint: "Integrations", icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const inboxChannelFilter = useUiStore((s) => s.inboxChannelFilter);
  const setInboxChannelFilter = useUiStore((s) => s.setInboxChannelFilter);
  const showLabels = !collapsed || mobileNavOpen;

  function afterNavClick() {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      setMobileNavOpen(false);
    }
  }

  function isActive(item: NavLink) {
    if (item.href === "/home") return pathname === "/home";
    if (item.href === "/channels") return pathname === "/channels";
    if (item.href === "/inbox" && item.channelFilter) {
      return pathname === "/inbox" && inboxChannelFilter === item.channelFilter;
    }
    if (item.href === "/inbox") {
      return pathname === "/inbox" && inboxChannelFilter === "all";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  function onNav(item: NavLink, e: React.MouseEvent) {
    if (item.channelFilter !== undefined) {
      e.preventDefault();
      setInboxChannelFilter(item.channelFilter);
      afterNavClick();
      router.push("/inbox");
    }
  }

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "fixed inset-y-0 left-0 z-50 w-[min(288px,calc(100vw-2.5rem))] max-w-[300px] shadow-2xl shadow-black/10 dark:shadow-black/50 lg:static lg:z-auto lg:max-w-none lg:shadow-none",
        mobileNavOpen ? "translate-x-0 animate-slide-in-left lg:animate-none" : "-translate-x-full lg:translate-x-0",
        collapsed ? "lg:w-[72px]" : "lg:w-[252px]"
      )}
    >
      <div className="flex h-14 min-w-0 shrink-0 items-center gap-2.5 border-b border-sidebar-border bg-sidebar-muted/40 px-3 dark:bg-sidebar-muted/25">
        <Link
          href="/home"
          onClick={afterNavClick}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg outline-none ring-ring focus-visible:ring-2"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-emerald-600 to-teal-600 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25">
            N
          </div>
          {showLabels && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-tight">Nexus Reach</p>
              <p className="truncate text-[10px] text-sidebar-foreground/55">
                Omnichannel CRM
              </p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-2">
        {navGroups.map((group) => (
          <div key={group.title}>
            {showLabels ? (
              <p className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/45">
                {group.title}
              </p>
            ) : (
              <div className="mx-auto my-1 hidden h-px w-8 bg-sidebar-border lg:block" aria-hidden />
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                const isChannel =
                  item.channelFilter && item.channelFilter !== "all";
                const dotClass = isChannel
                  ? channelMeta(item.channelFilter as ChannelId).dotClass
                  : null;

                return (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      title={!showLabels ? item.label : undefined}
                      onClick={(e) => {
                        onNav(item, e);
                        if (!item.channelFilter) afterNavClick();
                      }}
                      className={cn(
                        "group flex min-h-10 items-center gap-3 rounded-lg border-l-2 border-transparent py-2 pl-2.5 pr-2 text-sm font-medium transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out active:scale-[0.98]",
                        !showLabels && "lg:justify-center lg:px-0",
                        active
                          ? "nav-active-pill border-primary bg-primary/12 text-sidebar-foreground shadow-sm ring-1 ring-primary/10 dark:bg-white/[0.06] dark:ring-white/10"
                          : "text-sidebar-foreground/70 hover:translate-x-0.5 hover:bg-sidebar-muted hover:text-sidebar-foreground"
                      )}
                    >
                      <span className="relative shrink-0">
                        <Icon
                          className={cn(
                            "size-[18px] transition-[transform,color] duration-200 group-hover:scale-110",
                            active
                              ? "text-primary"
                              : "text-sidebar-foreground/55 group-hover:text-sidebar-foreground"
                          )}
                        />
                        {dotClass && showLabels ? (
                          <span
                            className={cn(
                              "absolute -bottom-0.5 -right-0.5 size-2 rounded-full ring-2 ring-sidebar",
                              dotClass
                            )}
                          />
                        ) : null}
                      </span>
                      {showLabels && (
                        <span className="min-w-0 flex-1 truncate">
                          <span className="block truncate">{item.label}</span>
                          {item.hint ? (
                            <span className="block truncate text-[10px] font-normal text-sidebar-foreground/45 group-hover:text-sidebar-foreground/55">
                              {item.hint}
                            </span>
                          ) : null}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-muted hover:text-sidebar-foreground lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
