import type { LucideIcon } from "lucide-react";
import { Bell, Mail, MessageCircle, Smartphone } from "lucide-react";

/** Supported outbound / inbound messaging channels. */
export type ChannelId = "whatsapp" | "sms" | "email" | "push";

export type ChannelFilter = ChannelId | "all";

export type ChannelMeta = {
  id: ChannelId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient + text for badges/cards */
  accent: string;
  badgeClass: string;
  dotClass: string;
  /** Industry compliance / routing hint (UI copy) */
  compliance: string;
};

export const CHANNEL_ORDER: ChannelId[] = ["whatsapp", "sms", "email", "push"];

export const channels: Record<ChannelId, ChannelMeta> = {
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp",
    shortLabel: "WA",
    description: "Business API · templates · session messages",
    icon: MessageCircle,
    accent: "from-emerald-500/25 to-teal-500/10 text-emerald-700 dark:text-emerald-300",
    badgeClass:
      "bg-emerald-500/15 text-emerald-800 ring-emerald-500/25 dark:text-emerald-200",
    dotClass: "bg-emerald-500",
    compliance: "Meta WABA · opt-in · 24h session window",
  },
  sms: {
    id: "sms",
    label: "SMS",
    shortLabel: "SMS",
    description: "Transactional & promotional SMS via carrier routes",
    icon: Smartphone,
    accent: "from-sky-500/25 to-blue-500/10 text-sky-800 dark:text-sky-200",
    badgeClass: "bg-sky-500/15 text-sky-800 ring-sky-500/25 dark:text-sky-200",
    dotClass: "bg-sky-500",
    compliance: "TCPA / DLT · STOP keyword · sender ID",
  },
  email: {
    id: "email",
    label: "Email",
    shortLabel: "Email",
    description: "Marketing & lifecycle email with deliverability tools",
    icon: Mail,
    accent: "from-violet-500/25 to-purple-500/10 text-violet-800 dark:text-violet-200",
    badgeClass:
      "bg-violet-500/15 text-violet-800 ring-violet-500/25 dark:text-violet-200",
    dotClass: "bg-violet-500",
    compliance: "CAN-SPAM · SPF/DKIM · unsubscribe link",
  },
  push: {
    id: "push",
    label: "Push",
    shortLabel: "Push",
    description: "Mobile & web push via FCM / APNs",
    icon: Bell,
    accent: "from-amber-500/25 to-orange-500/10 text-amber-900 dark:text-amber-200",
    badgeClass:
      "bg-amber-500/15 text-amber-900 ring-amber-500/25 dark:text-amber-200",
    dotClass: "bg-amber-500",
    compliance: "OS permissions · quiet hours · deep links",
  },
};

export const channelFilters: { id: ChannelFilter; label: string }[] = [
  { id: "all", label: "All channels" },
  ...CHANNEL_ORDER.map((id) => ({ id, label: channels[id].label })),
];

export function channelMeta(id: ChannelId): ChannelMeta {
  return channels[id];
}

export function channelLabel(id: ChannelId | undefined): string {
  if (!id) return "—";
  return channels[id]?.label ?? id;
}
