"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ParagraphSize = "1" | "2" | "3";

export type ParagraphElement = "p" | "span" | "div" | "li" | "label";

export type ParagraphWeight = "regular" | "medium" | "semibold" | "bold";

export type ParagraphColor = "default" | "muted" | "primary" | "error" | "white" | "inherit";

export interface ParagraphTextProps extends React.HTMLAttributes<HTMLElement> {
  /** Paragraph size: 1 (16px), 2 (14px), 3 (12px) */
  size?: ParagraphSize;
  /** HTML element to render. @default "p" */
  as?: ParagraphElement;
  /** Font weight. @default "regular" */
  weight?: ParagraphWeight;
  /** Semantic text color */
  color?: ParagraphColor;
  /**
   * When true, applies paragraph spacing (margin bottom: 12px for 1, 4px for 2/3).
   * @default false
   */
  spacing?: boolean;
  children: React.ReactNode;
}

const COLOR_MAP: Record<ParagraphColor, string> = {
  default: "text-slate-800 dark:text-slate-200",
  muted: "text-slate-500 dark:text-slate-400",
  primary: "text-primary",
  error: "text-red-600 dark:text-red-400",
  white: "text-white",
  inherit: "text-inherit",
};

const WEIGHT_MAP: Record<ParagraphWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const SPACING_MAP: Record<ParagraphSize, string> = {
  "1": "mb-3", // 12px paragraph spacing
  "2": "mb-1", // 4px paragraph spacing
  "3": "mb-1", // 4px paragraph spacing
};

const ParagraphText = React.forwardRef<HTMLElement, ParagraphTextProps>(
  (
    {
      size = "1",
      as = "p",
      weight = "regular",
      color = "default",
      spacing = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      `font-paragraph-${size}`,
      COLOR_MAP[color],
      WEIGHT_MAP[weight],
      spacing && SPACING_MAP[size],
      className
    );

    return React.createElement(
      as,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

ParagraphText.displayName = "ParagraphText";

export const TextParagraph = ParagraphText;
export const Paragraph = ParagraphText;
export { ParagraphText };
