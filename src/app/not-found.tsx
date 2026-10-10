import Link from "next/link";
import { FileSearch, ArrowRight, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-gradient-to-tr from-primary-500/10 via-primary-500/5 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg text-center bg-card rounded-3xl p-8 sm:p-12 shadow-xl border border-border">
        <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-primary-500">
          <FileSearch className="size-8" />
        </div>

        <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 select-none">
          404
        </h1>
        <h2 className="text-2xl font-bold text-foreground mt-2 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Button
            href="/"
            variant="default"
            leftIcon={<Home className="size-4" />}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            href="/dashboard"
            variant="outline"
            leftIcon={<LayoutDashboard className="size-4" />}
            rightIcon={<ArrowRight className="size-4" />}
            className="w-full sm:w-auto"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
