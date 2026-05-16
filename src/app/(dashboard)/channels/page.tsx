import type { Metadata } from "next";
import { ChannelsHub } from "@/components/channels/channels-hub";

export const metadata: Metadata = {
  title: "Channels",
  description:
    "WhatsApp, SMS, Email, and Push — channel connections, compliance, and volume.",
};

export default function ChannelsPage() {
  return <ChannelsHub />;
}
