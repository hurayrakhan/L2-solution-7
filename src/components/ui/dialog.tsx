"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive, VisuallyHidden as VisuallyHiddenPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const VisuallyHidden = VisuallyHiddenPrimitive.Root;

const dialogContentVariants = cva(
  "fixed z-[200] bg-white dark:bg-slate-900 duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  {
    variants: {
      size: {
        sm: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[343px] sm:max-w-[420px] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-64px)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl py-6 px-4 sm:p-6 gap-6 flex flex-col overflow-y-auto",
        default: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[343px] sm:max-w-[600px] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-64px)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl py-6 px-4 sm:p-6 gap-6 flex flex-col overflow-y-auto",
        md: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[343px] sm:max-w-[600px] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-64px)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl py-6 px-4 sm:p-6 gap-6 flex flex-col overflow-y-auto",
        lg: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[343px] sm:max-w-2xl lg:max-w-3xl max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-64px)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl py-6 px-4 sm:p-6 gap-6 flex flex-col overflow-y-auto",
        full: "inset-0 top-0 left-0 w-screen h-screen max-w-none max-h-none rounded-none border-0 shadow-none p-6 flex flex-col overflow-y-auto m-0 gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean;
}

function DialogContent({
  className,
  children,
  size,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "w-full pt-3 mt-auto flex flex-row items-center justify-end gap-3 shrink-0",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-bold text-slate-900 dark:text-white", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
};
