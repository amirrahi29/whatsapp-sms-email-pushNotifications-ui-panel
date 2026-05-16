import type { Metadata } from "next";
import { HomeOverview } from "@/components/dashboard/home-overview";

export const metadata: Metadata = {
  title: "Home",
  description: "Overview of Nexus Inbox — samajhne ke liye har section ek jagah.",
};

export default function HomePage() {
  return <HomeOverview />;
}
