"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  Truck,
  Split,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plus,
  RefreshCw,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { fetcher } from "@/lib/fetcher";

interface LiveBooking {
  id: string;
  bookingType: string;
  status: string;
  shiftingDate?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  totalAmount: number;
  escrowStatus: string;
  vehicle?: {
    title: string;
    vehicleType: string;
    driverName?: string;
  };
  property?: {
    title: string;
    address: string;
  };
}

export default function TenantDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = React.useState<LiveBooking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadMyBookings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetcher<LiveBooking[]>("/bookings/my-bookings");
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.warn("My bookings fetch error:", err);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadMyBookings();
  }, [loadMyBookings]);

  const activeRentalsCount = bookings.filter(
    (b) => b.bookingType === "PROPERTY_RENTAL" && b.status !== "CANCELLED"
  ).length;

  const shiftingTripsCount = bookings.filter(
    (b) => b.bookingType === "HOUSE_SHIFTING" && b.status !== "CANCELLED"
  ).length;

  const totalEscrowAmount = bookings
    .filter((b) => b.escrowStatus === "HELD")
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name || "Tenant"} 👋`}
      subtitle="Track your active housing rentals, house-shifting pickups, and escrow deposits."
    >
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Active Rentals"
          value={activeRentalsCount.toString()}
          subtitle="Verified lease agreements"
          icon={<Home className="size-5" />}
        />
        <StatCard
          title="Shifting Trips"
          value={shiftingTripsCount.toString()}
          subtitle="Dispatched moving fleets"
          icon={<Truck className="size-5" />}
        />
        <StatCard
          title="Escrow Protected"
          value={`৳${totalEscrowAmount.toLocaleString()}`}
          subtitle="Safeguarded in escrow"
          icon={<CreditCard className="size-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Bookings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border">
            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">My Current Reservations & Bookings</CardTitle>
                <CardDescription className="text-xs">
                  Active properties and moving vehicles synced directly from live database
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => loadMyBookings()}
                  leftIcon={<RefreshCw className="size-3" />}
                >
                  Refresh
                </Button>
                <Button href="/properties" size="xs" variant="outline" leftIcon={<Plus className="size-3" />}>
                  Find More
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              {isLoading ? (
                <div className="space-y-3 py-2">
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              ) : bookings.length === 0 ? (
                <EmptyState
                  title="No active bookings yet"
                  description="Browse verified apartments, bachelor seats, or moving trucks to make your first reservation."
                  actionLabel="Explore Properties"
                  actionHref="/properties"
                />
              ) : (
                bookings.map((b) => {
                  const title =
                    b.vehicle?.title ||
                    b.property?.title ||
                    (b.bookingType === "HOUSE_SHIFTING" ? "House-Shifting Logistics" : "Property Rental");
                  const location =
                    b.dropoffAddress ||
                    b.pickupAddress ||
                    b.property?.address ||
                    "Dhaka, Bangladesh";
                  const dateStr = b.shiftingDate
                    ? new Date(b.shiftingDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Scheduled";

                  return (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">
                            {title}
                          </span>
                          <StatusBadge status={b.status} />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="size-3.5 text-primary-500" />
                          <span className="truncate max-w-xs">{location}</span>
                          <span>•</span>
                          <Calendar className="size-3.5 text-primary-500" />
                          <span>Date: {dateStr}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                        <span className="text-base font-extrabold text-foreground">
                          ৳{b.totalAmount.toLocaleString()}
                        </span>
                        <Badge variant="tonal-blue" className="text-[10px]">
                          <ShieldCheck className="size-3 mr-1" /> Escrow {b.escrowStatus || "HELD"}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Quick Shortcuts
            </h3>
            <div className="space-y-2.5">
              <Button
                href="/properties"
                variant="outline"
                fullWidth
                size="sm"
                className="justify-start text-xs"
                leftIcon={<Home className="size-4 text-blue-500" />}
              >
                Browse Available Properties
              </Button>
              <Button
                href="/vehicles"
                variant="outline"
                fullWidth
                size="sm"
                className="justify-start text-xs"
                leftIcon={<Truck className="size-4 text-emerald-500" />}
              >
                Book Shifting Transport
              </Button>
              <Button
                href="/dashboard/payments"
                variant="outline"
                fullWidth
                size="sm"
                className="justify-start text-xs"
                leftIcon={<CreditCard className="size-4 text-purple-500" />}
              >
                View Payment & Escrow History
              </Button>
              <Button
                href="/utilities"
                variant="outline"
                fullWidth
                size="sm"
                className="justify-start text-xs"
                leftIcon={<Split className="size-4 text-amber-500" />}
              >
                Mess Utility Splitter
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
