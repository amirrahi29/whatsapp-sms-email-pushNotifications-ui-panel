<p align="center">
  <img src="./docs/images/hero-banner.png" alt="Nexus Reach — Omnichannel CRM" width="100%" />
</p>

<h1 align="center">Nexus Reach</h1>

<p align="center">
  <strong>Omnichannel CRM UI</strong> — WhatsApp, SMS, Email & Push in one control plane.<br/>
  <em>Industry-style demo for inbox, outbound campaigns, automation & analytics.</em>
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <img src="https://img.shields.io/badge/Demo-Mock%20Data-10b981?style=for-the-badge" alt="Demo" />
</p>

<p align="center">
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick start</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## Overview

**Nexus Reach** is a modern **front-end demo** of an omnichannel customer engagement platform — the kind of UI you see on products like Respond.io, Wati, Braze, or Zendesk Sunshine.

| Channel | Inbox | Outbound | Analytics |
|---------|:-----:|:--------:|:---------:|
| WhatsApp | ✅ | ✅ | ✅ |
| SMS | ✅ | ✅ | ✅ |
| Email | ✅ | ✅ | ✅ |
| Push | ✅ | ✅ | ✅ |

> **Note:** This repo is a **UI prototype** with mock data. No real WhatsApp / SMS / Email / Push APIs are connected yet. Ideal for portfolios, investor demos, and SaaS MVP design references.

---

## Screenshots

### Unified inbox & dashboard

<p align="center">
  <img src="./docs/images/dashboard-preview.png" alt="Unified inbox with channel filters" width="92%" />
</p>
<p align="center"><sub>Unified inbox — filter by WhatsApp, SMS, Email, or Push</sub></p>

### Channel hub

<p align="center">
  <img src="./docs/images/channels-preview.png" alt="Channel hub — connections and compliance" width="92%" />
</p>
<p align="center"><sub>Channel hub — providers, health, compliance per channel</sub></p>

---

## Features

### Omnichannel architecture

- **Unified inbox** — all conversations in one list; channel tabs for segregation  
- **Channel hub** (`/channels`) — connection status, providers, volume, compliance matrix  
- **Per-channel navigation** — sidebar links open inbox pre-filtered by channel  

### Engagement

- **Contacts** — search, tags, owners, bulk actions  
- **Outbound** — multi-channel campaigns, templates, drip sequences, funnels  
- **Automation** — trigger catalog & rule examples (demo)  
- **Pipeline** — drag-and-drop Kanban for sales stages  

### Insights & admin

- **Analytics** — charts + per-channel performance cards (Recharts)  
- **Team** — agents, roles, presence  
- **Settings** — channel integrations + workspace sections  

### UX polish

- Light / dark theme (system-aware)  
- Responsive layout (mobile drawer, inbox 3-column → stacked)  
- Page transitions, staggered cards, hover micro-interactions  
- Demo banner + **Home** onboarding map (Hindi-friendly copy in UI)  

---

## Quick start

### Prerequisites

- **Node.js** 20+  
- **npm** 10+ (or pnpm / yarn)

### Install & run

```bash
git clone https://github.com/YOUR_USERNAME/whatsapp-crm.git
cd whatsapp-crm
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

| URL | Description |
|-----|-------------|
| `/` | Marketing landing page |
| `/login` | Sign-in (any email/password → demo) |
| `/home` | Product map & channel volume |
| `/channels` | Channel command center |
| `/inbox` | Unified omnichannel inbox |
| `/campaigns` | Outbound campaigns |
| `/analytics` | Dashboards |

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project structure

```
whatsapp-crm/
├── docs/images/          # README screenshots & banner
├── public/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (dashboard)/  # Shell: inbox, channels, campaigns, …
│   │   ├── login/
│   │   └── page.tsx      # Marketing home
│   ├── components/
│   │   ├── channels/     # ChannelBadge, ChannelTabs, ChannelsHub
│   │   ├── layout/       # Sidebar, header, shell
│   │   ├── inbox/
│   │   ├── campaigns/
│   │   └── ui/
│   ├── data/mock/        # Types + seed data
│   └── lib/
│       ├── channels.ts   # Channel metadata (WA, SMS, email, push)
│       └── stores/       # Zustand UI state
└── package.json
```

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide](https://lucide.dev) |
| Charts | [Recharts](https://recharts.org) |
| State | [Zustand](https://zustand.docs.pmnd.rs) (persisted theme, inbox filters) |
| Fonts | [Geist](https://vercel.com/font) |

---

## Architecture (conceptual)

```mermaid
flowchart TB
  subgraph channels [Channels]
    WA[WhatsApp]
    SMS[SMS]
    EM[Email]
    PU[Push]
  end

  subgraph product [Nexus Reach UI]
    HUB[Channel Hub]
    INBOX[Unified Inbox]
    OUT[Outbound]
    AUTO[Automation]
    AN[Analytics]
  end

  WA --> HUB
  SMS --> HUB
  EM --> HUB
  PU --> HUB
  HUB --> INBOX
  INBOX --> OUT
  OUT --> AN
  AUTO --> INBOX
```

---

## Configuration

| Item | Location |
|------|----------|
| Theme & inbox filters | `src/lib/stores/ui-store.ts` (localStorage key `wa-crm-ui`) |
| Channel definitions | `src/lib/channels.ts` |
| Mock data | `src/data/mock/index.ts` |
| Global styles | `src/app/globals.css` |

---

## Roadmap (toward real SaaS)

- [ ] Meta WhatsApp Cloud API + template sync  
- [ ] SMS provider (Twilio / MSG91)  
- [ ] Email (SendGrid / SES)  
- [ ] Push (FCM / APNs)  
- [ ] Auth, multi-tenant workspaces, billing  
- [ ] Real-time inbox (WebSockets)  
- [ ] Webhooks & REST API  

---

## Disclaimer

This project is a **UI demonstration**. It is not affiliated with Meta, WhatsApp, or any BSP. For production use you need official API accounts, approved templates, and compliance (opt-in, TCPA, CAN-SPAM, push consent).

---

## License

MIT — use freely for learning, portfolios, and as a starter for your own product.

---

<p align="center">
  Built with Next.js · Designed for omnichannel CRM workflows<br/>
  <sub>⭐ Star this repo if it helps your portfolio or SaaS journey</sub>
</p>
