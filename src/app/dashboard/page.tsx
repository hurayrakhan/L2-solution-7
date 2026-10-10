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
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/contexts/auth-context";

export default function TenantDashboardPage() {
  const { user } = useAuth();

  const myBookings = [
    {
      id: "b-101",
      title: "Master Bed Sublet with Attached Bath",
      type: "PROPERTY_RENTAL",
      location: "Road 8/A, Dhanmondi",
      amount: 14000,
      movingDate: "2026-04-01",
      status: "CONFIRMED",
      escrowStatus: "HELD",
    },
    {
      id: "b-102",
      title: "1-Ton Open Pickup Truck Shifting",
      type: "HOUSE_SHIFTING",
      location: "Mirpur to Dhanmondi",
      amount: 1850,
      movingDate: "2026-04-02",
      status: "IN_PROGRESS",
      escrowStatus: "HELD",
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name || "Tenant"} 👋`}
      subtitle="Track your active housing rentals, house-shifting pickups, and escrow deposits."
    >
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Active Rentals"
          value="1"
          subtitle="Dhanmondi Master Room"
          icon={<Home className="size-5" />}
        />
        <StatCard
          title="Shifting Trips"
          value="1 Active"
          subtitle="Scheduled for Apr 2"
          icon={<Truck className="size-5" />}
        />
        <StatCard
          title="Escrow Deposit Balance"
          value="৳15,850"
          subtitle="Protected in escrow"
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
                  Active properties and moving vehicles with real-time status
                </CardDescription>
              </div>
              <Button href="/properties" size="xs" variant="outline" leftIcon={<Plus className="size-3" />}>
                Find More
              </Button>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              {myBookings.length === 0 ? (
                <EmptyState
                  title="No active bookings yet"
                  description="Browse verified apartments, bachelor seats, or moving trucks to make your first reservation."
                  actionLabel="Explore Properties"
                  actionHref="/properties"
                />
              ) : (
                myBookings.map((b) => (
                  <div
                    key={b.id}
                  className="p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {b.title}
                      </span>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="size-3.5 text-primary-500" />
                      <span>{b.location}</span>
                      <span>•</span>
                      <Calendar className="size-3.5 text-primary-500" />
                      <span>Date: {b.movingDate}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                    <span className="text-base font-extrabold text-foreground">
                      ৳{b.amount.toLocaleString()}
                    </span>
                    <Badge variant="tonal-blue" className="text-[10px]">
                      <ShieldCheck className="size-3 mr-1" /> Escrow {b.escrowStatus}
                    </Badge>
                  </div>
                </div>
              )))}
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
