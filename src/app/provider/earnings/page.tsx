"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Building,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MONTHLY_PAYOUTS_CHART = [
  { month: "Nov", amount: 48000 },
  { month: "Dec", amount: 62000 },
  { month: "Jan", amount: 71000 },
  { month: "Feb", amount: 89000 },
  { month: "Mar", amount: 104000 },
];

const PAYOUT_HISTORY = [
  {
    id: "po-1",
    method: "City Bank (BEFTN)",
    amount: 104000,
    date: "2026-03-01",
    status: "COMPLETED",
  },
  {
    id: "po-2",
    method: "bKash Merchant",
    amount: 89000,
    date: "2026-02-01",
    status: "COMPLETED",
  },
  {
    id: "po-3",
    method: "City Bank (BEFTN)",
    amount: 71000,
    date: "2026-01-01",
    status: "COMPLETED",
  },
];

export default function ProviderEarningsPage() {
  const [isRequesting, setIsRequesting] = React.useState(false);

  const handleWithdrawalRequest = () => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      toast.success("Withdrawal request for ৳78,500 submitted to accounts team!");
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Earnings, Payouts & Escrow Releases"
      subtitle="Track your disbursed rental income, completed trip earnings, and withdraw to bank/bKash."
    >
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Withdrawable Balance"
          value="৳78,500"
          change="+18.5%"
          isPositive
          subtitle="Available for payout"
          icon={<DollarSign className="size-5" />}
        />
        <StatCard
          title="Escrow In-Holding"
          value="৳90,000"
          subtitle="Awaiting tenant key confirmation"
          icon={<CreditCard className="size-5" />}
        />
        <StatCard
          title="Lifetime Revenue"
          value="৳3,74,000"
          change="+24.1%"
          isPositive
          subtitle="From 59 completed bookings"
          icon={<TrendingUp className="size-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2 p-6 border-border">
          <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Monthly Earnings Trend (BDT)</CardTitle>
              <CardDescription className="text-xs">
                Net earnings released from escrow each month
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_PAYOUTS_CHART} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(val: unknown) => [`৳${Number(val).toLocaleString()}`, "Earnings"]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="amount" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Action Card */}
        <Card className="p-6 border-border flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground mb-2">
              Request Payout
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Disburse your settled funds directly to your linked Bangladeshi Bank Account or bKash Merchant Wallet.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Linked Bank:</span>
                <span className="font-bold text-foreground">City Bank (Gulshan)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Account No:</span>
                <span className="font-mono text-foreground font-semibold">110293847501</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Routing No:</span>
                <span className="font-mono text-foreground font-semibold">225271829</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleWithdrawalRequest}
            variant="default"
            fullWidth
            size="lg"
            loading={isRequesting}
            loadingText="Submitting..."
            leftIcon={<DollarSign className="size-4" />}
          >
            Withdraw ৳78,500
          </Button>
        </Card>
      </div>

      {/* Payout History */}
      <Card className="p-6 border-border">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base">Historical Payout Records</CardTitle>
          <CardDescription className="text-xs">
            Past transfers completed via BEFTN / bKash
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout Reference</TableHead>
                <TableHead>Destination Account</TableHead>
                <TableHead>Amount (BDT)</TableHead>
                <TableHead>Execution Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYOUT_HISTORY.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-mono text-xs font-bold text-foreground">
                    {po.id}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                    {po.method}
                  </TableCell>
                  <TableCell className="font-extrabold text-foreground text-xs">
                    ৳{po.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-400 text-xs">
                    {po.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="tonal-green" className="text-[10px]">
                      <CheckCircle className="size-3 mr-1" /> {po.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
