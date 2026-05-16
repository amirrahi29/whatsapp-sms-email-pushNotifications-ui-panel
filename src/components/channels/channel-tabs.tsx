"use client";

import { cn } from "@/lib/utils";
import { channelFilters, channelMeta, type ChannelFilter } from "@/lib/channels";

type ChannelTabsProps = {
  value: ChannelFilter;
  onChange: (v: ChannelFilter) => void;
  /** Compact pills for inbox toolbar */
  variant?: "pills" | "segmented";
  className?: string;
};

export function ChannelTabs({
  value,
  onChange,
  variant = "pills",
  className,
}: ChannelTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter by channel"
      className={cn(
        "flex gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        variant === "segmented"
          ? "app-surface--inset rounded-xl p-1"
          : "gap-1",
        className
      )}
    >
      {channelFilters.map(({ id, label }) => {
        const active = value === id;
        const Icon = id === "all" ? null : channelMeta(id).icon;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg font-semibold transition-all duration-200",
              variant === "segmented" ? "px-2.5 py-1.5 text-[11px]" : "px-2 py-1 text-[10px]",
              active
                ? "bg-card text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {Icon ? (
              <Icon
                className={cn(
                  "size-3.5 shrink-0",
                  active && id !== "all" && channelMeta(id).dotClass.replace("bg-", "text-")
                )}
              />
            ) : null}
            <span className="whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
