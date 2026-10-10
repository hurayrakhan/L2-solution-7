"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Split,
  DollarSign,
  Download,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const MOCK_PAYMENTS = [
  {
    id: "pay-1",
    purpose: "Dhanmondi Sublet Advance Security Deposit",
    method: "STRIPE",
    amount: 14000,
    status: "PAID",
    escrow: "HELD",
    date: "2026-03-08",
  },
  {
    id: "pay-2",
    purpose: "Tata Ace Pickup Shifting Fare",
    method: "SSLCOMMERZ",
    amount: 1850,
    status: "PAID",
    escrow: "RELEASED",
    date: "2026-03-02",
  },
  {
    id: "pay-3",
    purpose: "February Shared Mess Electricity & Wi-Fi",
    method: "SSLCOMMERZ",
    amount: 1420,
    status: "PAID",
    escrow: "RELEASED",
    date: "2026-02-28",
  },
];

const PENDING_MESS_BILLS = [
  {
    id: "bill-10",
    month: "March 2026",
    title: "Mess Utilities (DESCO + Internet + Gas)",
    myShare: 1550,
    status: "UNPAID",
  },
];

export default function TenantPaymentsPage() {
  const [pendingBills, setPendingBills] = React.useState(PENDING_MESS_BILLS);

  const handlePayBill = (id: string) => {
    toast.loading("Connecting to SSLCommerz gateway...", { id: "bill-pay" });
    setTimeout(() => {
      setPendingBills((prev) => prev.filter((b) => b.id !== id));
      toast.success("Utility bill paid successfully! Receipt generated.", { id: "bill-pay" });
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Payment History & Escrow Tracker"
      subtitle="View all past transactions, manage escrow statuses, and settle mess utility contributions."
    >
      <div className="space-y-8">
        {/* Pending Mess Bills Banner */}
        {pendingBills.length > 0 && (
          <Card className="p-6 border-amber-500/50 bg-amber-50/20 dark:bg-amber-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                  <Split className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Action Required: Pending Mess Bill Share
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {pendingBills[0].title} — {pendingBills[0].month}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-foreground">
                  ৳{pendingBills[0].myShare.toLocaleString()}
                </span>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handlePayBill(pendingBills[0].id)}
                >
                  Pay My Share
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Transaction History Table */}
        <Card className="p-6 border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">Transaction & Escrow History</CardTitle>
            <CardDescription className="text-xs">
              Every payment processed through Stripe or SSLCommerz test mode
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purpose / Service</TableHead>
                  <TableHead>Gateway Method</TableHead>
                  <TableHead>Amount (BDT)</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Escrow Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PAYMENTS.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-bold text-foreground">
                      {p.purpose}
                    </TableCell>
                    <TableCell>
                      <Badge variant="tonal-gray">{p.method}</Badge>
                    </TableCell>
                    <TableCell className="font-extrabold text-foreground">
                      ৳{p.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={p.status} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={p.escrow === "HELD" ? "tonal-blue" : "tonal-green"}
                        className="text-[10px]"
                      >
                        <ShieldCheck className="size-3 mr-1" />
                        {p.escrow === "HELD" ? "HELD IN ESCROW" : "RELEASED TO PROVIDER"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs">
                      {p.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
