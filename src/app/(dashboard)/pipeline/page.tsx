import type { Metadata } from "next";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";

export const metadata: Metadata = {
  title: "Pipeline · Nexus Inbox",
};

export default function Page() {
  return <PipelineBoard />;
}
