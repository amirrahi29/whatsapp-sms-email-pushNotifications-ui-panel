"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChannelFilter } from "@/lib/channels";

export type ThemeMode = "light" | "dark" | "system";

export type InboxQueueFilter = "all" | "support" | "sales" | "billing";

type UiState = {
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  demoBannerDismissed: boolean;
  theme: ThemeMode;
  online: boolean;
  /** Logged-in agent (multi-seat inbox). */
  currentAgentId: string;
  /** Filter conversation list by routing queue. */
  inboxQueueFilter: InboxQueueFilter;
  inboxChannelFilter: ChannelFilter;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  setMobileNavOpen: (v: boolean) => void;
  setTheme: (t: ThemeMode) => void;
  setOnline: (v: boolean) => void;
  setCurrentAgentId: (id: string) => void;
  setInboxQueueFilter: (q: InboxQueueFilter) => void;
  setInboxChannelFilter: (c: ChannelFilter) => void;
  setDemoBannerDismissed: (v: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileNavOpen: false,
      demoBannerDismissed: false,
      theme: "system",
      online: true,
      currentAgentId: "a2",
      inboxQueueFilter: "all",
      inboxChannelFilter: "all",
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setTheme: (theme) => set({ theme }),
      setOnline: (online) => set({ online }),
      setCurrentAgentId: (currentAgentId) => set({ currentAgentId }),
      setInboxQueueFilter: (inboxQueueFilter) => set({ inboxQueueFilter }),
      setInboxChannelFilter: (inboxChannelFilter) => set({ inboxChannelFilter }),
      setDemoBannerDismissed: (demoBannerDismissed) => set({ demoBannerDismissed }),
    }),
    {
      name: "wa-crm-ui",
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        demoBannerDismissed: s.demoBannerDismissed,
        theme: s.theme,
        online: s.online,
        currentAgentId: s.currentAgentId,
        inboxQueueFilter: s.inboxQueueFilter,
        inboxChannelFilter: s.inboxChannelFilter,
      }),
    }
  )
);
