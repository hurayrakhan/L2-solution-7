"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, LayoutDashboard, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function SuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method") || "STRIPE";
  const amount = searchParams.get("amount") || "45000";
  const type = searchParams.get("type") || "PROPERTY";
  const txnId = searchParams.get("txnId") || "TXN-984210AF";

  const [copied, setCopied] = React.useState(false);

  const copyTxn = () => {
    navigator.clipboard.writeText(txnId);
    setCopied(true);
    toast.success("Transaction ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-lg py-16 text-center">
      <Card className="p-8 sm:p-10 border-border shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="size-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="size-8" />
        </div>

        <Badge variant="tonal-green" className="mb-2">
          Payment Successful (Test Mode)
        </Badge>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Deposit Confirmed & Held in Escrow!
        </h1>

        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Your payment of <strong>৳{parseInt(amount).toLocaleString()}</strong> was processed via {method}. Your funds are held securely until service confirmation.
        </p>

        {/* Details box */}
        <div className="my-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-border text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <button
              type="button"
              onClick={copyTxn}
              className="font-mono font-bold text-foreground flex items-center gap-1 hover:text-primary-600"
            >
              <span>{txnId}</span>
              {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3 text-slate-400" />}
            </button>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service Category:</span>
            <span className="font-bold text-foreground">{type} RESERVATION</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Escrow Status:</span>
            <Badge variant="tonal-blue" className="text-[10px] py-0 px-2">
              <ShieldCheck className="size-3 mr-1" /> HELD IN ESCROW
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href="/dashboard"
            variant="default"
            leftIcon={<LayoutDashboard className="size-4" />}
            className="w-full sm:w-auto"
          >
            Go to My Activity
          </Button>
          <Button
            href="/"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="container py-12 text-center text-sm">Verifying transaction...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
