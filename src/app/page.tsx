import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing/marketing-home";

export const metadata: Metadata = {
  title: "Omnichannel customer engagement",
  description:
    "WhatsApp, SMS, Email, and Push — unified inbox, outbound campaigns, and channel analytics for modern teams.",
};

export default function Home() {
  return <MarketingHome />;
}
