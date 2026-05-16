import type { Metadata } from "next";
import { NewCampaignPage } from "@/components/campaigns/new-campaign-page";

export const metadata: Metadata = {
  title: "New campaign · Nexus Inbox",
};

export default function Page() {
  return <NewCampaignPage />;
}
