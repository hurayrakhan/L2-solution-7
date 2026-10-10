import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold w-fit whitespace-nowrap shrink-0 transition-colors duration-150 select-none",
  {
    variants: {
      variant: {
        // Tonal Variants
        "tonal-blue":
          "bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40",
        "tonal-gray":
          "bg-slate-100 text-slate-700 border border-slate-200/60 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "tonal-green":
          "bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
        "tonal-red":
          "bg-red-50 text-red-700 border border-red-200/60 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40",
        "tonal-orange":
          "bg-orange-50 text-orange-700 border border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/40",
        "tonal-yellow":
          "bg-yellow-50 text-yellow-800 border border-yellow-200/60 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800/40",
        "tonal-purple":
          "bg-purple-50 text-purple-700 border border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40",

        // Fill Variants
        "fill-blue":
          "bg-blue-600 text-white border border-transparent dark:bg-blue-500",
        "fill-gray":
          "bg-slate-600 text-white border border-transparent dark:bg-slate-700",
        "fill-green":
          "bg-emerald-600 text-white border border-transparent dark:bg-emerald-500",
        "fill-red":
          "bg-red-600 text-white border border-transparent dark:bg-red-500",
        "fill-orange":
          "bg-orange-600 text-white border border-transparent dark:bg-orange-500",
        "fill-yellow":
          "bg-yellow-500 text-slate-900 border border-transparent",
        "fill-purple":
          "bg-purple-600 text-white border border-transparent dark:bg-purple-500",

        // Outline Variants
        "outline-blue":
          "bg-transparent text-blue-700 border border-blue-300 dark:text-blue-400 dark:border-blue-800",
        "outline-gray":
          "bg-transparent text-slate-700 border border-slate-300 dark:text-slate-300 dark:border-slate-700",
        "outline-green":
          "bg-transparent text-emerald-700 border border-emerald-300 dark:text-emerald-400 dark:border-emerald-800",
        "outline-red":
          "bg-transparent text-red-700 border border-red-300 dark:text-red-400 dark:border-red-800",
        "outline-orange":
          "bg-transparent text-orange-700 border border-orange-300 dark:text-orange-400 dark:border-orange-800",
        "outline-yellow":
          "bg-transparent text-yellow-800 border border-yellow-300 dark:text-yellow-400 dark:border-yellow-800",
        "outline-purple":
          "bg-transparent text-purple-700 border border-purple-300 dark:text-purple-400 dark:border-purple-800",
      },
      size: {
        xs: "h-5 px-2 text-[10px] gap-1 [&_svg]:size-2.5",
        sm: "h-6 px-2.5 text-xs gap-1.5 [&_svg]:size-3",
        default: "h-7 px-3 text-xs gap-1.5 [&_svg]:size-3.5",
        md: "h-7 px-3 text-xs gap-1.5 [&_svg]:size-3.5",
        lg: "h-8 px-3.5 text-sm gap-2 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "tonal-blue",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  dot,
  dotColor,
  icon,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full shrink-0",
            dotColor || "bg-current"
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-75 focus:outline-none shrink-0"
        >
          <X className="size-3" />
        </button>
      )}
    </Comp>
  );
}

export { Badge, badgeVariants };
