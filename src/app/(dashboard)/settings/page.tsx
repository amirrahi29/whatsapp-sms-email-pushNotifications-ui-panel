import type { Metadata } from "next";
import { SettingsPage } from "@/components/settings/settings-page";

export const metadata: Metadata = {
  title: "Settings · Nexus Inbox",
};

export default function Page() {
  return <SettingsPage />;
}
