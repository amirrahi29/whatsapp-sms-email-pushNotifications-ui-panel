"use client";

import { useState } from "react";
import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import {
  agentById,
  pipelineCards as initialCards,
  type PipelineCard,
} from "@/data/mock";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";

const columns: { id: PipelineCard["column"]; title: string }[] = [
  { id: "new", title: "New lead" },
  { id: "contacted", title: "Contacted" },
  { id: "qualified", title: "Qualified" },
  { id: "won", title: "Won" },
  { id: "lost", title: "Lost" },
];

export function PipelineBoard() {
  const [cards, setCards] = useState<PipelineCard[]>(initialCards);
  const [dragId, setDragId] = useState<string | null>(null);

  function onDrop(col: PipelineCard["column"]) {
    if (!dragId) return;
    setCards((prev) =>
      prev.map((c) => (c.id === dragId ? { ...c, column: col } : c))
    );
    setDragId(null);
  }

  return (
    <div className="app-page-wide">
      <PageHeader
        title="Pipeline"
        description="Sales leads — card ko column mein drag karke stage badlein (New → Won)."
        actions={
          <>
            <button type="button" className="app-btn-secondary">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
            <button type="button" className="app-btn-secondary">
              <Filter className="size-4" />
              All owners
            </button>
            <button type="button" className="app-btn-primary">
              <Plus className="size-4" />
              Add deal
            </button>
          </>
        }
      />

      <div className="flex min-w-0 gap-3 overflow-x-auto pb-2 pt-1 sm:gap-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex w-[min(100vw-3rem,280px)] shrink-0 flex-col rounded-2xl border border-border/70 bg-muted/15 shadow-sm ring-1 ring-black/5 sm:w-[min(100%,280px)] dark:bg-muted/10 dark:ring-white/10 lg:flex-1 lg:min-w-0 lg:max-w-none"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={() => onDrop(col.id)}
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-card/80 px-3 py-2.5 backdrop-blur-sm">
              <h2 className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {col.title}
              </h2>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                {cards.filter((c) => c.column === col.id).length}
              </span>
            </div>
            <div className="flex min-h-[min(40vh,320px)] flex-1 flex-col gap-2 p-2">
              {cards
                .filter((c) => c.column === col.id)
                .map((c) => {
                  const owner = agentById(c.ownerAgentId);
                  return (
                    <article
                      key={c.id}
                      draggable
                      onDragStart={() => setDragId(c.id)}
                      onDragEnd={() => setDragId(null)}
                      className={cn(
                        "cursor-grab rounded-xl border border-border/70 bg-card p-3 shadow-sm ring-1 ring-black/5 transition-shadow active:cursor-grabbing dark:ring-white/10",
                        dragId === c.id && "opacity-70 ring-2 ring-primary/45 shadow-md"
                      )}
                    >
                      <p className="font-semibold leading-snug text-foreground">{c.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{c.contact}</p>
                      {c.tags && c.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {c.tags.map((tg) => (
                            <span
                              key={tg}
                              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold tabular-nums text-primary">{c.value}</p>
                        {owner && (
                          <span
                            className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-bold ring-1 ring-border/60"
                            title={owner.name}
                          >
                            {initials(owner.name)}
                          </span>
                        )}
                      </div>
                      {c.updatedAt && (
                        <p className="mt-2 text-[10px] text-muted-foreground">
                          Updated · {c.updatedAt}
                        </p>
                      )}
                    </article>
                  );
                })}
              <button
                type="button"
                className="mt-auto flex items-center justify-center gap-1 rounded-xl border border-dashed border-border/80 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                <Plus className="size-3.5" />
                Quick add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
