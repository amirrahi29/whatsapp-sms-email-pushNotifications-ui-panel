"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Plug,
  Settings,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { ChannelBadge } from "@/components/channels/channel-badge";
import {
  CHANNEL_ORDER,
  channelMeta,
  type ChannelId,
} from "@/lib/channels";
import { channelConfigs, channelVolumeToday } from "@/data/mock";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/stores/ui-store";

const statusStyle = {
  connected: "text-emerald-600 dark:text-emerald-400",
  degraded: "text-amber-600 dark:text-amber-400",
  setup: "text-muted-foreground",
} as const;

export function ChannelsHub() {
  const setInboxChannelFilter = useUiStore((s) => s.setInboxChannelFilter);

  function openInbox(channel: ChannelId | "all") {
    setInboxChannelFilter(channel);
  }

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Channels"
        description="WhatsApp, SMS, Email aur Push — alag-alag configure karein, ek unified inbox se operate karein."
        actions={
          <Link href="/settings" className="app-btn-secondary">
            <Settings className="size-4" />
            Integrations
          </Link>
        }
      />

      <div className="app-surface border-primary/15 bg-gradient-to-br from-primary/[0.06] via-card to-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Omnichannel architecture
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              Har channel alag policy · ek team inbox
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Industry standard: channel-specific compliance (WABA, TCPA, CAN-SPAM, push
              consent) alag rakhein; routing, assignment aur analytics unified rakhein.
            </p>
          </div>
          <Link
            href="/inbox"
            onClick={() => openInbox("all")}
            className="app-btn-primary shrink-0"
          >
            Unified inbox
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="stagger-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {channelVolumeToday.map((row) => (
          <StatCard
            key={row.channel}
            label={`${channelMeta(row.channel).label} today`}
            value={row.volume.toLocaleString()}
            hint={`${row.changePct > 0 ? "+" : ""}${row.changePct}% vs yesterday`}
            accent="strong"
          />
        ))}
      </div>

      <p className="app-section-label">Channel connections</p>
      <div className="stagger-grid grid gap-4 lg:grid-cols-2">
        {CHANNEL_ORDER.map((channelId) => {
          const meta = channelMeta(channelId);
          const config = channelConfigs.find((c) => c.channel === channelId)!;
          const Icon = meta.icon;
          const vol = channelVolumeToday.find((v) => v.channel === channelId);

          return (
            <article
              key={channelId}
              className="app-surface app-surface--hover overflow-hidden"
            >
              <div className="flex items-start gap-4 border-b border-border/60 p-5">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                    meta.accent
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold tracking-tight">{meta.label}</h3>
                    <ChannelBadge channel={channelId} />
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        statusStyle[config.status]
                      )}
                    >
                      {config.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{meta.description}</p>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-3 p-5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Provider</dt>
                  <dd className="font-medium">{config.provider}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Messages (24h)</dt>
                  <dd className="font-medium tabular-nums">
                    {vol?.volume.toLocaleString() ?? "—"}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">Compliance</dt>
                  <dd className="text-muted-foreground">{meta.compliance}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">Health</dt>
                  <dd className="flex items-center gap-1.5 font-medium">
                    {config.status === "connected" ? (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    ) : (
                      <TrendingUp className="size-4 text-amber-500" />
                    )}
                    {config.healthNote}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 p-4">
                <Link
                  href="/inbox"
                  onClick={() => openInbox(channelId)}
                  className="app-btn-primary text-xs"
                >
                  Open inbox
                </Link>
                <Link href="/settings" className="app-btn-secondary text-xs">
                  <Plug className="size-3.5" />
                  Configure
                </Link>
                <button type="button" className="app-btn-secondary text-xs">
                  <ExternalLink className="size-3.5" />
                  Docs
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="app-surface p-5 sm:p-6">
        <p className="app-section-label">How channels map to product areas</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4">Area</th>
                <th className="pb-3 pr-4">WhatsApp</th>
                <th className="pb-3 pr-4">SMS</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3">Push</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ["Unified inbox", true, true, true, true],
                ["Outbound campaigns", true, true, true, true],
                ["Automation triggers", true, true, true, true],
                ["Templates library", true, true, true, false],
                ["Delivery analytics", true, true, true, true],
              ].map(([area, wa, sms, em, push]) => (
                <tr key={area as string}>
                  <td className="py-3 pr-4 font-medium">{area}</td>
                  {[wa, sms, em, push].map((on, i) => (
                    <td key={i} className="py-3 pr-4">
                      {on ? (
                        <CheckCircle2 className="size-4 text-primary" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
