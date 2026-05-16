"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  FileWarning,
  Gauge,
  Layers,
  Moon,
  Plus,
  Shield,
  Split,
  Users,
} from "lucide-react";
import { waTemplates } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { ChannelTabs } from "@/components/channels/channel-tabs";
import { channelMeta, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, title: "Audience" },
  { id: 1, title: "Content" },
  { id: 2, title: "Delivery" },
  { id: 3, title: "Compliance" },
  { id: 4, title: "Review" },
] as const;

export function NewCampaignPage() {
  const [channel, setChannel] = useState<ChannelId>("whatsapp");
  const [step, setStep] = useState(0);
  const [logic, setLogic] = useState<"AND" | "OR">("AND");
  const [rows, setRows] = useState(3);
  const [ab, setAb] = useState(false);
  const [body, setBody] = useState(
    "Hi {{1}}, your spring offer is ready — reply YES to get the catalog link."
  );
  const [tpl, setTpl] = useState(waTemplates[0]?.name ?? "");

  const reach = useMemo(() => 12840 - rows * 420, [rows]);
  const cap = 25000;
  const pct = Math.min(100, (reach / cap) * 100);

  return (
    <div className="app-page--sm space-y-4 pb-8 sm:space-y-6">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <h1 className="app-h1">New campaign</h1>
      <p className="text-sm text-muted-foreground">
        Pehle channel choose karein — har channel ki alag templates aur compliance rules.
      </p>

      <div className="app-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Channel
        </p>
        <ChannelTabs
          value={channel}
          onChange={(v) => v !== "all" && setChannel(v)}
          variant="segmented"
          className="mt-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {channelMeta(channel).compliance}
        </p>
      </div>

      <nav className="-mx-1 flex gap-1 overflow-x-auto overscroll-x-contain rounded-xl border border-border/70 bg-muted/40 p-1.5 shadow-sm sm:mx-0 sm:flex-wrap sm:gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={cn(
              "flex min-w-0 shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors sm:min-w-0 sm:flex-1 sm:rounded-xl sm:px-3 sm:text-sm",
              step === s.id
                ? "bg-card font-semibold text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold sm:size-7 sm:rounded-lg sm:text-xs",
                step === s.id
                  ? "bg-primary text-primary-foreground"
                  : step > s.id
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted"
              )}
            >
              {step > s.id ? <Check className="size-3.5 sm:size-4" /> : i + 1}
            </span>
            <span className="truncate">{s.title}</span>
          </button>
        ))}
      </nav>

      {step === 0 && (
        <section className="app-surface space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4 text-primary" />
              Audience
            </div>
            <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
              {(["AND", "OR"] as const).map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setLogic(op)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-semibold",
                    logic === op ? "bg-card shadow-sm" : "text-muted-foreground"
                  )}
                >
                  Match {op}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {[
              ["Tag", "contains", "Marketing"],
              ["Country", "in list", "US, CA"],
              ["Consent", "equals", "Transactional + Marketing"],
            ].slice(0, rows).map(([a, op, v], idx) => (
              <div
                key={idx}
                className="grid gap-2 rounded-xl border border-border bg-muted/20 p-3 sm:grid-cols-[1fr_auto_1fr_auto]"
              >
                <select className="rounded-lg border border-border bg-card px-2 py-2 text-sm">
                  <option>{a}</option>
                  <option>Last seen</option>
                  <option>Lifetime value</option>
                </select>
                <select className="rounded-lg border border-border bg-card px-2 py-2 text-sm">
                  <option>{op}</option>
                  <option>not equals</option>
                </select>
                <input
                  className="rounded-lg border border-border bg-card px-2 py-2 text-sm sm:col-span-1"
                  defaultValue={v}
                  readOnly
                />
                <button
                  type="button"
                  className="text-xs font-medium text-destructive hover:underline sm:col-span-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setRows((n) => Math.min(5, n + 1))}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
          >
            <Plus className="size-4" />
            Add filter group
          </button>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Estimated reachable
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {reach.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Cap {cap.toLocaleString()}</p>
              </div>
              <Badge variant="secondary">WhatsApp channel</Badge>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={() => setStep(1)} className="app-btn-primary">
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="app-surface space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Layers className="size-4 text-primary" />
              Template & body
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={ab}
                onChange={(e) => setAb(e.target.checked)}
                className="size-4 rounded border-border"
              />
              <Split className="size-4" />
              A/B body (50/50)
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Template
              </label>
              <select
                value={tpl}
                onChange={(e) => setTpl(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-ring/40"
              >
                {waTemplates.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} · {t.category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Language
              </label>
              <select className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none">
                <option>English (en)</option>
                <option>Arabic (ar)</option>
                <option>Hindi (hi)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">Body</label>
              <span className="text-xs text-muted-foreground">
                {body.length} / 1024
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, 1024))}
              rows={5}
              className="mt-1 w-full rounded-xl border border-border bg-background p-3 font-mono text-sm outline-none ring-ring/30 focus:ring-2"
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-muted-foreground">Variable mapping</p>
            <table className="mt-2 w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="py-1.5 pr-2">Slot</th>
                  <th className="py-1.5 pr-2">Maps to</th>
                  <th className="py-1.5">Sample</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["{{1}}", "contact.first_name", "Aisha"],
                  ["{{2}}", "promo.deep_link", "https://…"],
                ].map(([slot, field, ex]) => (
                  <tr key={slot} className="border-t border-border/60">
                    <td className="py-2 font-mono text-xs">{slot}</td>
                    <td className="py-2 text-muted-foreground">{field}</td>
                    <td className="py-2 text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {ab && (
            <div className="rounded-xl border border-dashed border-violet-500/40 bg-violet-500/5 p-4">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                Variant B (50% traffic)
              </p>
              <textarea
                rows={3}
                readOnly
                className="mt-2 w-full rounded-lg border border-border bg-card p-2 text-sm"
                defaultValue="Alternate hook: limited-time code SAVE15 at checkout."
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
            >
              + Header media
            </button>
            <button
              type="button"
              className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
            >
              + PDF catalog
            </button>
            <button
              type="button"
              className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
            >
              + Quick reply buttons
            </button>
          </div>

          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="app-btn-secondary"
            >
              Back
            </button>
            <button type="button" onClick={() => setStep(2)} className="app-btn-primary">
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="app-surface space-y-5 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Clock3 className="size-4 text-primary" />
            Schedule
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Timezone</span>
              <select className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
                <option>UTC</option>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Send window</span>
              <select className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
                <option>Business hours only</option>
                <option>24/7 (respect quiet hours)</option>
              </select>
            </label>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <Moon className="mt-0.5 size-4 text-muted-foreground" />
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">Quiet hours</p>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="time"
                  defaultValue="22:00"
                  className="rounded-lg border border-border bg-card px-2 py-1.5 text-sm"
                />
                <span className="text-xs text-muted-foreground">to</span>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="rounded-lg border border-border bg-card px-2 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Gauge className="size-3.5" />
              Throttle (msg/min)
            </div>
            <input type="range" min={60} max={600} defaultValue={280} className="mt-2 w-full accent-primary" />
          </div>

          <div className="flex justify-between gap-2">
            <button type="button" onClick={() => setStep(1)} className="app-btn-secondary">
              Back
            </button>
            <button type="button" onClick={() => setStep(3)} className="app-btn-primary">
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="app-surface space-y-5 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Shield className="size-4 text-primary" />
            Compliance
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "Marketing opt-in recorded",
              "Template category matches send",
              "STOP footer appended",
              "Segment excludes restricted verticals",
            ].map((text) => (
              <li key={text} className="flex gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <input type="checkbox" defaultChecked className="mt-0.5 size-4 rounded border-border" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-950 dark:text-amber-100">
            <FileWarning className="size-4 shrink-0" />
            <p>High-frequency sends to cold lists may be rejected by the provider.</p>
          </div>
          <div className="flex justify-between gap-2">
            <button type="button" onClick={() => setStep(2)} className="app-btn-secondary">
              Back
            </button>
            <button type="button" onClick={() => setStep(4)} className="app-btn-primary">
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="app-surface space-y-5 p-5 sm:p-6">
          <div className="text-sm font-semibold">Review broadcast</div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <dt className="text-xs text-muted-foreground">Template</dt>
              <dd className="mt-1 font-mono text-xs font-medium">{tpl}</dd>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <dt className="text-xs text-muted-foreground">Reach (est.)</dt>
              <dd className="mt-1 font-semibold">{reach.toLocaleString()}</dd>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Logic</dt>
              <dd className="mt-1">
                {rows} filters · match <strong>{logic}</strong>
                {ab ? " · A/B enabled" : ""}
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap justify-between gap-2">
            <button type="button" onClick={() => setStep(3)} className="app-btn-secondary">
              Back
            </button>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="app-btn-secondary">
                Save draft
              </button>
              <Link href="/campaigns" className="app-btn-primary">
                Queue send
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
