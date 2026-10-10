"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  Building,
  Truck,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/ui/stat-card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";

interface MyListing {
  id: string;
  title: string;
  category: "PROPERTY" | "VEHICLE";
  rate: string;
  location: string;
  isAvailable: boolean;
  totalBookings: number;
}

const INITIAL_PROVIDER_LISTINGS: MyListing[] = [
  {
    id: "lst-1",
    title: "Luxury 3BHK Apartment in Gulshan-2",
    category: "PROPERTY",
    rate: "৳45,000/mo",
    location: "Gulshan, Dhaka",
    isAvailable: true,
    totalBookings: 6,
  },
  {
    id: "lst-2",
    title: "1-Ton Tata Ace Open Pickup",
    category: "VEHICLE",
    rate: "৳1,200 Base + ৳45/km",
    location: "Mirpur, Dhaka",
    isAvailable: true,
    totalBookings: 34,
  },
  {
    id: "lst-3",
    title: "2-Ton Heavy Covered Van",
    category: "VEHICLE",
    rate: "৳2,200 Base + ৳65/km",
    location: "Uttara, Dhaka",
    isAvailable: false,
    totalBookings: 19,
  },
];

export default function ProviderDashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = React.useState<MyListing[]>(INITIAL_PROVIDER_LISTINGS);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [wizardStep, setWizardStep] = React.useState<1 | 2 | 3>(1);

  // Wizard Form Fields
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<"PROPERTY" | "VEHICLE">("PROPERTY");
  const [newRate, setNewRate] = React.useState("");
  const [newDeposit, setNewDeposit] = React.useState("");
  const [newLocation, setNewLocation] = React.useState("");
  const [newSpecs, setNewSpecs] = React.useState("");
  const [agreedTerms, setAgreedTerms] = React.useState(true);

  const toggleAvailability = (id: string) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
    toast.success("Listing availability status toggled");
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (wizardStep === 1) {
      if (!newTitle.trim() || !newLocation.trim()) {
        toast.error("Please provide both title and location");
        return;
      }
      setWizardStep(2);
    } else if (wizardStep === 2) {
      if (!newRate.trim()) {
        toast.error("Please enter the rent or transport fare rate");
        return;
      }
      setWizardStep(3);
    } else if (wizardStep === 3) {
      if (!agreedTerms) {
        toast.error("Please confirm agreement with platform terms");
        return;
      }

      const created: MyListing = {
        id: `lst-${Date.now()}`,
        title: newTitle,
        category: newCategory,
        rate: newRate,
        location: newLocation,
        isAvailable: true,
        totalBookings: 0,
      };

      setListings((prev) => [created, ...prev]);
      setCreateModalOpen(false);
      setWizardStep(1);
      setNewTitle("");
      setNewRate("");
      setNewDeposit("");
      setNewLocation("");
      setNewSpecs("");
      toast.success("Listing published successfully through 3-step verification wizard!");
    }
  };

  return (
    <DashboardLayout
      title={`Provider Dashboard — ${user?.name || "Owner"} 🛠️`}
      subtitle="Manage your listed properties, moving vehicles, and track incoming customer dispatch requests."
    >
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Active Listings"
          value={listings.filter((l) => l.isAvailable).length}
          subtitle="Ready for bookings"
          icon={<Building className="size-5" />}
        />
        <StatCard
          title="Lifetime Bookings"
          value={listings.reduce((acc, curr) => acc + curr.totalBookings, 0)}
          subtitle="Rentals & shifting trips"
          icon={<Users className="size-5" />}
        />
        <StatCard
          title="Monthly Payout Due"
          value="৳78,500"
          subtitle="Processed via Bank/bKash"
          icon={<DollarSign className="size-5" />}
        />
      </div>

      {/* Listings Table */}
      <Card className="p-6 border-border">
        <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">My Properties & Moving Fleets</CardTitle>
            <CardDescription className="text-xs">
              Toggle availability instantly when rented out or under vehicle maintenance
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="default"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<Plus className="size-4" />}
          >
            Create New Listing
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fare / Rent</TableHead>
                <TableHead>Total Trips/Rentals</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Quick Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-bold text-foreground">
                    {l.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={l.category === "PROPERTY" ? "tonal-blue" : "tonal-green"}>
                      {l.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {l.location}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground text-xs">
                    {l.rate}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 text-xs font-bold">
                    {l.totalBookings}
                  </TableCell>
                  <TableCell>
                    {l.isAvailable ? (
                      <StatusBadge status="AVAILABLE" />
                    ) : (
                      <StatusBadge status="RENTED" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="xs"
                      variant={l.isAvailable ? "outline" : "default"}
                      onClick={() => toggleAvailability(l.id)}
                    >
                      {l.isAvailable ? "Mark Rented" : "Mark Available"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Listing Wizard Modal */}
      <Dialog open={createModalOpen} onOpenChange={(open) => {
        setCreateModalOpen(open);
        if (!open) setWizardStep(1);
      }}>
        <DialogContent size="md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base sm:text-lg">
                Create Listing — Step {wizardStep} of 3
              </DialogTitle>
              <Badge variant="tonal-blue" size="xs">
                {wizardStep === 1 ? "1. Category & Info" : wizardStep === 2 ? "2. Pricing & Escrow" : "3. Review & Publish"}
              </Badge>
            </div>
            <DialogDescription className="text-xs">
              Complete the verified multi-step form to publish your property or shifting vehicle.
            </DialogDescription>
          </DialogHeader>

          {/* Wizard Step Progress Bar */}
          <div className="grid grid-cols-3 gap-2 my-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all ${
                  step <= wizardStep ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleNextStep} className="space-y-4 pt-1">
            {wizardStep === 1 && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Listing Category
                  </label>
                  <Select
                    value={newCategory}
                    onValueChange={(val: string) => setNewCategory(val as "PROPERTY" | "VEHICLE")}
                  >
                    <SelectTrigger className="h-10 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PROPERTY">Residential Property / Roommate Flat</SelectItem>
                      <SelectItem value="VEHICLE">Shifting Truck / Pickup Fleet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  label="Listing Title"
                  placeholder="e.g. 2BHK Furnished Apartment in Dhanmondi"
                  isRequired
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />

                <Input
                  label="Area / Neighborhood Location"
                  placeholder="e.g. Road 12, Banani, Dhaka"
                  isRequired
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-3.5">
                <Input
                  label={newCategory === "PROPERTY" ? "Monthly Rent (BDT)" : "Base Moving Fare (BDT)"}
                  placeholder={newCategory === "PROPERTY" ? "e.g. ৳35,000" : "e.g. ৳1,500"}
                  isRequired
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                />

                <Input
                  label="Required Escrow Advance Security Deposit"
                  placeholder="e.g. ৳20,000 (Refundable upon checkout)"
                  value={newDeposit}
                  onChange={(e) => setNewDeposit(e.target.value)}
                />

                <Input
                  label="Specifications / Included Utilities"
                  placeholder={newCategory === "PROPERTY" ? "e.g. Gas, Electricity, Water included" : "e.g. 1-Ton capacity, 2 helpers included"}
                  value={newSpecs}
                  onChange={(e) => setNewSpecs(e.target.value)}
                />
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border bg-slate-50 dark:bg-slate-900/60 space-y-2 text-xs">
                  <h4 className="font-bold text-foreground">Summary Preview:</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                    <div>Category: <span className="font-semibold text-foreground">{newCategory}</span></div>
                    <div>Location: <span className="font-semibold text-foreground">{newLocation}</span></div>
                    <div>Rate: <span className="font-semibold text-foreground">{newRate}</span></div>
                    <div>Security Deposit: <span className="font-semibold text-foreground">{newDeposit || "Not required"}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="termsCheck"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 size-4"
                  />
                  <label htmlFor="termsCheck" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    I confirm ownership or operational authorization and agree to MoveInBD escrow protection terms.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
              {wizardStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setWizardStep((prev) => (prev - 1) as 1 | 2)}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button type="submit" variant="default" size="sm">
                {wizardStep < 3 ? "Continue to Next Step" : "Publish Listing Live"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
