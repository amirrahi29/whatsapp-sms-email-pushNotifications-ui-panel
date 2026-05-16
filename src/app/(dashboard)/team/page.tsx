import type { Metadata } from "next";
import { TeamPage } from "@/components/team/team-page";

export const metadata: Metadata = {
  title: "Team · Nexus Inbox",
};

export default function Page() {
  return <TeamPage />;
}
