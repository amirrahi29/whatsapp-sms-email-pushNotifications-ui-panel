"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart2,
  CalendarClock,
  ChevronRight,
  Layers3,
  LayoutTemplate,
  Pause,
  Play,
  Radio,
  Send,
  Split,
  Zap,
} from "lucide-react";
import {
  agentById,
  agentSendStats,
  broadcastActivityFeed,
  campaigns,
  dripSequences,
  waTemplates,
} from "@/data/mock";
import type { Campaign } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { ChannelTabs } from "@/components/channels/channel-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import type { ChannelFilter } from "@/lib/channels";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  sent: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  paused: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
};

const catStyle: Record<string, string> = {
  MARKETING: "bg-fuchsia-500/12 text-fuchsia-800 dark:text-fuchsia-200",
  UTILITY: "bg-sky-500/12 text-sky-800 dark:text-sky-200",
  AUTHENTICATION: "bg-orange-500/12 text-orange-800 dark:text-orange-200",
};

const tplStatus: Record<string, string> = {
  approved: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  pending: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  rejected: "bg-red-500/15 text-red-800 dark:text-red-200",
};

function MiniBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
        <span>{label}</span>
        <span>{pct.toFixed(1)}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MiniFunnel({ c }: { c: Campaign }) {
  if (!c.sent) {
    return (
      <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
        {c.status === "scheduled"
          ? `~${(c.audienceCount ?? 0).toLocaleString()} · ${c.sendRatePerMin ?? "—"}/min`
          : `~${(c.audienceCount ?? 0).toLocaleString()} recipients`}
      </div>
    );
  }
  const d = (c.delivered / c.sent) * 100;
  const r = (c.read / c.sent) * 100;
  const rep = c.replied != null ? (c.replied / c.sent) * 100 : 0;
  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-3">
        <MiniBar label="Delivered" pct={d} color="bg-sky-500" />
        <MiniBar label="Read" pct={r} color="bg-primary" />
        <MiniBar label="Replied" pct={rep} color="bg-violet-500" />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>
          Failed: <span className="font-medium text-foreground">{c.failed ?? 0}</span>
        </span>
        <span>
          Opt-outs: <span className="font-medium text-foreground">{c.optOuts ?? 0}</span>
        </span>
      </div>
    </div>
  );
}

type Tab = "overview" | "broadcasts" | "templates" | "sequences";

export function CampaignHub() {
  const [tab, setTab] = useState<Tab>("overview");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");

  const filteredCampaigns = useMemo(() => {
    if (channelFilter === "all") return campaigns;
    return campaigns.filter((c) => c.channel === channelFilter);
  }, [channelFilter]);

  const totals = useMemo(() => {
    const sent = campaigns.reduce((a, c) => a + c.sent, 0);
    const del = campaigns.reduce((a, c) => a + c.delivered, 0);
    const read = campaigns.reduce((a, c) => a + c.read, 0);
    const opt = campaigns.reduce((a, c) => a + (c.optOuts ?? 0), 0);
    return { sent, del, read, opt };
  }, []);

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "broadcasts", label: "Broadcasts", icon: Radio },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "sequences", label: "Sequences", icon: Layers3 },
  ];

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Outbound"
        description="WhatsApp, SMS, Email aur Push campaigns — har channel ki alag templates, compliance aur metrics."
        actions={
          <>
            <select
              className="app-input h-10 max-w-[11rem] py-0 text-xs sm:text-sm"
              defaultValue="7d"
              aria-label="Date range"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="q">This quarter</option>
            </select>
            <Link href="/campaigns/new" className="app-btn-primary">
              New campaign
              <ArrowRight className="size-4" />
            </Link>
            <button type="button" className="app-btn-secondary">
              <Zap className="size-4 text-amber-500" />
              Import CSV
            </button>
          </>
        }
      />

      <div className="-mx-1 flex gap-0.5 overflow-x-auto overscroll-x-contain rounded-xl border border-border/70 bg-muted/40 p-1 shadow-sm sm:mx-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-3 sm:text-sm",
              tab === id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5 shrink-0 opacity-70 sm:size-4" />
            <span className="whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>

      <ChannelTabs
        value={channelFilter}
        onChange={setChannelFilter}
        variant="segmented"
        className="max-w-full"
      />

      {tab === "overview" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Sent (7d)", value: "48.2k", hint: "All channels" },
              { label: "Delivered", value: "97.0%", hint: "Excl. invalid numbers" },
              { label: "Read rate", value: "68.4%", hint: "Unique recipients" },
              { label: "Opt-outs (7d)", value: String(totals.opt + 128), hint: "STOP / keyword" },
            ].map((k) => (
              <StatCard key={k.label} {...k} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-12">
            <div className="app-surface p-5 xl:col-span-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">Throughput & caps</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Meta Cloud API style limits</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Peak / min", v: "720" },
                  { k: "Marketing cap", v: "38k" },
                  { k: "Utility", v: "∞" },
                ].map((x) => (
                  <div key={x.k} className="app-surface--inset p-3">
                    <p className="text-xs text-muted-foreground">{x.k}</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="app-surface p-5 xl:col-span-4">
              <h2 className="text-sm font-semibold tracking-tight">Send volume by agent</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Attributed sends · read %</p>
              <ul className="mt-4 space-y-3">
                {agentSendStats.map((s) => {
                  const a = agentById(s.agentId);
                  if (!a) return null;
                  return (
                    <li key={s.agentId} className="flex items-center justify-between gap-3 text-sm">
                      <span className="min-w-0 truncate font-medium">{a.name}</span>
                      <div className="flex shrink-0 items-center gap-3 tabular-nums text-xs text-muted-foreground">
                        <span>{s.sends.toLocaleString()} sends</span>
                        <span className="font-semibold text-primary">{s.readRate}% read</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="app-surface p-5 xl:col-span-3">
              <h2 className="text-sm font-semibold tracking-tight">Template health</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Approved</span>
                  <span className="font-medium tabular-nums">4</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">In review</span>
                  <span className="font-medium tabular-nums text-amber-600 dark:text-amber-400">1</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Quality</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">High</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setTab("templates")}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Manage templates
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="app-surface overflow-hidden p-0">
            <div className="border-b border-border/60 bg-muted/30 px-4 py-3">
              <h2 className="text-sm font-semibold tracking-tight">Recent activity</h2>
              <p className="text-xs text-muted-foreground">Audit-style feed (mock)</p>
            </div>
            <ul className="divide-y divide-border/50">
              {broadcastActivityFeed.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="min-w-0 text-foreground/90">
                    <span className="font-medium text-foreground">{item.actor}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {item.time} ago
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {tab === "broadcasts" && (
        <div className="space-y-4">
          {filteredCampaigns.map((c) => (
            <div key={c.id} className="app-surface p-4 sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{c.name}</h2>
                    <Badge
                      className={cn("capitalize", statusStyle[c.status] ?? "")}
                      variant="outline"
                    >
                      {c.status}
                    </Badge>
                    <ChannelBadge channel={c.channel} />
                    {c.abTest && (
                      <Badge variant="outline" className="gap-1 text-[10px]">
                        <Split className="size-3" />
                        A/B
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.audience}</p>
                  {c.templateName && (
                    <p className="mt-2 font-mono text-xs text-primary">
                      template:{c.templateName}
                    </p>
                  )}
                  {c.scheduledAt && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarClock className="size-3.5" />
                      {c.scheduledAt}
                    </p>
                  )}
                  <MiniFunnel c={c} />
                </div>
                <div className="flex shrink-0 flex-wrap gap-4 border-t border-border pt-4 lg:flex-col lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4 lg:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Sent</p>
                      <p className="font-semibold">{c.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                      <p className="font-semibold">{c.delivered.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Read</p>
                      <p className="font-semibold">{c.read.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Replied</p>
                      <p className="font-semibold">{(c.replied ?? 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 lg:justify-end">
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted"
                      aria-label="Send or queue"
                    >
                      <Send className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted"
                      aria-label="Pause or resume"
                    >
                      {c.status === "paused" ? (
                        <Play className="size-4" />
                      ) : (
                        <Pause className="size-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                    >
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "templates" && (
        <div className="app-surface overflow-hidden p-0">
          <div className="flex flex-col gap-2 border-b border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium">WhatsApp message templates</p>
            <button
              type="button"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
            >
              Submit new template
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Preview</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {waTemplates.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-border/60 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium">{t.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          catStyle[t.category]
                        )}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.language}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={cn("capitalize", tplStatus[t.status])}
                      >
                        {t.status}
                      </Badge>
                    </td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-muted-foreground">
                      {t.bodyPreview}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.lastEdited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "sequences" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium">Sequences</p>
            <Link
              href="/automation"
              className="text-xs font-medium text-primary hover:underline"
            >
              Automation
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dripSequences.map((d) => (
              <div key={d.id} className="app-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{d.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 capitalize",
                      d.status === "active" && "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
                      d.status === "paused" && "text-muted-foreground",
                      d.status === "draft" && "text-muted-foreground"
                    )}
                  >
                    {d.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {d.steps} steps · {d.enrolled.toLocaleString()} enrolled
                </p>
                {d.lastRun && (
                  <p className="mt-1 text-xs text-muted-foreground">Last run {d.lastRun}</p>
                )}
                <button
                  type="button"
                  className="mt-4 w-full rounded-xl border border-border py-2 text-xs font-medium hover:bg-muted"
                >
                  Edit sequence
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
