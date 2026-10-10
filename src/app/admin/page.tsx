"use client";

import * as React from "react";
import {
  Users,
  Building,
  Truck,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";

const MONTHLY_REVENUE_DATA = [
  { month: "Nov", revenue: 145000, bookings: 32 },
  { month: "Dec", revenue: 185000, bookings: 45 },
  { month: "Jan", revenue: 220000, bookings: 54 },
  { month: "Feb", revenue: 290000, bookings: 68 },
  { month: "Mar", revenue: 380000, bookings: 88 },
  { month: "Apr", revenue: 465000, bookings: 110 },
];

const RECENT_ACTIVITIES = [
  {
    id: "act-1",
    user: "Tariqul Islam (Owner)",
    action: "Listed new 3BHK Apartment in Gulshan-2",
    time: "10 mins ago",
    status: "VERIFIED",
  },
  {
    id: "act-2",
    user: "Tanvir Ahmed (Tenant)",
    action: "Reserved Pickup Truck (Tata Ace) - Fare ৳1,850",
    time: "25 mins ago",
    status: "CONFIRMED",
  },
  {
    id: "act-3",
    user: "Mizanur Rahman (Driver)",
    action: "Requested NID Provider Verification approval",
    time: "1 hour ago",
    status: "PENDING",
  },
  {
    id: "act-4",
    user: "Sadia Sultana (Tenant)",
    action: "Paid Mess Utility share ৳1,420 via SSLCommerz",
    time: "2 hours ago",
    status: "COMPLETED",
  },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout
      title="Admin Analytics & Platform Overview"
      subtitle="Real-time performance metrics, financial escrow totals, and system logs across Bangladesh."
    >
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Escrow Revenue"
          value="৳46.5L"
          change="+28.4%"
          isPositive
          subtitle="Monthly volume"
          icon={<DollarSign className="size-5" />}
        />
        <StatCard
          title="Active Listings"
          value="5,240"
          change="+14.2%"
          isPositive
          subtitle="Flats, sublets & rooms"
          icon={<Building className="size-5" />}
        />
        <StatCard
          title="Moving Fleet Vehicles"
          value="1,280"
          change="+8.5%"
          isPositive
          subtitle="Registered pickups & vans"
          icon={<Truck className="size-5" />}
        />
        <StatCard
          title="Registered Users"
          value="34,890"
          change="+19.1%"
          isPositive
          subtitle="Tenants & Providers"
          icon={<Users className="size-5" />}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Growth Area Chart */}
        <Card className="lg:col-span-2 p-6 border-border">
          <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Revenue & Escrow Inflow (BDT)</CardTitle>
              <CardDescription className="text-xs">
                Monthly gross transaction volume processed via Stripe & SSLCommerz
              </CardDescription>
            </div>
            <Badge variant="tonal-green">+34.8% YOY</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`৳${Number(value).toLocaleString()}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Booking Volume Chart */}
        <Card className="p-6 border-border">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-base">Monthly Shifting Bookings</CardTitle>
            <CardDescription className="text-xs">
              Completed fleet trips per month
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    formatter={(val: any) => [val, "Bookings"]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="bookings" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Platform Activities */}
      <Card className="p-6 border-border">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base">Recent Platform Activity & Audit Stream</CardTitle>
          <CardDescription className="text-xs">
            Live system transactions, listings, and identity requests
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-foreground mr-2">{act.user}:</span>
                <span className="text-slate-600 dark:text-slate-300">{act.action}</span>
                <span className="text-slate-400 ml-2">({act.time})</span>
              </div>
              <StatusBadge status={act.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
