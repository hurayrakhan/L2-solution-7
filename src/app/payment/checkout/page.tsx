"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Building,
  Truck,
  RotateCcw,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const type = searchParams.get("type") || "PROPERTY";
  const amount = parseInt(searchParams.get("amount") || "45000", 10);
  const id = searchParams.get("id") || "prop-1";
  const movingDate = searchParams.get("date") || "2026-04-01";

  const [paymentMethod, setPaymentMethod] = React.useState<"STRIPE" | "SSLCOMMERZ">("STRIPE");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayNow = async () => {
    setIsProcessing(true);
    toast.loading(`Connecting to ${paymentMethod} Test Gateway...`, { id: "payment" });

    // Simulate payment checkout gateway flow with live redirect
    await new Promise((r) => setTimeout(r, 1500));

    toast.success("Payment verified! Escrow deposit received.", { id: "payment" });
    const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}`;
    router.push(`/payment/success?method=${paymentMethod}&amount=${amount}&type=${type}&txnId=${transactionId}`);
  };

  return (
    <div className="container max-w-4xl py-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-foreground mb-6"
      >
        <ArrowLeft className="size-4" /> Go Back
      </button>

      <div className="text-center max-w-lg mx-auto mb-10">
        <Badge variant="fill-blue" className="mb-2">
          Secure Escrow Checkout
        </Badge>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Complete Your Reservation Deposit
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Your advance funds will be held in secured escrow and only released upon confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Payment method selector */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-base font-bold text-foreground mb-4">
              Select Payment Gateway (Test Mode)
            </h3>

            <div className="space-y-3">
              {/* Stripe */}
              <button
                type="button"
                onClick={() => setPaymentMethod("STRIPE")}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  paymentMethod === "STRIPE"
                    ? "border-primary-500 bg-primary-50/40 dark:bg-primary-950/40 ring-2 ring-primary-500/20"
                    : "border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      Stripe Payments
                    </div>
                    <div className="text-xs text-slate-500">
                      Visa, MasterCard, American Express, Apple Pay
                    </div>
                  </div>
                </div>
                {paymentMethod === "STRIPE" && (
                  <CheckCircle2 className="size-5 text-primary-500 shrink-0" />
                )}
              </button>

              {/* SSLCommerz */}
              <button
                type="button"
                onClick={() => setPaymentMethod("SSLCOMMERZ")}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  paymentMethod === "SSLCOMMERZ"
                    ? "border-primary-500 bg-primary-50/40 dark:bg-primary-950/40 ring-2 ring-primary-500/20"
                    : "border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-sm">
                    SSL
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      SSLCommerz Bangladesh
                    </div>
                    <div className="text-xs text-slate-500">
                      bKash, Nagad, Rocket, DBBL Nexus, Local Cards
                    </div>
                  </div>
                </div>
                {paymentMethod === "SSLCOMMERZ" && (
                  <CheckCircle2 className="size-5 text-primary-500 shrink-0" />
                )}
              </button>
            </div>
          </Card>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border flex items-start gap-3">
            <ShieldCheck className="size-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Escrow Protection Policy:</strong> Advance funds are not immediately disbursed to the provider. MoveInBD holds them in escrow. If the provider cancels or fails to deliver, a 100% refund is issued to your source method.
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary */}
        <div>
          <Card className="p-6 border-border shadow-lg">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Booking Summary
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-slate-500">
                <span>Reservation Type:</span>
                <span className="font-bold text-foreground">{type}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Date Scheduled:</span>
                <span className="font-bold text-foreground">{movingDate}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Platform Escrow Fee:</span>
                <span className="text-emerald-600 font-bold">৳0 (Free)</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm font-black text-foreground">
                <span>Total Amount:</span>
                <span className="text-primary-600 dark:text-primary-400">৳{amount.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePayNow}
              variant="default"
              fullWidth
              size="lg"
              loading={isProcessing}
              loadingText="Processing..."
              leftIcon={<Lock className="size-4" />}
            >
              Pay ৳{amount.toLocaleString()} via {paymentMethod}
            </Button>

            <button
              type="button"
              onClick={() => router.push("/payment/cancel")}
              className="w-full text-center text-xs text-slate-400 hover:text-red-500 mt-4 transition-colors"
            >
              Cancel Payment & Return
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="container py-12 text-center text-sm">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
