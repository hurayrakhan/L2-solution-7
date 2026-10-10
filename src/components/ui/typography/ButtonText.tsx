"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonTextSize = "1" | "2" | "label-1" | "label-2";

export interface ButtonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Button text size token */
  size?: ButtonTextSize;
  /** HTML element to render. @default "span" */
  as?: "span" | "div" | "p";
  children: React.ReactNode;
}

const CLASS_MAP: Record<ButtonTextSize, string> = {
  "1": "font-btn-1",
  "2": "font-btn-2",
  "label-1": "font-btn-label-1",
  "label-2": "font-btn-label-2",
};

const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  (
    {
      size = "2",
      as: Tag = "span",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(CLASS_MAP[size], className);

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

ButtonText.displayName = "ButtonText";

export const TextButton = ButtonText;
export { ButtonText };
