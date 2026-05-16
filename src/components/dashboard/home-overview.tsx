"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Inbox,
  Kanban,
  Layers,
  Megaphone,
  Settings,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { chatThreads, contacts, campaigns, channelVolumeToday } from "@/data/mock";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { FadeIn } from "@/components/ui/motion";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { CHANNEL_ORDER, channelMeta, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/stores/ui-store";

type ModuleCard = {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
  channelFilter?: ChannelId | "all";
};

const modules: ModuleCard[] = [
  {
    href: "/channels",
    icon: Layers,
    title: "Channel hub",
    subtitle: "Connections & health",
    desc: "WhatsApp, SMS, Email, Push — provider status, compliance, volume.",
    color: "from-primary/25 to-emerald-500/10 text-primary",
  },
  {
    href: "/inbox",
    icon: Inbox,
    title: "Unified inbox",
    subtitle: "Sab channels ek jagah",
    desc: "Channel filter se WhatsApp / SMS / Email / Push conversations dekhein.",
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-700 dark:text-emerald-300",
    channelFilter: "all",
  },
  {
    href: "/contacts",
    icon: Users,
    title: "Contacts",
    subtitle: "Omnichannel audiences",
    desc: "Phone, email, device tokens — segmentation har channel ke liye.",
    color: "from-sky-500/20 to-blue-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    href: "/campaigns",
    icon: Megaphone,
    title: "Outbound",
    subtitle: "Multi-channel sends",
    desc: "Campaigns per channel — templates, quiet hours, delivery funnels.",
    color: "from-fuchsia-500/20 to-purple-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  },
  {
    href: "/automation",
    icon: Bot,
    title: "Automation",
    subtitle: "Cross-channel journeys",
    desc: "Trigger on any channel → reply on best channel (fallback rules).",
    color: "from-violet-500/20 to-indigo-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    href: "/pipeline",
    icon: Kanban,
    title: "Pipeline",
    subtitle: "Sales stages",
    desc: "Leads from WhatsApp ads, email replies, SMS — ek pipeline.",
    color: "from-amber-500/20 to-orange-500/10 text-amber-800 dark:text-amber-200",
  },
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Analytics",
    subtitle: "By channel",
    desc: "Delivery, open, read, tap rates — channel comparison dashboard.",
    color: "from-cyan-500/20 to-teal-500/10 text-cyan-800 dark:text-cyan-200",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
    subtitle: "Integrations",
    desc: "Meta, Twilio, SendGrid, FCM — API keys & webhooks.",
    color: "from-zinc-500/20 to-zinc-400/10 text-zinc-700 dark:text-zinc-300",
  },
];

const steps = [
  {
    n: "1",
    title: "Channels connect karo",
    body: "Channel hub se WhatsApp, SMS, Email, Push providers link karein.",
  },
  {
    n: "2",
    title: "Unified inbox use karo",
    body: "Har channel ki conversations ek list — filter se segregate karein.",
  },
  {
    n: "3",
    title: "Outbound + analytics",
    body: "Channel-specific campaigns bhejo, phir delivery metrics compare karo.",
  },
];

export function HomeOverview() {
  const setInboxChannelFilter = useUiStore((s) => s.setInboxChannelFilter);
  const unread = chatThreads.reduce((s, t) => s + t.unread, 0);
  const activeCampaigns = campaigns.filter(
    (c) => c.status === "scheduled" || c.status === "sent"
  ).length;

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Home"
        description="Omnichannel CRM — WhatsApp, SMS, Email, Push. Har channel alag policy; inbox aur analytics unified."
        actions={
          <Link
            href="/inbox"
            onClick={() => setInboxChannelFilter("all")}
            className="app-btn-primary"
          >
            <Inbox className="size-4" />
            Unified inbox
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <FadeIn delay={60} className="app-surface app-surface--hover relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-card p-5 sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 animate-float rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Omnichannel · industry layout
            </p>
            <h2 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
              Ek platform — char channels — clear segregation
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Braze / Iterable / Zendesk jaisa pattern: channels alag configure, inbox
              unified, outbound per-channel templates, analytics side-by-side.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CHANNEL_ORDER.map((id) => (
                <ChannelBadge key={id} channel={id} size="md" />
              ))}
            </div>
          </div>
          <Link href="/channels" className="app-btn-secondary shrink-0">
            Channel hub
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </FadeIn>

      <div className="stagger-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open conversations" value={String(chatThreads.length)} hint="All channels" accent="strong" />
        <StatCard label="Unread" value={String(unread)} hint="Unified inbox" accent="strong" />
        <StatCard label="Contacts" value={String(contacts.length)} hint="Cross-channel" accent="strong" />
        <StatCard label="Active campaigns" value={String(activeCampaigns)} hint="Outbound" accent="strong" />
      </div>

      <section>
        <p className="app-section-label">Channel volume today</p>
        <div className="stagger-grid mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channelVolumeToday.map((row) => (
            <Link
              key={row.channel}
              href="/inbox"
              onClick={() => setInboxChannelFilter(row.channel)}
              className="app-surface app-surface--hover flex items-center justify-between gap-3 p-4"
            >
              <div>
                <ChannelBadge channel={row.channel} size="md" />
                <p className="mt-2 text-xl font-semibold tabular-nums">
                  {row.volume.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">messages</p>
              </div>
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  row.changePct >= 0 ? "text-emerald-600" : "text-amber-600"
                )}
              >
                {row.changePct > 0 ? "+" : ""}
                {row.changePct}%
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="app-section-label">Product areas</p>
        <div className="stagger-grid mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((m) => (
            <ModuleLink key={m.href} {...m} onChannelNav={setInboxChannelFilter} />
          ))}
        </div>
      </section>

      <div className="stagger-grid grid gap-4 lg:grid-cols-[1fr_minmax(0,320px)]">
        <div className="app-surface app-surface--hover p-5 sm:p-6">
          <p className="app-section-label">Shuru kaise karein</p>
          <ol className="mt-4 space-y-4">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="app-surface app-surface--hover flex flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="app-section-label">Channel quick links</p>
            <ul className="mt-3 space-y-2">
              {CHANNEL_ORDER.map((id) => (
                <li key={id}>
                  <Link
                    href="/inbox"
                    onClick={() => setInboxChannelFilter(id)}
                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <span className="font-medium">{channelMeta(id).label}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/campaigns/new"
            className="app-btn-primary mt-6 w-full justify-center sm:mt-4"
          >
            New multi-channel campaign
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ModuleLink({
  href,
  icon: Icon,
  title,
  subtitle,
  desc,
  color,
  channelFilter,
  onChannelNav,
}: ModuleCard & { onChannelNav: (c: ChannelId | "all") => void }) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (channelFilter) onChannelNav(channelFilter);
      }}
      className="app-surface app-surface--hover group flex flex-col p-4 sm:p-5"
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl bg-gradient-to-br",
          color
        )}
      >
        <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <p className="mt-4 font-semibold tracking-tight">{title}</p>
      <p className="text-xs font-medium text-primary">{subtitle}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        Open
        <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}
