"use client";

import {
  Bot,
  Clock,
  GitBranch,
  MessageSquareText,
  Plus,
  Sparkles,
  Tag,
  Users,
  Webhook,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const triggerCatalog = [
  { icon: MessageSquareText, label: "Message keyword", desc: "Inbound text match" },
  { icon: Tag, label: "Tag added / removed", desc: "CRM lifecycle" },
  { icon: Clock, label: "Schedule & hours", desc: "Business hours, cron" },
  { icon: Webhook, label: "Webhook event", desc: "Order paid, form submit" },
  { icon: Users, label: "Queue load", desc: "SLA breach, backlog" },
];

const exampleRules = [
  {
    id: "r1",
    name: "Pricing keyword auto-reply",
    if: 'Message contains "price"',
    then: "Send template: Pricing overview",
    runs: "12.4k / 7d",
    on: true,
  },
  {
    id: "r2",
    name: "After-hours handoff",
    if: "Outside business hours",
    then: "Assign to on-call + send SLA notice",
    runs: "842 / 7d",
    on: true,
  },
];

export function AutomationPage() {
  return (
    <div className="app-page-wide">
      <PageHeader
        title="Automation"
        description="Cross-channel triggers — WhatsApp keyword, email open, SMS reply, push tap → journey next step."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,280px)_1fr]">
        <aside className="space-y-4">
          <div className="app-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Triggers
            </p>
            <ul className="mt-3 space-y-1">
              {triggerCatalog.map((t) => (
                <li key={t.label}>
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors hover:bg-muted/60"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <t.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="font-medium text-foreground">{t.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{t.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="app-surface--inset flex items-start gap-2 p-4 text-xs text-muted-foreground">
            <GitBranch className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <p>
              Multi-branch <strong className="text-foreground">IF / ELSE</strong> flows are
              wireframe-only here.
            </p>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <div className="app-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="size-4 text-primary" />
                New automation rule
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Draft
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="relative rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-5">
                <div className="absolute -top-3 left-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  If
                </div>
                <label className="block text-xs font-medium text-muted-foreground">
                  Condition type
                </label>
                <select className="app-input mt-2 w-full py-2.5 text-sm">
                  <option>Message contains keyword</option>
                  <option>Contact has tag</option>
                  <option>Business hours</option>
                  <option>First message in thread</option>
                </select>
                <label className="mt-4 block text-xs font-medium text-muted-foreground">
                  Value
                </label>
                <input
                  className="app-input mt-2 py-2.5 text-sm"
                  placeholder='e.g. "price"'
                  defaultValue="price"
                  readOnly
                />
              </div>

              <div className="relative rounded-2xl border border-dashed border-emerald-500/35 bg-emerald-500/5 p-5">
                <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Then
                </div>
                <label className="block text-xs font-medium text-muted-foreground">Action</label>
                <select className="app-input mt-2 w-full py-2.5 text-sm">
                  <option>Send template reply</option>
                  <option>Add tag</option>
                  <option>Assign to team / round-robin</option>
                  <option>Notify Slack channel</option>
                </select>
                <label className="mt-4 block text-xs font-medium text-muted-foreground">
                  Template
                </label>
                <div className="mt-2 flex gap-2">
                  <div className="flex min-h-[44px] min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm text-muted-foreground">
                    <MessageSquareText className="size-4 shrink-0" />
                    <span className="truncate">Pricing overview (EN)</span>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-xl border border-border px-3 text-sm font-medium hover:bg-muted"
                  >
                    Pick
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-border/60 pt-4">
              <button type="button" className="app-btn-secondary">
                <Bot className="size-4" />
                Test rule
              </button>
              <button type="button" className="app-btn-primary">
                <Plus className="size-4" />
                Save automation
              </button>
            </div>
          </div>

          <section>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Active rules</h2>
                <p className="text-xs text-muted-foreground">Volume · last 7 days (mock)</p>
              </div>
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                View run log
              </button>
            </div>
            <div className="app-surface overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3">Rule</th>
                      <th className="px-4 py-3">Condition</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Runs</th>
                      <th className="px-4 py-3">On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleRules.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-border/40 transition-colors hover:bg-muted/25"
                      >
                        <td className="px-4 py-3 font-medium">{r.name}</td>
                        <td className="max-w-[200px] px-4 py-3 text-xs text-muted-foreground">
                          {r.if}
                        </td>
                        <td className="max-w-[220px] px-4 py-3 text-xs text-muted-foreground">
                          {r.then}
                        </td>
                        <td className="px-4 py-3 text-xs tabular-nums text-muted-foreground">
                          {r.runs}
                        </td>
                        <td className="px-4 py-3">
                          <label className="inline-flex cursor-pointer items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              defaultChecked={r.on}
                              className="size-4 rounded border-border"
                            />
                            <span className="text-muted-foreground">Enabled</span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
