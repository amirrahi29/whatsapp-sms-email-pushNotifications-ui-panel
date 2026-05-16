"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  StickyNote,
  Tag,
  UserCircle2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  agents,
  agentName,
  chatThreads,
  messagesByChat,
  quickReplies,
  routingQueues,
  queueLabel,
  viewingAgentsByChatId,
  type ChatFilter,
  type ChatThread,
} from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { ChannelTabs } from "@/components/channels/channel-tabs";
import { useClickOutside } from "@/hooks/use-click-outside";
import { initials } from "@/lib/format";
import { channelLabel, channelMeta } from "@/lib/channels";
import { useUiStore, type InboxQueueFilter } from "@/lib/stores/ui-store";

function ChatListColumn({
  threads,
  filter,
  onFilter,
  selectedId,
  onSelect,
  onMobileOpenChat,
}: {
  threads: ChatThread[];
  filter: ChatFilter;
  onFilter: (f: ChatFilter) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMobileOpenChat: () => void;
}) {
  const currentAgentId = useUiStore((s) => s.currentAgentId);
  const setCurrentAgentId = useUiStore((s) => s.setCurrentAgentId);
  const inboxQueueFilter = useUiStore((s) => s.inboxQueueFilter);
  const setInboxQueueFilter = useUiStore((s) => s.setInboxQueueFilter);
  const inboxChannelFilter = useUiStore((s) => s.inboxChannelFilter);
  const setInboxChannelFilter = useUiStore((s) => s.setInboxChannelFilter);

  const filtered = useMemo(() => {
    return threads.filter((t) => {
      if (inboxChannelFilter !== "all" && t.channel !== inboxChannelFilter) return false;
      if (inboxQueueFilter !== "all" && t.queueId !== inboxQueueFilter) return false;
      if (filter === "unread") return t.unread > 0;
      if (filter === "mine") return t.assignedAgentId === currentAgentId;
      if (filter === "unassigned") return !t.assignedAgentId;
      if (filter === "assigned") return Boolean(t.assignedAgentId);
      return true;
    });
  }, [threads, filter, inboxQueueFilter, inboxChannelFilter, currentAgentId]);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col border-r border-border/70 bg-card">
      <div className="shrink-0 border-b border-border/60 bg-muted/20 px-3 py-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {inboxChannelFilter === "all"
            ? "Unified inbox"
            : `${channelLabel(inboxChannelFilter)} inbox`}
        </p>
        <ChannelTabs
          value={inboxChannelFilter}
          onChange={setInboxChannelFilter}
          variant="segmented"
          className="mt-2"
        />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="block min-w-0">
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Queue
            </span>
            <select
              className="app-input h-8 w-full py-0 text-xs"
              value={inboxQueueFilter}
              onChange={(e) =>
                setInboxQueueFilter(e.target.value as InboxQueueFilter)
              }
              aria-label="Filter by queue"
            >
              {routingQueues.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0">
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              You (agent)
            </span>
            <select
              className="app-input h-8 w-full py-0 text-xs"
              value={
                agents.some((a) => a.id === currentAgentId) ? currentAgentId : agents[0]?.id
              }
              onChange={(e) => setCurrentAgentId(e.target.value)}
              aria-label="Acting as agent"
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="app-surface--inset mt-2.5 flex gap-0.5 overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(
            [
              ["all", "All"],
              ["mine", "Mine"],
              ["unread", "Unread"],
              ["unassigned", "Open"],
              ["assigned", "Assigned"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onFilter(key)}
              className={cn(
                "shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all",
                filter === key
                  ? "bg-card text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No conversations match these filters.
          </div>
        )}
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              onSelect(t.id);
              onMobileOpenChat();
            }}
            className={cn(
              "flex w-full gap-3 border-b border-border/40 px-3 py-3 text-left transition-[background-color,transform,border-color] duration-200 hover:translate-x-0.5 hover:bg-muted/40 active:scale-[0.995]",
              selectedId === t.id &&
                "border-l-2 border-l-primary bg-muted/50 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.03)] dark:bg-muted/30"
            )}
          >
            <div className="relative shrink-0">
              <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/60 text-sm font-semibold text-foreground shadow-inner ring-2 ring-background">
                {initials(t.name)}
              </span>
              {t.online && (
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-500 shadow-sm" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium">{t.name}</span>
                <div className="flex shrink-0 items-center gap-1">
                  {t.sla === "warn" && (
                    <span className="rounded bg-amber-500/15 px-1 py-0.5 text-[9px] font-bold uppercase text-amber-800 dark:text-amber-200">
                      SLA
                    </span>
                  )}
                  {t.sla === "breach" && (
                    <span className="rounded bg-destructive/15 px-1 py-0.5 text-[9px] font-bold uppercase text-destructive">
                      Due
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{t.lastAt}</span>
                </div>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {t.lastMessage}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <ChannelBadge channel={t.channel} />
                <Badge variant="outline" className="text-[9px] font-normal">
                  {queueLabel(t.queueId)}
                </Badge>
                {t.assignedAgentId && (
                  <span className="max-w-[7rem] truncate text-[10px] text-muted-foreground">
                    → {agentName(t.assignedAgentId)}
                  </span>
                )}
                {t.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
                {t.unread > 0 && (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {t.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({
  direction,
  body,
  at,
  status,
}: {
  direction: "in" | "out";
  body: string;
  at: string;
  status?: string;
}) {
  const out = direction === "out";
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[min(100%,min(36rem,85%))] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          out
            ? "rounded-br-md bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-md shadow-primary/20"
            : "rounded-bl-md border border-border/60 bg-card text-card-foreground shadow-sm ring-1 ring-black/5 dark:border-border/50 dark:ring-white/10"
        )}
      >
        <p>{body}</p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[10px]",
            out ? "text-primary-foreground/75" : "text-muted-foreground"
          )}
        >
          <span>{at}</span>
          {out && status && (
            <span className="capitalize opacity-80">{status}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ConversationColumn({
  thread,
  onBack,
  showBack,
  onOpenProfile,
  onAssignAgent,
}: {
  thread: ChatThread | null;
  onBack: () => void;
  showBack: boolean;
  onOpenProfile: () => void;
  onAssignAgent: (agentId: string | undefined) => void;
}) {
  const [draft, setDraft] = useState("");
  const [quickOpen, setQuickOpen] = useState(false);
  const quickRef = useRef<HTMLDivElement>(null);
  const closeQuick = useCallback(() => setQuickOpen(false), []);
  useClickOutside(quickRef, closeQuick, quickOpen);

  const msgs = thread ? messagesByChat[thread.id] ?? [] : [];

  if (!thread) {
    return (
      <div className="flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center bg-muted/25 p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted ring-1 ring-border/60">
          <UserCircle2 className="size-7 text-muted-foreground/50" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">Select a conversation</p>
      </div>
    );
  }

  const viewingIds = viewingAgentsByChatId[thread.id] ?? [];
  const viewingNames = viewingIds.map((id) => agentName(id)).filter(Boolean);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-muted/20 dark:bg-muted/15">
      {viewingNames.length > 0 && (
        <div className="flex shrink-0 items-center gap-2 border-b border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-950 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
          <Eye className="size-3.5 shrink-0 opacity-80" aria-hidden />
          <span>
            <span className="font-semibold">{viewingNames.join(", ")}</span> also viewing
          </span>
        </div>
      )}
      <div className="flex shrink-0 items-center gap-2 border-b border-border/70 bg-card px-2 py-2.5">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Back to list"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/70 text-sm font-semibold shadow-sm ring-2 ring-background">
            {initials(thread.name)}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-semibold">{thread.name}</p>
              <ChannelBadge channel={thread.channel} />
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {thread.channelHandle ?? thread.phone}
              <span className="text-muted-foreground/60">
                {" "}
                · via {channelMeta(thread.channel).label}
              </span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenProfile}
          className="hidden rounded-lg px-2 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 sm:block lg:hidden"
        >
          Profile
        </button>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
            aria-label="Call"
          >
            <Phone className="size-[18px]" />
          </button>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            <MoreHorizontal className="size-[18px]" />
          </button>
        </div>
      </div>

      <div
        className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/25 p-4 dark:bg-muted/30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      >
        {msgs.map((m) => (
          <Bubble
            key={m.id}
            direction={m.direction}
            body={m.body}
            at={m.at}
            status={m.status}
          />
        ))}
      </div>

      <div className="shrink-0 border-t border-border/70 bg-card p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-border hover:text-foreground"
          >
            <Tag className="size-3.5" />
            Tags
            <ChevronDown className="size-3" />
          </button>
          <label className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="shrink-0">Assign</span>
            <select
              className="app-input h-9 max-w-[10rem] py-0 text-xs sm:max-w-[12rem]"
              value={thread.assignedAgentId ?? ""}
              onChange={(e) =>
                onAssignAgent(e.target.value ? e.target.value : undefined)
              }
              aria-label="Assign conversation"
            >
              <option value="">Unassigned</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <div className="relative" ref={quickRef}>
            <button
              type="button"
              onClick={() => setQuickOpen((o) => !o)}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors",
                quickOpen
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/80 bg-background text-muted-foreground hover:border-border hover:text-foreground"
              )}
              aria-expanded={quickOpen}
            >
              <Zap className="size-3.5" />
              Quick replies
              <ChevronDown className="size-3 opacity-70" />
            </button>
            {quickOpen && (
              <div className="absolute bottom-full left-0 z-20 mb-1 w-[min(100vw-2rem,18rem)] rounded-xl border border-border bg-card py-1 shadow-[var(--shadow-float)]">
                <p className="border-b border-border/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Canned responses
                </p>
                <ul className="max-h-52 overflow-y-auto py-1">
                  {quickReplies.map((q) => (
                    <li key={q.id}>
                      <button
                        type="button"
                        className="flex w-full flex-col gap-0.5 px-3 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => {
                          setDraft((d) => (d ? `${d}\n${q.body}` : q.body));
                          setQuickOpen(false);
                        }}
                      >
                        <span className="font-medium text-foreground">{q.title}</span>
                        <span className="text-[10px] text-muted-foreground">{q.shortcut}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end gap-2 rounded-2xl border border-border/80 bg-background p-2 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
            aria-label="Attach"
          >
            <Paperclip className="size-[18px]" />
          </button>
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
            aria-label="Emoji"
          >
            <Smile className="size-[18px]" />
          </button>
          <textarea
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message… (demo composer)"
            className="max-h-32 min-h-[44px] w-full resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-md shadow-primary/25 transition-opacity hover:opacity-95"
            aria-label="Send"
          >
            <SendHorizontal className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel({
  thread,
  onClose,
  showClose,
}: {
  thread: ChatThread | null;
  onClose: () => void;
  showClose: boolean;
}) {
  if (!thread) {
    return (
      <div className="flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center border-l border-border/70 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No contact selected</p>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col border-l border-border/70 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/15 px-3 py-3">
        <p className="text-sm font-semibold tracking-tight">Contact</p>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            Close
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/60 text-lg font-semibold shadow-inner ring-4 ring-background">
            {initials(thread.name)}
          </span>
          <h2 className="mt-3 text-lg font-semibold">{thread.name}</h2>
          <p className="text-sm text-muted-foreground">{thread.phone}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            {thread.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Queue</dt>
            <dd className="font-medium">{queueLabel(thread.queueId)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Assigned</dt>
            <dd className="font-medium">{agentName(thread.assignedAgentId)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Last activity</dt>
            <dd className="font-medium">{thread.lastAt}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">CSAT (mock)</dt>
            <dd className="font-medium text-emerald-600 dark:text-emerald-400">4.7 avg</dd>
          </div>
        </dl>
        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <StickyNote className="size-4 text-muted-foreground" />
            Internal notes
          </div>
          <textarea
            className="min-h-[100px] w-full resize-y rounded-xl border border-border/80 bg-background px-3 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/25"
            placeholder="Internal notes… (@mentions in full product)"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export function InboxPage() {
  const [threads, setThreads] = useState<ChatThread[]>(() =>
    chatThreads.map((t) => ({ ...t }))
  );
  const [filter, setFilter] = useState<ChatFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(chatThreads[0]?.id ?? null);
  const [mobile, setMobile] = useState<"list" | "chat" | "profile">("list");

  const thread = useMemo(
    () => threads.find((c) => c.id === selectedId) ?? null,
    [threads, selectedId]
  );

  const assignAgent = (chatId: string, assignedAgentId: string | undefined) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === chatId ? { ...t, assignedAgentId } : t))
    );
  };

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col lg:grid lg:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-cols-[260px_minmax(0,1fr)_260px]">
      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:block",
          mobile === "list" ? "flex" : "hidden lg:flex"
        )}
      >
        <ChatListColumn
          threads={threads}
          filter={filter}
          onFilter={setFilter}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onMobileOpenChat={() => setMobile("chat")}
        />
      </div>

      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
          mobile === "chat" ? "flex" : "hidden lg:flex"
        )}
      >
        <ConversationColumn
          key={thread?.id ?? "none"}
          thread={thread}
          showBack={mobile === "chat"}
          onBack={() => setMobile("list")}
          onOpenProfile={() => setMobile("profile")}
          onAssignAgent={(agentId) => thread && assignAgent(thread.id, agentId)}
        />
      </div>

      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-t border-border lg:border-t-0",
          mobile === "profile" ? "flex" : "hidden lg:flex"
        )}
      >
        <ProfilePanel
          thread={thread}
          showClose={mobile === "profile"}
          onClose={() => setMobile("chat")}
        />
      </div>

      {thread && (mobile === "chat" || mobile === "profile") && (
        <div className="fixed bottom-4 right-4 z-20 max-lg:bottom-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
          <button
            type="button"
            onClick={() => setMobile((m) => (m === "profile" ? "chat" : "profile"))}
            className="rounded-full bg-gradient-to-r from-primary to-emerald-600 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            {mobile === "profile" ? "Back to chat" : "Contact"}
          </button>
        </div>
      )}
    </div>
  );
}
