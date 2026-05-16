import type { Metadata } from "next";
import { InboxPage } from "@/components/inbox/inbox-page";

export const metadata: Metadata = {
  title: "Inbox · Nexus Inbox",
  description: "WhatsApp-style team inbox",
};

export default function Page() {
  return <InboxPage />;
}
