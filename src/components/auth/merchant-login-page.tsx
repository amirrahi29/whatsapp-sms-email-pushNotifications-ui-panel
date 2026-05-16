"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";

export function MerchantLoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 500);
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background lg:flex-row">
      <div className="relative hidden flex-1 flex-col justify-between border-b border-border bg-sidebar p-8 text-sidebar-foreground lg:flex lg:max-w-[42%] lg:border-b-0 lg:border-r xl:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 20%, white 0, transparent 42%), radial-gradient(circle at 75% 80%, var(--color-primary) 0, transparent 38%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md">
              WA
            </div>
            <span className="text-lg font-semibold tracking-tight">Nexus Reach</span>
          </div>
          <h1 className="mt-10 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-white xl:text-3xl">
            Omnichannel inbox — WhatsApp, SMS, Email, Push
          </h1>
          <p className="mt-3 max-w-sm text-sm text-sidebar-foreground/70">
            Demo console: sign in ke baad Home par har section ka map milega.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-sidebar-foreground/80">
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 shrink-0 text-primary" />
              Shared inbox — sab chats ek number par
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              Roles, notes & secure handoff
            </li>
          </ul>
        </div>
        <p className="relative text-xs text-sidebar-foreground/45">
          © {new Date().getFullYear()} Nexus Inbox
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[400px] flex-col">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              WA
            </div>
            <span className="font-semibold">Nexus Inbox</span>
          </div>

          <FadeIn variant="scale" className="app-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Demo — koi bhi email/password likh kar andar jao.
            </p>

            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-3 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Try karne ke liye</p>
              <p className="mt-1">
                Email: <span className="font-mono text-foreground">demo@nexus.io</span>
              </p>
              <p>
                Password: <span className="font-mono text-foreground">kuch bhi</span> (required field)
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none ring-ring/40 focus:border-primary/50 focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-11 text-sm outline-none ring-ring/40 focus:border-primary/50 focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border text-primary"
                  defaultChecked
                />
                Remember device
              </label>

              <button
                type="submit"
                disabled={loading}
                className={cn("app-btn-primary h-11 w-full", loading && "pointer-events-none opacity-70")}
              >
                {loading ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              <button type="button" className="font-medium text-primary hover:underline">
                Create workspace
              </button>
            </p>
          </FadeIn>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link href="/home" className="hover:text-foreground hover:underline">
              Continue without sign-in → Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
