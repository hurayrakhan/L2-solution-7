"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableProps extends React.ComponentProps<"table"> {
  containerClassName?: string;
}

function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm",
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm border-collapse", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-slate-50 dark:bg-slate-800/60 border-b border-border [&_tr]:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "divide-y divide-border [&_tr:last-child]:border-0",
        className
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-slate-50 dark:bg-slate-800/60 border-t border-border font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "h-14 border-b border-border last:border-b-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 data-[state=selected]:bg-slate-100 transition-colors",
        className
      )}
      {...props}
    />
  );
}

interface TableHeadProps extends Omit<React.ComponentProps<"th">, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

function TableHead({ className, icon, title, children, ...props }: TableHeadProps) {
  const content = title ?? children;

  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-6 py-3 text-left align-middle font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="flex items-center gap-1.5">
          <span className="shrink-0 opacity-60 [&_svg]:size-3.5 [&_svg]:shrink-0" aria-hidden="true">
            {icon}
          </span>
          {content && <span>{content}</span>}
        </div>
      ) : (
        content
      )}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-14 px-6 py-3 align-middle text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-slate-400 mt-4 text-xs", className)}
      {...props}
    />
  );
}

const TableActionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }
>(({ className, children, icon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="table-action-trigger"
      className={cn(
        "size-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children || icon || <MoreHorizontal className="size-4 shrink-0" />}
    </button>
  );
});
TableActionTrigger.displayName = "TableActionTrigger";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableActionTrigger,
};
export type { TableProps, TableHeadProps };
