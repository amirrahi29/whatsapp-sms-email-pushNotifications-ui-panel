import type { Metadata } from "next";
import { CampaignHub } from "@/components/campaigns/campaign-hub";

export const metadata: Metadata = {
  title: "Broadcasts & campaigns",
};

export default function Page() {
  return <CampaignHub />;
}
