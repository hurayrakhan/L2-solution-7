import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all shrink-0 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Filled Brand Primary
        default:
          "bg-primary-500 border border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 shadow-sm disabled:bg-primary-200 disabled:border-primary-200 disabled:text-white",
        filled:
          "bg-primary-500 border border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 shadow-sm disabled:bg-primary-200 disabled:border-primary-200 disabled:text-white",
        primary:
          "bg-primary-500 border border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 shadow-sm disabled:bg-primary-200 disabled:border-primary-200 disabled:text-white",

        // Tonal
        tonal:
          "bg-primary-50 border border-transparent text-primary-600 hover:bg-primary-100 hover:text-primary-600 disabled:bg-slate-100 disabled:text-slate-400 dark:bg-primary-950/40 dark:text-primary-300 dark:hover:bg-primary-900/60",

        // Outline
        outline:
          "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",

        // Text / Ghost
        ghost:
          "bg-transparent border border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:bg-transparent disabled:text-slate-400 dark:text-slate-300 dark:hover:bg-slate-800",
        text:
          "bg-transparent border border-transparent text-primary hover:bg-primary-50 active:bg-primary-100 disabled:bg-transparent disabled:text-slate-400 dark:hover:bg-slate-800/60",

        // Destructive / Warning
        destructive:
          "bg-red-500 border border-red-500 text-white hover:bg-red-600 hover:border-red-600 focus-visible:ring-red-300 disabled:bg-red-200 dark:bg-red-600 dark:hover:bg-red-700",
        warning:
          "bg-amber-500 border border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600 focus-visible:ring-amber-300 disabled:bg-amber-200",

        // Secondary
        secondary:
          "bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700",

        // Premium Gradient
        premium:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-primary-600 text-white border-none shadow-md hover:brightness-105 active:scale-[0.98] disabled:opacity-50",

        // Link
        link:
          "text-primary underline-offset-4 hover:underline bg-transparent border-none p-0 h-auto font-medium",
      },
      size: {
        xs: "h-7 px-2 text-xs font-semibold gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 px-3.5 py-2 text-sm font-semibold gap-2",
        default: "h-10 px-4 py-2.5 text-sm font-semibold gap-2",
        md: "h-10 px-4 py-2.5 text-sm font-semibold gap-2",
        lg: "h-12 px-6 py-3 text-base font-bold gap-2",
        icon: "w-10 h-10 p-0 shrink-0",
        "icon-xs": "w-7 h-7 p-0 shrink-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "w-9 h-9 p-0 shrink-0",
        "icon-lg": "w-12 h-12 p-0 shrink-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      href,
      target,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = loading || disabled;

    const renderChildren = () => {
      if (asChild) return children;
      return (
        <>
          {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
          {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {loading ? loadingText || children : children}
          {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      );
    };

    if (href && !isDisabled) {
      return (
        <Link
          href={href}
          target={target}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {renderChildren()}
        </Link>
      );
    }

    const Comp = asChild ? Slot.Root : "button";

    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {renderChildren()}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
