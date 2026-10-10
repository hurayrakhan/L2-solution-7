"use client";

import * as React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Split,
  Plus,
  Trash2,
  Users,
  Zap,
  Flame,
  Wifi,
  Droplet,
  UserCheck,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Download,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BillItem {
  id: string;
  name: string;
  amount: number;
  iconName: string;
}

export default function UtilitiesPage() {
  const [tenantsCount, setTenantsCount] = React.useState<number>(4);
  const [bills, setBills] = React.useState<BillItem[]>([
    { id: "1", name: "Electricity (DESCO/DPDC)", amount: 3200, iconName: "zap" },
    { id: "2", name: "High-Speed Wi-Fi Internet", amount: 1500, iconName: "wifi" },
    { id: "3", name: "Gas Cylinders / Pipeline", amount: 1200, iconName: "flame" },
    { id: "4", name: "WASA Water Bill", amount: 800, iconName: "droplet" },
    { id: "5", name: "Maid & Cooking Service", amount: 4500, iconName: "maid" },
  ]);

  const [newItemName, setNewItemName] = React.useState("");
  const [newItemAmount, setNewItemAmount] = React.useState("");

  const totalBill = bills.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const perPersonShare = tenantsCount > 0 ? Math.round(totalBill / tenantsCount) : 0;

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemAmount) {
      toast.error("Please enter a utility bill name and amount");
      return;
    }
    const num = parseFloat(newItemAmount);
    if (isNaN(num) || num <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setBills((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newItemName,
        amount: num,
        iconName: "zap",
      },
    ]);
    setNewItemName("");
    setNewItemAmount("");
    toast.success("Utility item added!");
  };

  const handleRemoveBill = (id: string) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
    toast.success("Item removed");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="tonal-blue" className="mb-3">
              Bachelor Mess & Roommate Hub
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Fair & Automatic Mess Utility Splitting
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              No more confusion at month-end. Calculate, split, and track payments across all roommates in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-primary-500" />
                    <span className="text-sm font-bold text-foreground">
                      Number of Active Roommates / Tenants:
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTenantsCount((prev) => Math.max(1, prev - 1))}
                      className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-lg hover:bg-slate-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-extrabold text-foreground w-6 text-center">
                      {tenantsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTenantsCount((prev) => prev + 1)}
                      className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-lg hover:bg-slate-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-6">
                  {bills.map((bill) => (
                    <div
                      key={bill.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white dark:bg-slate-900 border border-border flex items-center justify-center text-primary-600">
                          <Zap className="size-4" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                          {bill.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">
                          ৳{bill.amount.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBill(bill.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item form */}
                <form onSubmit={handleAddBill} className="flex gap-2 pt-4 border-t border-border">
                  <Input
                    placeholder="New item (e.g. Filter Water)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Amount (৳)"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    className="w-32"
                  />
                  <Button type="submit" variant="default" leftIcon={<Plus className="size-4" />}>
                    Add
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right Col: Split Result Card */}
            <div className="space-y-6">
              <Card className="p-6 border-primary-500 shadow-xl bg-gradient-to-b from-card to-primary-500/5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Utility Expenses
                </span>
                <div className="text-3xl font-black text-foreground mt-1 mb-6">
                  ৳{totalBill.toLocaleString()}
                </div>

                <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-900 text-center mb-6">
                  <span className="text-xs text-primary-700 dark:text-primary-300 font-semibold block">
                    Each Roommate Pays:
                  </span>
                  <span className="text-3xl font-black text-primary-600 dark:text-primary-400 mt-1 block">
                    ৳{perPersonShare.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-primary-600/70 mt-1 block">
                    Split equally across {tenantsCount} tenants
                  </span>
                </div>

                <Button
                  href="/register"
                  variant="default"
                  fullWidth
                  size="lg"
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Automate in Dashboard
                </Button>

                <p className="text-[11px] text-center text-slate-400 mt-3">
                  Log in to send individual payment links to roommates and collect automatically via bKash/Nagad.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
