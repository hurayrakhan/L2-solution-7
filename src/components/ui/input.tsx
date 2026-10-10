import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex items-center gap-2 rounded-lg border transition-all outline-none font-normal selection:bg-primary-500 selection:text-white box-border",
  {
    variants: {
      inputSize: {
        default: "h-11 px-3",
        lg: "h-12 px-3.5",
        md: "h-10 px-3",
        sm: "h-9 px-2.5",
      },
      variant: {
        default: [
          "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100",
          "hover:border-slate-400 dark:hover:border-slate-600",
          "focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20",
          "has-[:disabled]:bg-slate-50 dark:has-[:disabled]:bg-slate-900 has-[:disabled]:border-slate-200 dark:has-[:disabled]:border-slate-800 has-[:disabled]:text-slate-400 has-[:disabled]:cursor-not-allowed",
          "has-[[aria-invalid=true]]:border-red-500 dark:has-[[aria-invalid=true]]:border-red-500 has-[[aria-invalid=true]]:focus-within:border-red-500 has-[[aria-invalid=true]]:focus-within:ring-red-500/20",
        ],
        error: [
          "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100",
          "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20",
        ],
      },
      fullWidth: {
        true: "w-full self-stretch",
        false: "w-auto",
      },
    },
    defaultVariants: {
      inputSize: "default",
      variant: "default",
      fullWidth: true,
    },
  }
);

export type InputSizeVariant = "sm" | "md" | "lg" | "default";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  inputSize?: InputSizeVariant;
  size?: InputSizeVariant | (string & {});
  fullWidth?: boolean;
  label?: React.ReactNode;
  isRequired?: boolean;
  leadingIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  isError?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize,
      size,
      variant,
      fullWidth = true,
      label,
      isRequired,
      leadingIcon,
      leftIcon,
      trailingIcon,
      rightIcon,
      error,
      helperText,
      isError,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || (label ? generatedId : undefined);

    const leading = leadingIcon ?? leftIcon;
    const trailing = trailingIcon ?? rightIcon;

    const validSizes: InputSizeVariant[] = ["sm", "md", "lg", "default"];
    const resolvedSize = (inputSize ?? (typeof size === "string" && validSizes.includes(size as InputSizeVariant) ? size : "default")) as InputSizeVariant;
    const hasError = Boolean(isError || error);
    const resolvedVariant = hasError ? "error" : (variant ?? "default");

    const hasLeading = Boolean(leading);
    const hasTrailing = Boolean(trailing);
    const hasWrapper = Boolean(label || error || helperText);

    const fieldContainer = (
      <div
        className={cn(
          inputVariants({ inputSize: resolvedSize, variant: resolvedVariant, fullWidth }),
          !hasWrapper && containerClassName
        )}
      >
        {hasLeading && (
          <div className="text-slate-400 dark:text-slate-400 flex items-center justify-center shrink-0 [&_svg]:size-4 select-none">
            {leading}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          id={inputId}
          data-slot="input"
          aria-invalid={hasError ? "true" : props["aria-invalid"]}
          className={cn(
            "w-full flex-1 min-w-0 bg-transparent border-0 outline-none p-0 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:pointer-events-none disabled:cursor-not-allowed selection:bg-primary-500 selection:text-white",
            className
          )}
          {...props}
        />

        {hasTrailing && (
          <div className="text-slate-400 dark:text-slate-400 flex items-center justify-center shrink-0 [&_svg]:size-4 select-none">
            {trailing}
          </div>
        )}
      </div>
    );

    if (!hasWrapper) {
      return fieldContainer;
    }

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 select-none"
          >
            <span>{label}</span>
            {isRequired && <span className="text-red-500 leading-none">*</span>}
          </label>
        )}

        {fieldContainer}

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
