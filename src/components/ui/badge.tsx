import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { X } from "@/components/ui/icon";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold w-fit whitespace-nowrap shrink-0 transition-colors duration-150 select-none",
  {
    variants: {
      variant: {
        // Tonal Variants (Default: soft pastel background, rich dark text)
        "tonal-blue":
          "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60",
        "tonal-gray":
          "bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "tonal-green":
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
        "tonal-emerald":
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
        "tonal-red":
          "bg-red-50 text-red-700 border border-red-200/80 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/60",
        "tonal-orange":
          "bg-orange-50 text-orange-700 border border-orange-200/80 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60",
        "tonal-yellow":
          "bg-yellow-50 text-yellow-800 border border-yellow-200/80 dark:bg-yellow-950/60 dark:text-yellow-300 dark:border-yellow-800/60",
        "tonal-amber":
          "bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
        "tonal-purple":
          "bg-purple-50 text-purple-700 border border-purple-200/80 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60",

        // Fill Variants (Solid vibrant background, crisp white text)
        "fill-blue":
          "bg-primary-500 text-white border border-transparent dark:bg-primary-500 shadow-xs",
        "fill-gray":
          "bg-slate-700 text-white border border-transparent dark:bg-slate-700 shadow-xs",
        "fill-green":
          "bg-emerald-600 text-white border border-transparent dark:bg-emerald-600 shadow-xs",
        "fill-red":
          "bg-red-600 text-white border border-transparent dark:bg-red-600 shadow-xs",
        "fill-orange":
          "bg-orange-500 text-white border border-transparent dark:bg-orange-600 shadow-xs",
        "fill-yellow":
          "bg-yellow-500 text-slate-900 border border-transparent dark:bg-yellow-600 shadow-xs",
        "fill-purple":
          "bg-purple-600 text-white border border-transparent dark:bg-purple-600 shadow-xs",

        // Outline Variants (Transparent background, colored border & text)
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

        // Backward-compatible aliases
        default:
          "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300",
        primary:
          "bg-primary-500 text-white border border-transparent dark:bg-primary-500",
        tonal:
          "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300",
        secondary:
          "bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300",
        destructive:
          "bg-red-600 text-white border border-transparent dark:bg-red-600",
        outline:
          "bg-transparent border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300",
        ghost:
          "bg-transparent border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
        link:
          "text-primary underline-offset-4 hover:underline border-none p-0 h-auto",
        solid:
          "border border-transparent",
      },
      size: {
        // Extra Small: 16px height, 9px text, 6px padding
        xs: "h-4 px-1.5 text-[9px] font-bold tracking-tight gap-0.5 [&_svg:not([class*='size-'])]:size-2.5",
        // Small: 20px height, 12px text, 8px padding
        sm: "h-5 px-2 text-xs font-semibold gap-1 [&_svg:not([class*='size-'])]:size-3",
        // Medium / Default: 24px height, 12px text, 10px padding
        default:
          "h-6 px-2.5 text-xs font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-6 px-2.5 text-xs font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        // Large: 28px height, 14px text, 12px padding
        lg: "h-7 px-3 text-sm font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type BadgeColor =
  | "blue"
  | "gray"
  | "green"
  | "red"
  | "orange"
  | "yellow"
  | "purple";

type BadgeStyle = "tonal" | "fill" | "outline";

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  /** Status dot indicator */
  dot?: boolean;
  /** Optional custom dot color class */
  dotClassName?: string;
  /** Leading icon slot */
  leftIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  /** Trailing icon slot */
  rightIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Optional dismiss callback rendering a remove icon */
  onDismiss?: () => void;
  /** Color shortcut (e.g. color="blue") */
  color?: BadgeColor;
  /** Style shortcut (e.g. badgeStyle="tonal") */
  badgeStyle?: BadgeStyle;
}

function Badge({
  className,
  variant,
  size = "default",
  color,
  badgeStyle = "tonal",
  dot = false,
  dotClassName,
  leftIcon,
  leadingIcon,
  rightIcon,
  trailingIcon,
  onDismiss,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  // Resolve variant from color + badgeStyle if color is provided
  const resolvedVariant = color
    ? (`${badgeStyle}-${color}` as NonNullable<VariantProps<typeof badgeVariants>["variant"]>)
    : (variant ?? "default");

  const leading = leadingIcon ?? leftIcon;
  const trailing = trailingIcon ?? rightIcon;

  return (
    <Comp
      data-slot="badge"
      data-variant={resolvedVariant}
      data-size={size}
      className={cn(badgeVariants({ variant: resolvedVariant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          data-slot="badge-dot"
          className={cn("size-1.5 rounded-full bg-current shrink-0", dotClassName)}
          aria-hidden="true"
        />
      )}
      {leading && <span className="inline-flex shrink-0">{leading}</span>}
      {children}
      {trailing && <span className="inline-flex shrink-0">{trailing}</span>}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="ml-0.5 -mr-1 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Remove"
        >
          <X className="size-3" />
        </button>
      )}
    </Comp>
  );
}

export { Badge, badgeVariants };
