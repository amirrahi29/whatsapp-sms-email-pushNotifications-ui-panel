"use client";

import { useMemo, useState } from "react";
import { Headphones, Mail, MoreHorizontal, Search, Shield, Users } from "lucide-react";
import { agents, type AgentRole } from "@/data/mock";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

function statusDot(status: (typeof agents)[0]["status"]) {
  const map = {
    online: "bg-emerald-500",
    away: "bg-amber-400",
    offline: "bg-zinc-400",
  };
  return map[status];
}

function roleBadgeVariant(role: (typeof agents)[0]["role"]) {
  if (role === "Admin") return "admin" as const;
  if (role === "Supervisor") return "supervisor" as const;
  return "secondary" as const;
}

export function TeamPage() {
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<AgentRole | "all">("all");

  const onlineCount = agents.filter((a) => a.status === "online").length;

  const filtered = useMemo(() => {
    return agents.filter((a) => {
      const matchQ =
        !q ||
        a.name.toLowerCase().includes(q.toLowerCase()) ||
        a.email.toLowerCase().includes(q.toLowerCase());
      const matchR = roleFilter === "all" || a.role === roleFilter;
      return matchQ && matchR;
    });
  }, [q, roleFilter]);

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Team & agents"
        description="Kaun agent online hai, role kya hai — inbox assign karne se pehle team yahan set hoti hai."
        actions={
          <button type="button" className="app-btn-primary w-full sm:w-auto">
            Invite member
          </button>
        }
      />

      <div className="app-surface--inset flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search team…"
            className="app-input pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "Admin", "Supervisor", "Agent"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                roleFilter === r
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent bg-muted/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {r === "all" ? "All roles" : r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="app-surface flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{agents.length}</p>
            <p className="text-xs font-medium text-muted-foreground">Seats</p>
          </div>
        </div>
        <div className="app-surface flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Headphones className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{onlineCount}</p>
            <p className="text-xs font-medium text-muted-foreground">Online now</p>
          </div>
        </div>
        <div className="app-surface flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-300">
            <Shield className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">
              {agents.filter((a) => a.role !== "Agent").length}
            </p>
            <p className="text-xs font-medium text-muted-foreground">Admins / supervisors</p>
          </div>
        </div>
      </div>

      <ul className="app-surface divide-y divide-border/60 overflow-hidden p-0">
        {filtered.map((a) => (
          <li
            key={a.id}
            className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-muted/25 sm:flex-row sm:items-center sm:justify-between sm:py-3.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative">
                <span className="flex size-11 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {initials(a.name)}
                </span>
                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-3 rounded-full border-2 border-card",
                    statusDot(a.status)
                  )}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{a.name}</p>
                  <Badge variant={roleBadgeVariant(a.role)}>{a.role}</Badge>
                </div>
                <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Mail className="size-3.5 shrink-0" />
                  {a.email}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {a.lastActive && (
                  <span className="rounded-md bg-muted/80 px-2 py-1 font-medium text-foreground/90">
                    Last active · {a.lastActive}
                  </span>
                )}
                {typeof a.openConversations === "number" && (
                  <span className="rounded-md bg-muted/80 px-2 py-1 font-medium text-foreground/90">
                    Open chats · {a.openConversations}
                  </span>
                )}
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
                {a.status}
              </span>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                aria-label="More"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
