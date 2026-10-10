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
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<"PROPERTY" | "VEHICLE">("PROPERTY");
  const [newRate, setNewRate] = React.useState("");
  const [newLocation, setNewLocation] = React.useState("");

  const toggleAvailability = (id: string) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
    toast.success("Listing availability status toggled");
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRate || !newLocation) {
      toast.error("Please fill in all listing details");
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
    setNewTitle("");
    setNewRate("");
    setNewLocation("");
    toast.success("New listing created and published live!");
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

      {/* Create Listing Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Add New Property or Vehicle</DialogTitle>
            <DialogDescription>
              Publish a new listing to start receiving customer reservation requests.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateListing} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Category
              </label>
              <Select
                value={newCategory}
                onValueChange={(val: any) => setNewCategory(val)}
              >
                <SelectTrigger className="h-10 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROPERTY">Residential Property / Room</SelectItem>
                  <SelectItem value="VEHICLE">Shifting Truck / Pickup</SelectItem>
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
              label="Location / Area"
              placeholder="e.g. Road 12, Banani, Dhaka"
              isRequired
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />

            <Input
              label="Fare or Monthly Rent"
              placeholder="e.g. ৳35,000/mo or ৳1,500 Base + ৳50/km"
              isRequired
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
            />

            <Button type="submit" variant="default" fullWidth size="lg">
              Publish Listing
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
