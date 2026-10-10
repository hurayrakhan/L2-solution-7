"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TagSize = "1" | "2" | "3" | "4";

export type TagColor = "default" | "muted" | "primary" | "error";

export interface TagTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tag size token: 1 (16px), 2 (14px), 3 (12px), 4 (10px) */
  size: TagSize;
  /** HTML element to render. @default "span" */
  as?: "span" | "div" | "p" | "label";
  /** Semantic color token */
  color?: TagColor;
  /** Render text in uppercase. @default true */
  uppercase?: boolean;
  children: React.ReactNode;
}

const COLOR_MAP: Record<TagColor, string> = {
  default: "text-slate-800 dark:text-slate-200",
  muted: "text-slate-500 dark:text-slate-400",
  primary: "text-primary",
  error: "text-red-600 dark:text-red-400",
};

const TagText = React.forwardRef<HTMLSpanElement, TagTextProps>(
  (
    {
      size = "1",
      as: Tag = "span",
      color = "default",
      uppercase = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      `font-tag-${size}`,
      COLOR_MAP[color],
      uppercase && "uppercase",
      className
    );

    return React.createElement(
      Tag,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

TagText.displayName = "TagText";

export const TextTag = TagText;
export { TagText };
