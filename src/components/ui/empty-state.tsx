import * as React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border rounded-2xl bg-slate-50/50 dark:bg-slate-900/40",
        className
      )}
      {...props}
    >
      <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 border border-border shadow-xs flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
        {icon || <Inbox className="size-7" />}
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {description}
        </p>
      )}
      {(actionLabel && (onAction || actionHref)) && (
        <div className="mt-5">
          <Button
            size="sm"
            onClick={onAction}
            href={actionHref}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
