import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users,
  Building2,
  Truck,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us — MoveInBD",
  description:
    "Learn about MoveInBD's mission to transform housing, roommate matching, and house-shifting logistics in Bangladesh.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Listings in BD", value: "5,000+" },
    { label: "Verified Moving Fleets", value: "1,200+" },
    { label: "Happy Tenants & Roommates", value: "35,000+" },
    { label: "Escrow Protected BDT", value: "৳2.5Cr+" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "100% Verified Listings",
      description:
        "Every property and vehicle provider goes through National ID and ownership verification to prevent rental fraud.",
    },
    {
      icon: HeartHandshake,
      title: "Fair Escrow Payments",
      description:
        "Your advance security deposit stays held safely in escrow until you inspect and officially receive keys or shifting service.",
    },
    {
      icon: Building2,
      title: "Bachelor & Family Friendly",
      description:
        "Finding bachelor rentals in Dhaka used to be stressful. We provide equal, transparent housing opportunities for students and professionals.",
    },
    {
      icon: Truck,
      title: "Fixed-Fare Moving Fleets",
      description:
        "Say goodbye to last-minute driver bargaining. Get guaranteed rates for pickups and trucks with real-time GPS tracking.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-b border-border">
          <div className="container flex flex-col items-center text-center">
            <Badge variant="tonal-blue" className="mb-4">
              <Sparkles className="size-3.5 mr-1" />
              Our Story & Purpose
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight max-w-3xl">
              Revolutionizing How Bangladesh Lives & Moves
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              MoveInBD was born out of personal frustration with the chaotic
              Dhaka rental market, deceptive to-let boards, messy utility bill
              splitting, and unregulated shifting truck prices.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 bg-white dark:bg-slate-900 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center max-w-xl mx-auto mb-16">
              <Badge variant="tonal-green" className="mb-3">
                Core Principles
              </Badge>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                Built On Trust, Transparency & Safety
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                How we deliver peace of mind to both renters and property owners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Card key={i} className="p-6 border-border hover:shadow-lg transition-all">
                    <CardContent className="p-0 flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 shrink-0">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">
                          {v.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {v.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container text-center max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to find your next home or book transport?
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Join thousands of tenants and verified fleet owners across Dhaka, Chittagong, and Sylhet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button href="/properties" variant="default" rightIcon={<ArrowRight className="size-4" />}>
                Browse Properties
              </Button>
              <Button href="/register" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Register as Provider
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
