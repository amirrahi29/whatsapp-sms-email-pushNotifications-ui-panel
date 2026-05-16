"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  UserPlus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { agentById, agents, contacts, type Contact } from "@/data/mock";
import { initials } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";

type SortKey = "name" | "lastActivity" | "owner";
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="size-3.5 opacity-40" aria-hidden />;
  return dir === "asc" ? (
    <ArrowUp className="size-3.5" aria-hidden />
  ) : (
    <ArrowDown className="size-3.5" aria-hidden />
  );
}

export function ContactsPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const s = new Set<string>();
    contacts.forEach((c) => c.tags.forEach((t) => s.add(t)));
    return [...s].sort();
  }, []);

  const rows = useMemo(() => {
    const filtered = contacts.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.phone.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q.toLowerCase()));
      const matchT = !tag || c.tags.includes(tag);
      return matchQ && matchT;
    });
    const mul = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * mul;
      if (sortKey === "owner") {
        const na = agentById(a.ownerAgentId)?.name ?? "";
        const nb = agentById(b.ownerAgentId)?.name ?? "";
        return na.localeCompare(nb) * mul;
      }
      return a.lastActivity.localeCompare(b.lastActivity) * mul;
    });
  }, [q, tag, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleRowSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === rows.length) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(rows.map((r) => r.id)));
  }

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Contacts"
        description="Cross-channel contacts — phone, email, push tokens. Har outbound campaign ki audience yahan se."
        actions={
          <>
            <button type="button" className="app-btn-secondary">
              <Download className="size-4" />
              Export
            </button>
            <button type="button" className="app-btn-primary">
              <UserPlus className="size-4" />
              Add contact
            </button>
          </>
        }
      />

      <div className="app-surface overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, or email…"
              className="app-input pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Filter className="size-3.5" />
              Tags
            </span>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag((cur) => (cur === t ? null : t))}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  tag === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-primary/5 px-4 py-2 text-sm">
            <span className="font-medium text-foreground">
              {selectedIds.size} selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="app-btn-secondary px-3 py-1.5 text-xs">
                Tag
              </button>
              <button type="button" className="app-btn-secondary px-3 py-1.5 text-xs">
                Assign owner
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                onClick={() => setSelectedIds(new Set())}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40">
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-border"
                    checked={rows.length > 0 && selectedIds.size === rows.length}
                    onChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="w-[22%] px-3 py-3">
                  <button
                    type="button"
                    onClick={() => toggleSort("name")}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    Contact
                    <SortIcon active={sortKey === "name"} dir={sortDir} />
                  </button>
                </th>
                <th className="w-[18%] px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </th>
                <th className="w-[14%] px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone
                </th>
                <th className="w-[14%] px-3 py-3">
                  <button
                    type="button"
                    onClick={() => toggleSort("owner")}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    Owner
                    <SortIcon active={sortKey === "owner"} dir={sortDir} />
                  </button>
                </th>
                <th className="w-[14%] px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tags
                </th>
                <th className="w-[10%] px-3 py-3">
                  <button
                    type="button"
                    onClick={() => toggleSort("lastActivity")}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    Activity
                    <SortIcon active={sortKey === "lastActivity"} dir={sortDir} />
                  </button>
                </th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const owner = agentById(c.ownerAgentId);
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      "cursor-pointer border-b border-border/40 transition-colors hover:bg-muted/30",
                      selectedIds.has(c.id) && "bg-primary/5"
                    )}
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border"
                        checked={selectedIds.has(c.id)}
                        onChange={() => toggleRowSelect(c.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select ${c.name}`}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold ring-1 ring-border/60">
                          {initials(c.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">{c.name}</p>
                          {c.company && (
                            <p className="truncate text-xs text-muted-foreground">{c.company}</p>
                          )}
                          {c.lifecycle && (
                            <Badge variant="outline" className="mt-0.5 text-[9px] capitalize">
                              {c.lifecycle}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="line-clamp-2 break-all text-muted-foreground">
                        {c.email ?? "—"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{c.phone}</td>
                    <td className="px-3 py-2.5">
                      {owner ? (
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                            {initials(owner.name)}
                          </span>
                          <span className="truncate text-xs font-medium">{owner.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Unassigned</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.slice(0, 3).map((tg) => (
                          <Badge key={tg} variant="secondary" className="text-[10px]">
                            {tg}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs tabular-nums text-muted-foreground">
                      {c.lastActivity}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        type="button"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                        aria-label="Row actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-4 py-2.5 text-xs text-muted-foreground">
          <span>
            Showing <span className="font-medium text-foreground">{rows.length}</span> of{" "}
            {contacts.length} contacts
          </span>
          <span className="hidden sm:inline">Agents in workspace: {agents.length}</span>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-black/45 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[var(--shadow-float)] ring-1 ring-black/5 dark:ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-3">
              <h2 className="text-lg font-semibold">Contact details</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-14 items-center justify-center rounded-full bg-muted text-lg font-semibold ring-2 ring-border/50">
                  {initials(selected.name)}
                </span>
                <div>
                  <p className="text-base font-semibold">{selected.name}</p>
                  {selected.company && (
                    <p className="text-sm text-muted-foreground">{selected.company}</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{selected.email ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Phone</p>
                <p className="text-sm">{selected.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Owner</p>
                <p className="text-sm">
                  {agentById(selected.ownerAgentId)?.name ?? "Unassigned"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Tags</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selected.tags.map((tg) => (
                    <Badge key={tg}>{tg}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Last activity</p>
                <p className="text-sm">{selected.lastActivity}</p>
              </div>
              <button type="button" className="app-btn-primary w-full py-2.5">
                Open in Inbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
