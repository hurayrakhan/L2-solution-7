"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type HeadingLevel =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type NormalizedHeadingLevel = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export type HeadingColor = "default" | "primary" | "muted" | "error" | "white" | "inherit";

export type HeadingWeight = "bold" | "semibold" | "medium" | "regular";

export interface HeadingTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading size scale from 1 (64px) to 9 (14px) */
  size?: HeadingLevel;
  level?: HeadingLevel;
  /** HTML element to render. If omitted, derives automatically from level (e.g. 1/2 -> h1, 3 -> h2) */
  as?: HeadingElement;
  /**
   * When true, auto-steps down 2 scale levels on mobile (< 768px).
   * @default true
   */
  responsive?: boolean;
  /** Semantic color token */
  color?: HeadingColor;
  /** Font weight override. Defaults to bold (700) per design system */
  weight?: HeadingWeight;
  /** Render in uppercase */
  uppercase?: boolean;
  /** Tracking (letter-spacing) */
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  children: React.ReactNode;
}

const NORMALIZE_MAP: Record<string, NormalizedHeadingLevel> = {
  "1": "1", h1: "1",
  "2": "2", h2: "2",
  "3": "3", h3: "3",
  "4": "4", h4: "4",
  "5": "5", h5: "5",
  "6": "6", h6: "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

const DEFAULT_ELEMENT_MAP: Record<NormalizedHeadingLevel, HeadingElement> = {
  "1": "h1",
  "2": "h1",
  "3": "h2",
  "4": "h3",
  "5": "h4",
  "6": "h5",
  "7": "h6",
  "8": "h6",
  "9": "h6",
};

const MOBILE_STEP_DOWN: Record<NormalizedHeadingLevel, NormalizedHeadingLevel> = {
  "1": "3",
  "2": "4",
  "3": "5",
  "4": "6",
  "5": "7",
  "6": "8",
  "7": "9",
  "8": "9",
  "9": "9",
};

const COLOR_MAP: Record<HeadingColor, string> = {
  default: "text-slate-900 dark:text-slate-100",
  primary: "text-primary",
  muted: "text-slate-500 dark:text-slate-400",
  error: "text-red-600 dark:text-red-400",
  white: "text-white",
  inherit: "text-inherit",
};

const WEIGHT_MAP: Record<HeadingWeight, string> = {
  bold: "font-bold",
  semibold: "font-semibold",
  medium: "font-medium",
  regular: "font-normal",
};

const TRACKING_MAP: Record<string, string> = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

const HeadingText = React.forwardRef<HTMLHeadingElement, HeadingTextProps>(
  (
    {
      size,
      level = "3",
      as,
      responsive = true,
      color = "default",
      weight = "bold",
      uppercase = false,
      tracking,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const rawLevel = size ?? level;
    const normalizedLevel: NormalizedHeadingLevel = NORMALIZE_MAP[String(rawLevel)] || "3";
    const Component = as || DEFAULT_ELEMENT_MAP[normalizedLevel];
    const mobileLevel = MOBILE_STEP_DOWN[normalizedLevel];

    const classes = cn(
      responsive
        ? `font-heading-${mobileLevel} md:font-heading-${normalizedLevel}`
        : `font-heading-${normalizedLevel}`,
      COLOR_MAP[color],
      WEIGHT_MAP[weight],
      uppercase && "uppercase",
      tracking && TRACKING_MAP[tracking],
      className
    );

    return React.createElement(
      Component,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

HeadingText.displayName = "HeadingText";

export const TextHeading = HeadingText;
export const Heading = HeadingText;
export { HeadingText };
