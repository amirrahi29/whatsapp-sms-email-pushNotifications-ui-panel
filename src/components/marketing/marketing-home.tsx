"use client";

import Link from "next/link";
import {
  BarChart3,
  BadgeCheck,
  Bot,
  ChevronDown,
  LayoutGrid,
  Megaphone,
  Menu,
  MousePointerClick,
  Package,
  Plug,
  Shield,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#solutions", label: "Solutions" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#faq", label: "FAQ" },
];

const features = [
  {
    icon: Megaphone,
    title: "Bulk broadcasts",
    desc: "Campaigns and promotional sends with templates, throttling, and delivery insights.",
  },
  {
    icon: Bot,
    title: "Chatbots & automation",
    desc: "Keyword triggers, handoff to agents, and workflows without leaving the inbox.",
  },
  {
    icon: Package,
    title: "Catalog & commerce",
    desc: "Show products and order updates where customers already chat.",
  },
  {
    icon: MousePointerClick,
    title: "Click-to-WhatsApp",
    desc: "Turn Meta ads into conversations and measure cost per qualified chat.",
  },
  {
    icon: Users,
    title: "Team inbox",
    desc: "Queues, assignment, SLAs, and presence so your whole team scales on one number.",
  },
  {
    icon: Plug,
    title: "API & webhooks",
    desc: "Events, outbound messaging, and integrations with your stack.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Campaign performance, response times, and CSAT in one dashboard.",
  },
  {
    icon: BadgeCheck,
    title: "Official channel",
    desc: "Built around the WhatsApp Business Platform — templates, quality, and compliance.",
  },
] as const;

const useCases = [
  {
    title: "Marketing campaigns",
    points: ["Broadcasts & journeys", "Segments & tags", "A/B and quiet hours"],
  },
  {
    title: "Appointments & support",
    points: ["Routing & business hours", "Canned replies", "Internal notes"],
  },
  {
    title: "Sales & leads",
    points: ["Pipeline & deals", "Lead capture", "Handoff from ads"],
  },
] as const;

const faqs = [
  {
    q: "What is the WhatsApp Business Platform?",
    a: "It is Meta’s official API for businesses to message customers at scale with templates, webhooks, and team tools — not the consumer WhatsApp app.",
  },
  {
    q: "Is this demo connected to Meta?",
    a: "This UI is a front-end demo. Production would use your WhatsApp Business Account, tokens, and approved templates from Meta.",
  },
  {
    q: "Can multiple agents use one number?",
    a: "Yes. A shared inbox with queues, assignment, and collision awareness is how enterprise teams operate on WhatsApp.",
  },
] as const;

export function MarketingHome() {
  const [openNav, setOpenNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/25">
              N
            </span>
            <span className="hidden sm:inline">Nexus Reach</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition-opacity hover:opacity-95"
            >
              Get started
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl text-white md:hidden"
              aria-label="Menu"
              onClick={() => setOpenNav((v) => !v)}
            >
              {openNav ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {openNav && (
          <div className="border-t border-white/10 bg-zinc-950 px-4 py-3 md:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="block py-2 text-sm text-zinc-300"
                onClick={() => setOpenNav(false)}
              >
                {n.label}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-2 block py-2 text-sm font-medium text-emerald-400"
              onClick={() => setOpenNav(false)}
            >
              Login
            </Link>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden bg-zinc-950 px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-28 sm:pt-24">
        <div
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] animate-float rounded-full bg-emerald-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 animate-float rounded-full bg-teal-500/15 blur-3xl [animation-delay:1.5s]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-widest text-emerald-400/90 opacity-0 [animation-fill-mode:forwards]">
            Omnichannel · WhatsApp · SMS · Email · Push
          </p>
          <h1 className="animate-fade-in-up mt-4 text-4xl font-bold leading-[1.1] tracking-tight opacity-0 [animation-delay:80ms] [animation-fill-mode:forwards] sm:text-5xl md:text-6xl">
            Every channel.{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              One control plane.
            </span>
          </h1>
          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-zinc-400 opacity-0 [animation-delay:140ms] [animation-fill-mode:forwards] sm:text-xl">
            Industry-standard layout: segregated channel policies, unified inbox, outbound
            per channel, and analytics side-by-side — like Braze, Iterable, or Zendesk Sunshine.
          </p>
          <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 opacity-0 [animation-delay:220ms] [animation-fill-mode:forwards] sm:flex-row">
            <Link
              href="/home"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-[0.98] sm:w-auto"
            >
              <Zap className="size-5" />
              Open console
            </Link>
            <a
              href="#solutions"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              Explore solutions
            </a>
          </div>
          <p className="mt-12 text-sm font-medium text-zinc-500">
            Trusted pattern for teams scaling on{" "}
            <span className="text-zinc-300">official WhatsApp infrastructure</span>
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/30 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Kaise kaam karta hai
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Teen steps — poora flow samajh aa jaye
            </h2>
          </div>
          <ol className="stagger-grid mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Inbox — baat karo",
                body: "Customer messages ek jagah. Assign, tag, quick reply — support team yahin rehti hai.",
              },
              {
                step: "02",
                title: "Broadcast — bhejo",
                body: "Contacts select karo, approved template choose karo, schedule ya abhi bhejo.",
              },
              {
                step: "03",
                title: "Analytics — dekho",
                body: "Kitne deliver hue, kitni der mein jawab aaya — numbers se improve karo.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] ring-1 ring-black/5 dark:ring-white/10"
              >
                <span className="text-3xl font-bold tabular-nums text-primary/25">{item.step}</span>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Console map kholo (Home)
              <Zap className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section id="solutions" className="border-b border-border/60 bg-muted/25 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive WhatsApp solutions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Same pillars you see on provider sites — inbox, campaigns, automation, and
              integrations — in one cohesive product surface.
            </p>
          </div>
          <div className="stagger-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="app-surface--hover rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] ring-1 ring-black/5 dark:ring-white/10"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Built for how you work
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-border/70 bg-gradient-to-b from-card to-muted/20 p-6"
              >
                <LayoutGrid className="size-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{u.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {u.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  Get started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-primary/[0.06] px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to try the console?
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Sign in with the demo account and explore inbox, broadcasts, automation, and
              analytics.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/login" className="app-btn-primary rounded-full px-8 py-3">
              Launch app
            </Link>
            <a
              href="#faq"
              className="app-btn-secondary rounded-full border-primary/20 px-8 py-3"
            >
              Read FAQ
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-10 space-y-2">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-border/70 bg-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold sm:text-base"
                  onClick={() => setOpenFaq((c) => (c === i ? null : i))}
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border/60 px-4 pb-4 pt-0 text-sm text-muted-foreground">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-muted/30 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
                N
              </span>
              Nexus Inbox
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Demo CRM UI — not affiliated with WABA Connect. Layout inspired by common BSP
              marketing patterns.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">Product</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/home" className="hover:text-foreground">
                    Console (Home)
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Resources</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="https://developers.facebook.com/docs/whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Meta WhatsApp docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://wabaconnect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    WABA Connect (reference)
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-semibold text-foreground">Trust</p>
              <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                <Shield className="size-4 shrink-0 text-primary" />
                Official API–ready architecture
              </p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nexus Inbox demo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
