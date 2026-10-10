"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export type LinkSize = "1" | "2";

export interface LinkTextProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link size token: 1 (16px) or 2 (14px) */
  size?: LinkSize;
  /** When true, renders child element (e.g. Next.js Link) directly */
  asChild?: boolean;
  /** Underline style: hover (default) or always */
  underline?: "hover" | "always" | "none";
  /** Semantic color token */
  color?: "primary" | "muted" | "default";
  children: React.ReactNode;
}

const LinkText = React.forwardRef<HTMLAnchorElement, LinkTextProps>(
  (
    {
      size = "1",
      asChild = false,
      underline = "hover",
      color = "primary",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Root : "a";
    const normalizedSize = size === "2" ? "2" : "1";

    const colorClasses = {
      primary: "text-primary hover:text-primary-hover",
      muted: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
      default: "text-slate-900 hover:text-primary dark:text-slate-100",
    }[color];

    const underlineClasses = {
      hover: "hover:underline underline-offset-4",
      always: "underline underline-offset-4",
      none: "no-underline",
    }[underline];

    const classes = cn(
      `font-link-${normalizedSize}`,
      "inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer",
      colorClasses,
      underlineClasses,
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

LinkText.displayName = "LinkText";

export const TextLink = LinkText;
export { LinkText };
