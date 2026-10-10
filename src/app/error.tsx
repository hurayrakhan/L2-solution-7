"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg text-center bg-card rounded-3xl p-8 sm:p-12 shadow-xl border border-border">
        <div className="size-16 bg-red-50 dark:bg-red-950/40 rounded-2xl flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
          <AlertTriangle className="size-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          Something went wrong!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          {error.message ||
            "An unexpected error occurred while loading this page. Our team has been notified."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
            leftIcon={<RotateCcw className="size-4" />}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          <Button
            href="/"
            variant="outline"
            leftIcon={<Home className="size-4" />}
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
