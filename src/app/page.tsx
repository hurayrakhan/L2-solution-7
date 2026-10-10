"use client";

import Link from "next/link";
import {
  Home,
  Truck,
  Split,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-50 via-white to-background dark:from-slate-950 dark:via-slate-900 dark:to-background">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-primary-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="container relative z-10 flex flex-col items-center text-center">
            <Badge
              variant="tonal-blue"
              className="mb-6 px-4 py-1.5 text-xs font-bold gap-2 shadow-xs"
            >
              <Sparkles className="size-3.5 text-primary-500" />
              Bangladesh&apos;s #1 Housing & Shifting Platform
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1]">
              Find Your Dream Home &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600">
                Shift Seamlessly
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              MoveInBD unites verified rental properties, bachelor mess roommate
              finders, house-shifting pickup/truck bookings, and automatic bill splitting.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
              <Button
                href="/properties"
                variant="default"
                size="lg"
                leftIcon={<Search className="size-4" />}
                rightIcon={<ArrowRight className="size-4" />}
                className="w-full sm:w-auto"
              >
                Browse Properties
              </Button>

              <Button
                href="/vehicles"
                variant="outline"
                size="lg"
                leftIcon={<Truck className="size-4" />}
                className="w-full sm:w-auto"
              >
                Book Shifting Fleet
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pt-10 border-t border-border/80">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  5,000+
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Active Listings
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  1,200+
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Verified Fleets
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  99.8%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Safe Escrow Payments
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  4.9 / 5
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tenant Satisfaction
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-20 bg-slate-50/60 dark:bg-slate-900/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="tonal-green" className="mb-3">
                All-in-One Solution
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Everything You Need To Move In With Confidence
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                From finding a room in Dhanmondi to booking a pickup truck to Mirpur
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="p-8 hover:shadow-xl transition-all border-border relative group">
                <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Home className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Property & Roommate Matching
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Browse apartments, single rooms, sublets, and hostels. Filter by
                  city, area, budget, and amenities with real-time availability.
                </p>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform"
                >
                  Explore Listings <ArrowRight className="size-3.5" />
                </Link>
              </Card>

              {/* Feature 2 */}
              <Card className="p-8 hover:shadow-xl transition-all border-border relative group">
                <div className="size-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Truck className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  House-Shifting Logistics Fleet
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Need to transport your furniture? Book verified pickups, covered
                  vans, and trucks with transparent base fares and per-km pricing.
                </p>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform"
                >
                  Book Transport <ArrowRight className="size-3.5" />
                </Link>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 hover:shadow-xl transition-all border-border relative group">
                <div className="size-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                  <Split className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Automated Mess Utility Splitting
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  No more awkward disputes over electricity, gas, internet, or water
                  bills. Monthly bills split evenly among active tenants.
                </p>
                <Link
                  href="/utilities"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform"
                >
                  Manage Utilities <ArrowRight className="size-3.5" />
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Escrow & Security Banner */}
        <section className="py-16 bg-white dark:bg-slate-950 border-y border-border">
          <div className="container">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <Badge variant="tonal-blue" size="sm" className="bg-blue-900/60 text-blue-200 border-blue-700/60">
                  Escrow Protection
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  100% Secured Payments via Stripe & SSLCommerz
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your advance deposit is held in escrow until moving day is
                  confirmed. If something goes wrong, you get a full refund
                  guaranteed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Button
                  href="/register"
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  Join MoveInBD Today
                </Button>
                <Button
                  href="/pricing"
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-white border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:text-white"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
