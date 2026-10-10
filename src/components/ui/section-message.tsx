"use client";

import * as React from "react";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type SectionMessageAppearance =
  | "information"
  | "success"
  | "warning"
  | "error"
  | "discovery";

export interface SectionMessageActionProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function SectionMessageAction({
  href,
  onClick,
  children,
  className,
}: SectionMessageActionProps) {
  const commonClasses = cn(
    "text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(commonClasses, "bg-transparent border-none p-0 inline-flex items-center")}
    >
      {children}
    </button>
  );
}

export interface SectionMessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  appearance?: SectionMessageAppearance;
  title?: React.ReactNode;
  isDismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const APPEARANCE_CONFIG: Record<
  SectionMessageAppearance,
  {
    container: string;
    iconColor: string;
    titleColor: string;
    bodyColor: string;
    defaultIcon: React.ReactNode;
  }
> = {
  information: {
    container:
      "bg-blue-50/90 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-900/50 text-blue-950 dark:text-blue-100",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-950 dark:text-blue-100",
    bodyColor: "text-blue-900/85 dark:text-blue-200/85",
    defaultIcon: <Info className="size-5 shrink-0" />,
  },
  success: {
    container:
      "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-100",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    titleColor: "text-emerald-950 dark:text-emerald-100",
    bodyColor: "text-emerald-900/85 dark:text-emerald-200/85",
    defaultIcon: <CheckCircle2 className="size-5 shrink-0" />,
  },
  warning: {
    container:
      "bg-amber-50/90 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-900/50 text-amber-950 dark:text-amber-100",
    iconColor: "text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-950 dark:text-amber-100",
    bodyColor: "text-amber-900/85 dark:text-amber-200/85",
    defaultIcon: <AlertTriangle className="size-5 shrink-0" />,
  },
  error: {
    container:
      "bg-red-50/90 dark:bg-red-950/40 border-red-200/80 dark:border-red-900/50 text-red-950 dark:text-red-100",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-950 dark:text-red-100",
    bodyColor: "text-red-900/85 dark:text-red-200/85",
    defaultIcon: <AlertCircle className="size-5 shrink-0" />,
  },
  discovery: {
    container:
      "bg-purple-50/90 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-900/50 text-purple-950 dark:text-purple-100",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleColor: "text-purple-950 dark:text-purple-100",
    bodyColor: "text-purple-900/85 dark:text-purple-200/85",
    defaultIcon: <Sparkles className="size-5 shrink-0" />,
  },
};

export function SectionMessage({
  appearance = "information",
  title,
  isDismissible,
  onDismiss,
  actions,
  icon,
  children,
  className,
  ...props
}: SectionMessageProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const config = APPEARANCE_CONFIG[appearance];

  return (
    <div
      role="alert"
      data-slot="section-message"
      data-appearance={appearance}
      className={cn(
        "relative flex w-full gap-3.5 rounded-xl border p-4 transition-all shadow-xs",
        config.container,
        className
      )}
      {...props}
    >
      <div className={cn("shrink-0 mt-0.5", config.iconColor)}>
        {icon || config.defaultIcon}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {title && (
          <h5 className={cn("text-sm font-bold leading-snug", config.titleColor)}>
            {title}
          </h5>
        )}
        {children && (
          <div className={cn("text-xs leading-relaxed font-normal", config.bodyColor)}>
            {children}
          </div>
        )}
        {actions && <div className="mt-2 flex items-center gap-3">{actions}</div>}
      </div>

      {isDismissible && (
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          className="shrink-0 p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-md transition-colors"
          aria-label="Dismiss message"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
