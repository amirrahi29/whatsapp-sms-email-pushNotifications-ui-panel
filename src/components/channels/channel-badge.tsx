import { cn } from "@/lib/utils";
import { channelMeta, type ChannelId } from "@/lib/channels";

type ChannelBadgeProps = {
  channel: ChannelId;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
};

export function ChannelBadge({
  channel,
  size = "sm",
  showIcon = true,
  className,
}: ChannelBadgeProps) {
  const meta = channelMeta(channel);
  const Icon = meta.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold ring-1 ring-inset",
        meta.badgeClass,
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
        className
      )}
    >
      {showIcon ? <Icon className={size === "sm" ? "size-2.5" : "size-3"} /> : null}
      {meta.shortLabel}
    </span>
  );
}
