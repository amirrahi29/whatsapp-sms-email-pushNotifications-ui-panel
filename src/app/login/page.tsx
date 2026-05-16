import type { Metadata } from "next";
import { MerchantLoginPage } from "@/components/auth/merchant-login-page";

export const metadata: Metadata = {
  title: "Merchant sign in",
  description: "Sign in to your Nexus Inbox merchant workspace.",
};

export default function LoginPage() {
  return <MerchantLoginPage />;
}
