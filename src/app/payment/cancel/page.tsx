"use client";

import * as React from "react";
import Link from "next/link";
import { XCircle, RotateCcw, Home, ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container max-w-lg mx-auto text-center">
          <Card className="p-8 sm:p-10 border-border shadow-xl">
            <div className="size-16 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
              <XCircle className="size-8" />
            </div>

            <Badge variant="tonal-red" className="mb-2">
              Payment Cancelled
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Transaction Was Not Completed
            </h1>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              You cancelled or exited the payment checkout session. No charges were made to your account, and no escrow deposit was captured.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href="/properties"
                variant="default"
                leftIcon={<RotateCcw className="size-4" />}
                className="w-full sm:w-auto"
              >
                Browse Listings Again
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
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
