"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** ms */
  delay?: number;
  variant?: "up" | "in" | "scale";
};

export function FadeIn({
  children,
  className,
  delay = 0,
  variant = "up",
}: FadeInProps) {
  const anim =
    variant === "in"
      ? "animate-fade-in"
      : variant === "scale"
        ? "animate-scale-in"
        : "animate-fade-in-up";

  return (
    <div
      className={cn(anim, "opacity-0", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}

type PageEnterProps = {
  children: ReactNode;
  className?: string;
  /** Skip motion for full-bleed layouts (inbox). */
  subtle?: boolean;
};

/** Re-mount with `key={pathname}` on parent for route transitions. */
export function PageEnter({ children, className, subtle }: PageEnterProps) {
  return (
    <div
      className={cn(
        subtle ? "animate-fade-in opacity-0" : "animate-page-enter opacity-0",
        className
      )}
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Base delay between siblings (ms). */
  step?: number;
};

export function Stagger({ children, className, step = 55 }: StaggerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="animate-fade-in-up opacity-0"
          style={{
            animationDelay: `${i * step}ms`,
            animationFillMode: "forwards",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
