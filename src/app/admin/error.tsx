"use client";

import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Admin portal error:", error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
        <div className="size-12 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="size-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          Admin Portal Error
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
          {error?.message || "An unexpected issue occurred while rendering the admin management view."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
