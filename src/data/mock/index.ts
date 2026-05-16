import type { ChannelId } from "@/lib/channels";

export type ChatFilter = "all" | "mine" | "unread" | "unassigned" | "assigned";

export type { ChannelId };

export type RoutingQueueId = "support" | "sales" | "billing";

export type ChatThread = {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
  /** Primary channel for this conversation. */
  channel: ChannelId;
  /** Email address, SMS sender, device label, etc. */
  channelHandle?: string;
  /** Agent handling this thread (multi-agent CRM). */
  assignedAgentId?: string;
  /** Inbox queue for routing & reporting. */
  queueId: RoutingQueueId;
  tags: string[];
  online?: boolean;
  /** First-response SLA hint for list badges (UI mock). */
  sla?: "ok" | "warn" | "breach";
};

export type Message = {
  id: string;
  chatId: string;
  body: string;
  direction: "in" | "out";
  at: string;
  channel?: ChannelId;
  status?: "sent" | "delivered" | "read" | "opened" | "clicked" | "bounced";
  subject?: string;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  lastActivity: string;
  company?: string;
  /** Account owner / primary agent (multi-seat CRM). */
  ownerAgentId?: string;
  lifecycle?: "customer" | "lead" | "churned";
};

export type Campaign = {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "sent" | "paused";
  audience: string;
  sent: number;
  delivered: number;
  read: number;
  scheduledAt?: string;
  /** Advanced broadcast fields (UI / mock). */
  channel: ChannelId;
  templateName?: string;
  audienceCount?: number;
  failed?: number;
  replied?: number;
  optOuts?: number;
  abTest?: boolean;
  sendRatePerMin?: number;
};

export type WaTemplate = {
  id: string;
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  status: "approved" | "pending" | "rejected";
  lastEdited: string;
  bodyPreview: string;
};

export type DripSequence = {
  id: string;
  name: string;
  steps: number;
  enrolled: number;
  status: "active" | "paused" | "draft";
  lastRun?: string;
};

export type AgentRole = "Admin" | "Supervisor" | "Agent";

export type Agent = {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  status: "online" | "away" | "offline";
  avatar?: string;
  /** Human-readable “last seen” for team roster. */
  lastActive?: string;
  /** Open assigned conversations (mock capacity). */
  openConversations?: number;
};

export type QuickReply = {
  id: string;
  shortcut: string;
  title: string;
  body: string;
};

export type RoutingQueue = {
  id: RoutingQueueId | "all";
  name: string;
  description?: string;
};

export type PipelineCard = {
  id: string;
  title: string;
  value: string;
  contact: string;
  column: "new" | "contacted" | "qualified" | "won" | "lost";
  ownerAgentId?: string;
  tags?: string[];
  updatedAt?: string;
};

export const routingQueues: RoutingQueue[] = [
  { id: "all", name: "All queues", description: "Support, sales & billing" },
  { id: "support", name: "Support", description: "Tickets & product help" },
  { id: "sales", name: "Sales", description: "Pipeline & quotes" },
  { id: "billing", name: "Billing", description: "Invoices & renewals" },
];

export function queueLabel(id: RoutingQueueId): string {
  return routingQueues.find((q) => q.id === id)?.name ?? id;
}

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "Admin",
    status: "online",
    lastActive: "Now",
    openConversations: 4,
  },
  {
    id: "a2",
    name: "Marcus Webb",
    email: "marcus@acme.com",
    role: "Agent",
    status: "away",
    lastActive: "6m ago",
    openConversations: 8,
  },
  {
    id: "a3",
    name: "Elena Rossi",
    email: "elena@acme.com",
    role: "Supervisor",
    status: "online",
    lastActive: "Now",
    openConversations: 3,
  },
  {
    id: "a4",
    name: "James Okonkwo",
    email: "james@acme.com",
    role: "Agent",
    status: "offline",
    lastActive: "2h ago",
    openConversations: 0,
  },
  {
    id: "a5",
    name: "Priya Nair",
    email: "priya@acme.com",
    role: "Agent",
    status: "online",
    lastActive: "Now",
    openConversations: 5,
  },
];

/** Other agents “viewing” a thread — collision awareness (UI mock). */
export const viewingAgentsByChatId: Record<string, string[]> = {
  c1: ["a3"],
};

export const quickReplies: QuickReply[] = [
  {
    id: "qr1",
    shortcut: "/hi",
    title: "Greeting",
    body: "Hi there — thanks for reaching out. How can we help today?",
  },
  {
    id: "qr2",
    shortcut: "/sla",
    title: "SLA follow-up",
    body: "We’re on it and will update you within the next business hour.",
  },
  {
    id: "qr3",
    shortcut: "/thanks",
    title: "Close loop",
    body: "Thanks for your patience. Let us know if anything else comes up.",
  },
  {
    id: "qr4",
    shortcut: "/opt",
    title: "Opt-in reminder",
    body: "Reply STOP to unsubscribe from marketing. Service messages may still be sent.",
  },
];

export function agentById(id: string | undefined): Agent | undefined {
  if (!id) return undefined;
  return agents.find((a) => a.id === id);
}

export function agentName(id: string | undefined): string {
  return agentById(id)?.name ?? "—";
}

export const chatThreads: ChatThread[] = [
  {
    id: "c1",
    name: "Acme Retail",
    phone: "+1 415 555 0192",
    channel: "whatsapp",
    lastMessage: "Can we get a quote for 200 units?",
    lastAt: "2m",
    unread: 2,
    assignedAgentId: "a2",
    queueId: "sales",
    tags: ["VIP", "Sales"],
    online: true,
    sla: "warn",
  },
  {
    id: "c2",
    name: "Nina Patel",
    phone: "+44 7700 900321",
    channel: "whatsapp",
    lastMessage: "Thanks — that solved it!",
    lastAt: "18m",
    unread: 0,
    assignedAgentId: "a5",
    queueId: "support",
    tags: ["Support"],
    sla: "ok",
  },
  {
    id: "c3",
    name: "Brightline Logistics",
    phone: "+49 30 12345678",
    channel: "whatsapp",
    lastMessage: "Invoice attached for last month.",
    lastAt: "1h",
    unread: 1,
    assignedAgentId: "a3",
    queueId: "billing",
    tags: ["Billing"],
    sla: "ok",
  },
  {
    id: "c4",
    name: "Jordan Lee",
    phone: "+1 646 555 0143",
    channel: "sms",
    channelHandle: "+1 646 555 0143",
    lastMessage: "What's your SLA for enterprise?",
    lastAt: "3h",
    unread: 0,
    queueId: "sales",
    tags: ["Enterprise"],
    online: true,
    sla: "breach",
  },
  {
    id: "c5",
    name: "Studio North",
    phone: "+1 604 555 0100",
    channel: "whatsapp",
    lastMessage: "We'll confirm by EOD tomorrow.",
    lastAt: "Yesterday",
    unread: 0,
    assignedAgentId: "a1",
    queueId: "sales",
    tags: ["Partner"],
    sla: "ok",
  },
  {
    id: "c6",
    name: "Harbor Co. Ops",
    phone: "+1 212 555 0188",
    channel: "email",
    channelHandle: "ops@harbor.co",
    lastMessage: "Re: PO #8842 — delivery window?",
    lastAt: "25m",
    unread: 1,
    assignedAgentId: "a4",
    queueId: "support",
    tags: ["B2B", "Email"],
    sla: "ok",
  },
  {
    id: "c7",
    name: "Mina Cho",
    phone: "+82 10 1234 5678",
    channel: "sms",
    channelHandle: "+82 10 1234 5678",
    lastMessage: "STOP — wrong number",
    lastAt: "45m",
    unread: 0,
    assignedAgentId: "a5",
    queueId: "support",
    tags: ["SMS", "Opt-out"],
    sla: "ok",
  },
  {
    id: "c8",
    name: "App user · iOS",
    phone: "device-token",
    channel: "push",
    channelHandle: "iOS · v3.2.1",
    lastMessage: "Tapped: Flash sale notification",
    lastAt: "1h",
    unread: 2,
    queueId: "sales",
    tags: ["Push", "Mobile"],
    sla: "warn",
  },
  {
    id: "c9",
    name: "Vertex AI Labs",
    phone: "+1 650 555 0140",
    channel: "email",
    channelHandle: "sales@vertexailabs.io",
    lastMessage: "Security review docs attached",
    lastAt: "2h",
    unread: 0,
    assignedAgentId: "a1",
    queueId: "sales",
    tags: ["Enterprise", "Email"],
    sla: "ok",
  },
  {
    id: "c10",
    name: "GreenLeaf Market",
    phone: "+353 1 555 0120",
    channel: "sms",
    channelHandle: "+353 1 555 0120",
    lastMessage: "Your order is out for delivery",
    lastAt: "4h",
    unread: 0,
    assignedAgentId: "a3",
    queueId: "billing",
    tags: ["Transactional"],
    sla: "ok",
  },
];

export const messagesByChat: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      chatId: "c1",
      body: "Hi team — we’re expanding to two new stores.",
      direction: "in",
      at: "10:12",
    },
    {
      id: "m2",
      chatId: "c1",
      body: "That’s exciting! Happy to help with onboarding.",
      direction: "out",
      at: "10:14",
      status: "read",
    },
    {
      id: "m3",
      chatId: "c1",
      body: "Can we get a quote for 200 units?",
      direction: "in",
      at: "10:21",
    },
  ],
  c2: [
    {
      id: "m4",
      chatId: "c2",
      body: "The webhook was failing on weekends.",
      direction: "in",
      at: "09:02",
    },
    {
      id: "m5",
      chatId: "c2",
      body: "We shipped a fix — please retry your test flow.",
      direction: "out",
      at: "09:08",
      status: "read",
    },
    {
      id: "m6",
      chatId: "c2",
      body: "Thanks — that solved it!",
      direction: "in",
      at: "09:41",
    },
  ],
  c3: [
    {
      id: "m7",
      chatId: "c3",
      body: "Please find the invoice attached.",
      direction: "out",
      at: "Mon",
      status: "delivered",
    },
    {
      id: "m8",
      chatId: "c3",
      body: "Invoice attached for last month.",
      direction: "in",
      at: "Mon",
    },
  ],
  c4: [
    {
      id: "m9",
      chatId: "c4",
      body: "What’s your SLA for enterprise?",
      direction: "in",
      at: "08:10",
    },
  ],
  c5: [
    {
      id: "m10",
      chatId: "c5",
      body: "Sounds good — we'll confirm by EOD tomorrow.",
      direction: "in",
      at: "Yesterday",
    },
  ],
  c6: [
    {
      id: "m11",
      chatId: "c6",
      body: "PO #8842 — can you confirm delivery window?",
      direction: "in",
      at: "10:05",
      channel: "email",
      subject: "PO #8842 delivery",
    },
    {
      id: "m12",
      chatId: "c6",
      body: "Re: PO #8842 — delivery window?",
      direction: "out",
      at: "10:18",
      channel: "email",
      status: "delivered",
    },
  ],
  c7: [
    {
      id: "m13",
      chatId: "c7",
      body: "STOP — wrong number",
      direction: "in",
      at: "09:50",
      channel: "sms",
    },
  ],
  c8: [
    {
      id: "m14",
      chatId: "c8",
      body: "Flash sale — 20% off ends tonight",
      direction: "out",
      at: "09:00",
      channel: "push",
      status: "delivered",
    },
    {
      id: "m15",
      chatId: "c8",
      body: "Tapped: Flash sale notification",
      direction: "in",
      at: "09:02",
      channel: "push",
    },
  ],
  c9: [
    {
      id: "m16",
      chatId: "c9",
      body: "Security review docs attached",
      direction: "in",
      at: "08:30",
      channel: "email",
      subject: "Enterprise security questionnaire",
    },
  ],
  c10: [
    {
      id: "m17",
      chatId: "c10",
      body: "Your order is out for delivery. Track: gl.ie/x7k2",
      direction: "out",
      at: "07:15",
      channel: "sms",
      status: "delivered",
    },
  ],
};

function contactEmailFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
  return `${slug || "contact"}@company.com`;
}

export const contacts: Contact[] = [
  ...chatThreads.map((t) => ({
    id: t.id,
    name: t.name,
    phone: t.phone,
    email: contactEmailFromName(t.name),
    tags: t.tags,
    lastActivity: t.lastAt,
    company: t.name.includes(" ") ? undefined : `${t.name} LLC`,
    ownerAgentId: t.assignedAgentId,
    lifecycle: t.tags.some((x) => x === "VIP" || x === "Partner")
      ? ("customer" as const)
      : ("lead" as const),
  })),
  {
    id: "x1",
    name: "Harbor Co.",
    phone: "+1 212 555 0188",
    email: "ops@harbor.co",
    tags: ["Lead"],
    lastActivity: "2d",
    company: "Harbor Co.",
    ownerAgentId: "a4",
    lifecycle: "lead" as const,
  },
  {
    id: "x2",
    name: "Mina Cho",
    phone: "+82 10 1234 5678",
    email: "mina.cho@email.kr",
    tags: ["Support", "KR"],
    lastActivity: "4d",
    ownerAgentId: "a5",
    lifecycle: "customer" as const,
  },
  {
    id: "x3",
    name: "Vertex AI Labs",
    phone: "+1 650 555 0140",
    email: "sales@vertexailabs.io",
    tags: ["Enterprise"],
    lastActivity: "1w",
    company: "Vertex AI Labs",
    ownerAgentId: "a1",
    lifecycle: "lead" as const,
  },
  {
    id: "x4",
    name: "Omar Haddad",
    phone: "+971 4 555 0199",
    email: "omar.h@outlook.ae",
    tags: ["Sales"],
    lastActivity: "3h",
    ownerAgentId: "a2",
    lifecycle: "lead" as const,
  },
  {
    id: "x5",
    name: "GreenLeaf Market",
    phone: "+353 1 555 0120",
    email: "hello@greenleaf.ie",
    tags: ["Retail"],
    lastActivity: "5d",
    company: "GreenLeaf Market",
    ownerAgentId: "a3",
    lifecycle: "customer" as const,
  },
];

export const campaigns: Campaign[] = [
  {
    id: "cp1",
    name: "Spring promo — EU",
    status: "sent",
    audience: "Tags: Marketing ∩ Region: EU ∩ Opt-in: transactional",
    sent: 12480,
    delivered: 12102,
    read: 8420,
    channel: "whatsapp",
    templateName: "seasonal_promo_v3",
    audienceCount: 12840,
    failed: 378,
    replied: 1920,
    optOuts: 41,
    abTest: true,
    sendRatePerMin: 480,
  },
  {
    id: "cp2",
    name: "Re-engagement drip (Day 0)",
    status: "scheduled",
    audience: "Last purchase > 30d · Consent: marketing",
    sent: 0,
    delivered: 0,
    read: 0,
    scheduledAt: "Apr 30, 2026 · 09:00 UTC · Quiet: 22:00–08:00",
    channel: "whatsapp",
    templateName: "winback_day0",
    audienceCount: 8420,
    failed: 0,
    replied: 0,
    optOuts: 0,
    sendRatePerMin: 220,
  },
  {
    id: "cp3",
    name: "Product update v2.4",
    status: "draft",
    audience: "All opted-in · Exclude: churned",
    sent: 0,
    delivered: 0,
    read: 0,
    channel: "whatsapp",
    templateName: "product_announcement_en",
    audienceCount: 56000,
    failed: 0,
    replied: 0,
    optOuts: 0,
    abTest: false,
  },
  {
    id: "cp4",
    name: "Flash sale — GCC (paused)",
    status: "paused",
    audience: "Country: AE, SA, KW · VIP",
    sent: 3200,
    delivered: 3155,
    read: 2100,
    channel: "whatsapp",
    templateName: "flash_sale_ar",
    audienceCount: 3200,
    failed: 45,
    replied: 890,
    optOuts: 12,
    sendRatePerMin: 600,
  },
  {
    id: "cp5",
    name: "Cart abandon SMS · US",
    status: "sent",
    audience: "Abandoned cart · 1h delay",
    sent: 18420,
    delivered: 17980,
    read: 0,
    channel: "sms",
    templateName: "cart_reminder_sms",
    audienceCount: 19200,
    failed: 440,
    replied: 2100,
    optOuts: 89,
    sendRatePerMin: 1200,
  },
  {
    id: "cp6",
    name: "Newsletter · April product drop",
    status: "sent",
    audience: "Marketing opt-in · engaged 90d",
    sent: 84200,
    delivered: 82100,
    read: 28400,
    channel: "email",
    templateName: "newsletter_april_2026",
    audienceCount: 86000,
    failed: 2100,
    replied: 0,
    optOuts: 312,
    sendRatePerMin: 8000,
  },
  {
    id: "cp7",
    name: "Price drop push · wishlist",
    status: "scheduled",
    audience: "Wishlist SKU · push enabled",
    sent: 0,
    delivered: 0,
    read: 0,
    scheduledAt: "May 17, 2026 · 10:00 local",
    channel: "push",
    templateName: "price_drop_push",
    audienceCount: 12400,
    failed: 0,
    replied: 0,
    optOuts: 0,
    sendRatePerMin: 5000,
  },
];

export type ChannelConnectionStatus = "connected" | "degraded" | "setup";

export type ChannelConfig = {
  channel: ChannelId;
  provider: string;
  status: ChannelConnectionStatus;
  healthNote: string;
};

export const channelConfigs: ChannelConfig[] = [
  {
    channel: "whatsapp",
    provider: "Meta Cloud API · BSP",
    status: "connected",
    healthNote: "Quality rating: High · 99.2% delivery",
  },
  {
    channel: "sms",
    provider: "Twilio · US/EU routes",
    status: "connected",
    healthNote: "DLT registered · 97.8% delivery",
  },
  {
    channel: "email",
    provider: "SendGrid · shared IP warm",
    status: "connected",
    healthNote: "Inbox placement 94% · bounce 0.4%",
  },
  {
    channel: "push",
    provider: "Firebase FCM + APNs",
    status: "degraded",
    healthNote: "iOS token refresh spike — monitoring",
  },
];

export type ChannelVolumeRow = {
  channel: ChannelId;
  volume: number;
  changePct: number;
};

export const channelVolumeToday: ChannelVolumeRow[] = [
  { channel: "whatsapp", volume: 2847, changePct: 6.2 },
  { channel: "sms", volume: 1924, changePct: 3.1 },
  { channel: "email", volume: 8420, changePct: 12.4 },
  { channel: "push", volume: 15680, changePct: -2.1 },
];

export type ChannelMetricRow = {
  channel: ChannelId;
  sent: number;
  delivered: number;
  engagement: number;
  label: string;
};

export const channelMetricsWeek: ChannelMetricRow[] = [
  {
    channel: "whatsapp",
    sent: 18420,
    delivered: 17980,
    engagement: 68,
    label: "Read rate",
  },
  {
    channel: "sms",
    sent: 12400,
    delivered: 12100,
    engagement: 17,
    label: "Reply rate",
  },
  {
    channel: "email",
    sent: 84200,
    delivered: 82100,
    engagement: 34,
    label: "Open rate",
  },
  {
    channel: "push",
    sent: 45600,
    delivered: 44100,
    engagement: 8.2,
    label: "Tap rate",
  },
];

export const waTemplates: WaTemplate[] = [
  {
    id: "t1",
    name: "seasonal_promo_v3",
    category: "MARKETING",
    language: "en",
    status: "approved",
    lastEdited: "Apr 12, 2026",
    bodyPreview: "Hi {{1}}, spring savings inside — tap to view offers.",
  },
  {
    id: "t2",
    name: "winback_day0",
    category: "MARKETING",
    language: "en",
    status: "approved",
    lastEdited: "Apr 01, 2026",
    bodyPreview: "We miss you {{1}}. Here is 15% off your next order.",
  },
  {
    id: "t3",
    name: "order_shipped_notice",
    category: "UTILITY",
    language: "en",
    status: "approved",
    lastEdited: "Mar 20, 2026",
    bodyPreview: "Your order {{1}} has shipped. Track: {{2}}",
  },
  {
    id: "t4",
    name: "otp_login_code",
    category: "AUTHENTICATION",
    language: "en",
    status: "approved",
    lastEdited: "Feb 02, 2026",
    bodyPreview: "{{1}} is your verification code. Do not share.",
  },
  {
    id: "t5",
    name: "summer_drop_teaser",
    category: "MARKETING",
    language: "en",
    status: "pending",
    lastEdited: "Apr 26, 2026",
    bodyPreview: "Something new drops {{1}} — get early access.",
  },
];

export const dripSequences: DripSequence[] = [
  {
    id: "d1",
    name: "Onboarding · 5 touch",
    steps: 5,
    enrolled: 12800,
    status: "active",
    lastRun: "2h ago",
  },
  {
    id: "d2",
    name: "Abandoned cart · 3 touch",
    steps: 3,
    enrolled: 4200,
    status: "active",
    lastRun: "30m ago",
  },
  {
    id: "d3",
    name: "NPS follow-up",
    steps: 2,
    enrolled: 0,
    status: "draft",
  },
];

export const pipelineCards: PipelineCard[] = [
  {
    id: "p1",
    title: "Northwind expansion",
    value: "$48k",
    contact: "Acme Retail",
    column: "new",
    ownerAgentId: "a2",
    tags: ["Enterprise", "Warm"],
    updatedAt: "2h",
  },
  {
    id: "p2",
    title: "API enterprise tier",
    value: "$120k",
    contact: "Jordan Lee",
    column: "contacted",
    ownerAgentId: "a3",
    tags: ["API"],
    updatedAt: "1d",
  },
  {
    id: "p3",
    title: "Logistics pilot",
    value: "$32k",
    contact: "Brightline Logistics",
    column: "qualified",
    ownerAgentId: "a5",
    tags: ["Pilot"],
    updatedAt: "4h",
  },
  {
    id: "p4",
    title: "Annual support bundle",
    value: "$18k",
    contact: "Studio North",
    column: "won",
    ownerAgentId: "a1",
    tags: ["Renewal"],
    updatedAt: "3d",
  },
  {
    id: "p5",
    title: "SMB rollout",
    value: "$6k",
    contact: "Nina Patel",
    column: "lost",
    ownerAgentId: "a5",
    tags: ["SMB"],
    updatedAt: "1w",
  },
];

export type BroadcastActivityItem = {
  id: string;
  time: string;
  actor: string;
  action: string;
};

export const broadcastActivityFeed: BroadcastActivityItem[] = [
  {
    id: "ba1",
    time: "8m",
    actor: "Sarah Chen",
    action: "Scheduled “Re-engagement drip” for Apr 30",
  },
  {
    id: "ba2",
    time: "42m",
    actor: "System",
    action: "Quality rating · High (no change)",
  },
  {
    id: "ba3",
    time: "2h",
    actor: "Marcus Webb",
    action: "Paused “Flash sale — GCC”",
  },
  {
    id: "ba4",
    time: "5h",
    actor: "Elena Rossi",
    action: "Submitted template “summer_drop_teaser” for review",
  },
];

export type AgentSendStat = { agentId: string; sends: number; readRate: number };

export const agentSendStats: AgentSendStat[] = [
  { agentId: "a1", sends: 4200, readRate: 71 },
  { agentId: "a2", sends: 3800, readRate: 68 },
  { agentId: "a3", sends: 3100, readRate: 74 },
  { agentId: "a5", sends: 2900, readRate: 66 },
];

export type QueueVolumeRow = { queue: string; chats: number; pct: number };

export const queueVolumeBreakdown: QueueVolumeRow[] = [
  { queue: "Support", chats: 356, pct: 42 },
  { queue: "Sales", chats: 298, pct: 35 },
  { queue: "Billing", chats: 193, pct: 23 },
];

export const analyticsSeries = [
  { day: "Mon", chats: 120, responseMin: 4.2 },
  { day: "Tue", chats: 142, responseMin: 3.8 },
  { day: "Wed", chats: 98, responseMin: 5.1 },
  { day: "Thu", chats: 164, responseMin: 3.4 },
  { day: "Fri", chats: 189, responseMin: 3.1 },
  { day: "Sat", chats: 76, responseMin: 6.0 },
  { day: "Sun", chats: 54, responseMin: 7.2 },
];

export const campaignPerformance = [
  { name: "Spring promo", ctr: 12.4, replies: 980 },
  { name: "Win-back", ctr: 9.1, replies: 420 },
  { name: "NPS follow-up", ctr: 15.8, replies: 610 },
];
