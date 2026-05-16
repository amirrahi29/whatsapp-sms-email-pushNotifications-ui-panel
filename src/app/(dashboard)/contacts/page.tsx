import type { Metadata } from "next";
import { ContactsPage } from "@/components/contacts/contacts-page";

export const metadata: Metadata = {
  title: "Contacts · Nexus Inbox",
};

export default function Page() {
  return <ContactsPage />;
}
