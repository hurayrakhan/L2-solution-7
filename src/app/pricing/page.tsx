import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Pricing & Plans — MoveInBD",
  description:
    "Transparent pricing for tenants, property landlords, and transport fleet providers in Bangladesh.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Tenant / Renter",
      price: "Free",
      period: "Forever",
      description: "For individuals & students searching for rooms, flats, and shifting trucks.",
      popular: false,
      features: [
        "Unlimited property & room searches",
        "Direct verified owner contact",
        "Mess utility bill splitting calculator",
        "Escrow-protected advance deposits",
        "Standard customer support",
      ],
      cta: "Get Started Free",
      href: "/register",
      variant: "outline" as const,
    },
    {
      name: "Property Landlord",
      price: "৳999",
      period: "per month",
      description: "For apartment owners, hostel managers, and flat subletters.",
      popular: true,
      features: [
        "List up to 10 rental properties",
        "Verified Owner Trust Badge",
        "Priority placement in search results",
        "Automated tenant mess billing suite",
        "Background check & NID verification tools",
        "24/7 dedicated account manager",
      ],
      cta: "List Properties",
      href: "/register",
      variant: "default" as const,
    },
    {
      name: "Transport / Fleet Owner",
      price: "৳1,499",
      period: "per month",
      description: "For pickup truck and moving van drivers or logistics agencies.",
      popular: false,
      features: [
        "List unlimited moving vehicles",
        "Guaranteed house-shifting booking leads",
        "Real-time customer dispatch system",
        "Automatic fare calculation & GPS routing",
        "Direct payouts to Bank / bKash",
        "Transit damage insurance support",
      ],
      cta: "Register Fleet",
      href: "/register",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-b border-border">
          <div className="container text-center max-w-3xl mx-auto">
            <Badge variant="tonal-blue" className="mb-3">
              Simple & Transparent
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Fair Pricing for Every Role
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Tenants browse for free. Providers only pay when listing high-volume properties or vehicles.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((p, i) => (
                <Card
                  key={i}
                  className={`flex flex-col justify-between p-6 sm:p-8 transition-all ${
                    p.popular
                      ? "border-primary-500 shadow-xl ring-2 ring-primary-500/20 relative"
                      : "border-border hover:shadow-lg"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge variant="fill-blue" className="px-3 py-1 text-xs">
                        <Sparkles className="size-3 mr-1" /> Most Popular
                      </Badge>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                      {p.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-foreground">
                        {p.price}
                      </span>
                      <span className="text-xs text-slate-500">
                        {p.period && `/ ${p.period}`}
                      </span>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border mb-8">
                      {p.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button href={p.href} variant={p.variant} fullWidth size="lg">
                    {p.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
