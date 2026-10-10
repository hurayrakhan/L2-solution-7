import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  Truck,
  Split,
  ShieldCheck,
  Check,
  ArrowRight,
  CreditCard,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Our Services — MoveInBD",
  description:
    "Comprehensive housing rentals, roommate matchmaking, house shifting fleet bookings, and mess utility bill management.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Property & Room Rentals",
      badge: "Housing",
      icon: Building,
      description:
        "Verified residential apartments, sublets, bachelor seats, and family homes with virtual walkthroughs, detailed floor plans, and verified owner credentials.",
      features: [
        "Filter by area, budget, bedrooms & furnished status",
        "Direct chat & visit request scheduling",
        "No hidden middleman broker commissions",
        "Digital tenancy agreement templates",
      ],
      href: "/properties",
      cta: "Explore Listings",
    },
    {
      title: "House-Shifting Logistics Fleet",
      badge: "Logistics",
      icon: Truck,
      description:
        "On-demand pickup trucks, covered vans, and specialized moving labor for hassle-free home and office relocation across Bangladesh.",
      features: [
        "Transparent base fare plus per-kilometer rates",
        "Options for small pickups, 1-ton, 3-ton & 5-ton vans",
        "Professional packaging and furniture handling add-ons",
        "Real-time driver location and concurrency-safe bookings",
      ],
      href: "/vehicles",
      cta: "Book Transport",
    },
    {
      title: "Automated Mess Utility Splitting",
      badge: "Mess Management",
      icon: Split,
      description:
        "Fair, dispute-free utility bill calculations for bachelor flats and shared messes. Add monthly bills and split automatically among active roommates.",
      features: [
        "Gas, electricity, Wi-Fi, water, and maid bill pooling",
        "Individual tenant payment status tracking",
        "One-click bKash, Nagad, or card settlement",
        "Exportable PDF expense summaries for house managers",
      ],
      href: "/utilities",
      cta: "Manage Utilities",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-b border-border">
          <div className="container text-center max-w-3xl mx-auto">
            <Badge variant="tonal-blue" className="mb-3">
              Core Platform Services
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              One Unified Ecosystem for Living & Shifting
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              MoveInBD eliminates the hassles of traditional renting with end-to-end digital solutions.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Card key={i} className="flex flex-col justify-between p-6 border-border hover:shadow-xl transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="size-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                          <Icon className="size-6" />
                        </div>
                        <Badge variant="tonal-gray">{service.badge}</Badge>
                      </div>

                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed mb-6">
                        {service.description}
                      </CardDescription>

                      <div className="space-y-2.5 mb-8">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button href={service.href} variant="default" fullWidth rightIcon={<ArrowRight className="size-4" />}>
                      {service.cta}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
