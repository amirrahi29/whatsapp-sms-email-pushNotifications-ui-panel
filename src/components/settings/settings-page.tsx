"use client";

import Link from "next/link";
import {
  Bell,
  Building2,
  Clock,
  FileDown,
  Gauge,
  MessageCircle,
  Palette,
  Shield,
  Smartphone,
  Mail,
  Webhook,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { channelConfigs } from "@/data/mock";
import { channelMeta, CHANNEL_ORDER } from "@/lib/channels";
import { cn } from "@/lib/utils";

const sections = [
  {
    icon: Building2,
    title: "Workspace",
    desc: "Company profile, default queue, timezone & branding",
  },
  {
    icon: Webhook,
    title: "Webhooks & API",
    desc: "Inbound events, outbound API keys, IP allowlist",
  },
  {
    icon: Clock,
    title: "Business hours & routing",
    desc: "Office hours, after-hours rules, round-robin assignment",
  },
  {
    icon: Gauge,
    title: "SLA policies",
    desc: "First response targets by queue & channel",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Email, desktop, supervisor alerts",
  },
  {
    icon: Shield,
    title: "Security & compliance",
    desc: "SSO, audit log, retention, GDPR export",
  },
  {
    icon: FileDown,
    title: "Data export",
    desc: "Conversation archives, scheduled reports",
  },
  {
    icon: Palette,
    title: "Appearance",
    desc: "Theme from profile menu (light / dark / system)",
  },
] as const;

const channelIcons = {
  whatsapp: MessageCircle,
  sms: Smartphone,
  email: Mail,
  push: Bell,
} as const;

export function SettingsPage() {
  return (
    <div className="app-page-wide">
      <PageHeader
        title="Settings"
        description="Har channel alag integrate karein — WhatsApp (Meta), SMS (Twilio), Email (SendGrid), Push (FCM/APNs)."
        actions={
          <Link href="/channels" className="app-btn-secondary">
            Channel hub
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <section>
        <p className="app-section-label">Channel integrations</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {CHANNEL_ORDER.map((channelId) => {
            const meta = channelMeta(channelId);
            const config = channelConfigs.find((c) => c.channel === channelId)!;
            const Icon = channelIcons[channelId];
            return (
              <div
                key={channelId}
                className="app-surface app-surface--hover flex items-start gap-4 p-4"
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                    meta.accent
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{meta.label}</h3>
                    <ChannelBadge channel={channelId} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{config.provider}</p>
                  <p className="mt-1 text-xs capitalize text-primary">{config.status}</p>
                </div>
                <button type="button" className="app-btn-secondary shrink-0 text-xs">
                  Configure
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <p className="app-section-label">Workspace</p>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(({ icon: Icon, title, desc }) => (
          <section key={title} className="app-surface app-surface--hover flex gap-4 p-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-primary hover:underline"
              >
                Configure →
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
