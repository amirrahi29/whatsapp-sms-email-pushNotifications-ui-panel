"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import {
  analyticsSeries,
  campaignPerformance,
  channelMetricsWeek,
  queueVolumeBreakdown,
} from "@/data/mock";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { channelMeta } from "@/lib/channels";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";

const CHART_H = 288;

export function AnalyticsDashboard() {
  /** Defer charts until client mount so grid/flex layout has non-zero width (avoids Recharts -1). */
  const [chartsReady, setChartsReady] = useState(false);
  useEffect(() => {
    const t = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setChartsReady(true));
    });
    return () => window.cancelAnimationFrame(t);
  }, []);

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Analytics"
        description="Har channel ka volume, delivery aur engagement — WhatsApp, SMS, Email, Push alag-alag compare karein."
        actions={
          <>
            <select
              className="app-input h-10 max-w-[10rem] py-0 text-xs sm:text-sm"
              defaultValue="7d"
              aria-label="Reporting period"
            >
              <option value="24h">Last 24h</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <select
              className="app-input h-10 max-w-[9rem] py-0 text-xs sm:text-sm"
              defaultValue="all"
              aria-label="Channel"
            >
              <option value="all">All channels</option>
              <option value="wa">WhatsApp</option>
              <option value="api">API</option>
            </select>
            <button type="button" className="app-btn-secondary">
              <Download className="size-4" />
              Export CSV
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total chats (7d)", value: "847", hint: "+6.2% vs prior week" },
          { label: "Median first response", value: "3m 12s", hint: "Goal: under 5m" },
          { label: "Campaign CTR", value: "12.4%", hint: "Weighted across sends" },
          { label: "CSAT", value: "4.7 / 5", hint: "210 surveys" },
        ].map((k) => (
          <StatCard key={k.label} {...k} accent="strong" />
        ))}
      </div>

      <section>
        <p className="app-section-label">Performance by channel (7d)</p>
        <div className="stagger-grid mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {channelMetricsWeek.map((row) => {
            const meta = channelMeta(row.channel);
            const Icon = meta.icon;
            return (
              <article key={row.channel} className="app-surface app-surface--hover p-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg bg-gradient-to-br",
                      meta.accent
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <ChannelBadge channel={row.channel} />
                </div>
                <p className="mt-3 text-2xl font-semibold tabular-nums">
                  {row.engagement}%
                </p>
                <p className="text-xs text-muted-foreground">{row.label}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Sent</dt>
                    <dd className="font-medium tabular-nums">{row.sent.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Delivered</dt>
                    <dd className="font-medium tabular-nums">
                      {row.delivered.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid min-w-0 gap-4 xl:grid-cols-12">
        <div className="app-surface min-w-0 p-4 sm:p-5 xl:col-span-5">
          <h2 className="text-sm font-semibold tracking-tight">Chats & response time</h2>
          <p className="text-xs text-muted-foreground">Volume vs median response (min)</p>
          <div
            className="mt-4 w-full min-w-[200px] shrink-0"
            style={{ height: CHART_H }}
          >
            {!chartsReady ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={CHART_H} debounce={50}>
                <AreaChart
                  data={analyticsSeries}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="fillChats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/80" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="chats"
                    stroke="var(--color-primary)"
                    fill="url(#fillChats)"
                    strokeWidth={2}
                    name="Chats"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="responseMin"
                    stroke="#a855f7"
                    fill="none"
                    strokeWidth={2}
                    name="Response (min)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="app-surface min-w-0 p-4 sm:p-5 xl:col-span-4">
          <h2 className="text-sm font-semibold tracking-tight">Campaign performance</h2>
          <p className="text-xs text-muted-foreground">CTR % vs replies</p>
          <div
            className="mt-4 w-full min-w-[200px] shrink-0"
            style={{ height: CHART_H }}
          >
            {!chartsReady ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={CHART_H} debounce={50}>
                <BarChart
                  data={campaignPerformance}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/80" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    dataKey="ctr"
                    fill="var(--color-primary)"
                    radius={[6, 6, 0, 0]}
                    name="CTR %"
                  />
                  <Bar dataKey="replies" fill="#6366f1" radius={[6, 6, 0, 0]} name="Replies" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="app-surface min-w-0 p-4 sm:p-5 xl:col-span-3">
          <h2 className="text-sm font-semibold tracking-tight">Queue mix</h2>
          <p className="text-xs text-muted-foreground">Conversations by queue</p>
          <ul className="mt-4 space-y-4">
            {queueVolumeBreakdown.map((row) => (
              <li key={row.queue}>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground">{row.queue}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {row.chats} · {row.pct}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary/80 to-emerald-500/80"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
