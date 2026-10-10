"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  Building,
  Truck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Eye,
  Plus,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ResourceItem {
  id: string;
  title: string;
  type: string;
  category: "PROPERTY" | "VEHICLE";
  owner: string;
  location: string;
  rate: string;
  status: "ACTIVE" | "PENDING" | "REJECTED";
}

const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "Luxury 3BHK Apartment with Balcony View",
    type: "APARTMENT",
    category: "PROPERTY",
    owner: "Tariqul Islam",
    location: "Gulshan-2, Dhaka",
    rate: "৳45,000/mo",
    status: "ACTIVE",
  },
  {
    id: "res-2",
    title: "1-Ton Open Pickup Truck for Cartons",
    type: "PICKUP_TRUCK",
    category: "VEHICLE",
    owner: "Mizanur Rahman",
    location: "Mirpur, Dhaka",
    rate: "৳1,200 Base + ৳45/km",
    status: "ACTIVE",
  },
  {
    id: "res-3",
    title: "Bachelor Room Sublet in Dhanmondi",
    type: "SUBLET",
    category: "PROPERTY",
    owner: "Kamal Hossain",
    location: "Dhanmondi, Dhaka",
    rate: "৳14,000/mo",
    status: "PENDING",
  },
  {
    id: "res-4",
    title: "3.5-Ton Long Distance Covered Van",
    type: "COVERED_VAN",
    category: "VEHICLE",
    owner: "Abdur Rashid",
    location: "GEC, Chittagong",
    rate: "৳3,500 Base + ৳85/km",
    status: "PENDING",
  },
  {
    id: "res-5",
    title: "Student Mess Seat in Modern Flat",
    type: "SHARED_ROOM",
    category: "PROPERTY",
    owner: "Shahidul Alam",
    location: "Bashundhara, Dhaka",
    rate: "৳5,500/mo",
    status: "ACTIVE",
  },
];

export default function AdminManagePage() {
  const [resources, setResources] = React.useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [activeTab, setActiveTab] = React.useState<"ALL" | "PROPERTY" | "VEHICLE">("ALL");
  const [search, setSearch] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState<ResourceItem | null>(null);

  const handleUpdateStatus = (id: string, newStatus: "ACTIVE" | "REJECTED") => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success(`Resource status updated to ${newStatus}`);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Listing removed from database");
  };

  const filtered = resources.filter((item) => {
    const matchesTab = activeTab === "ALL" || item.category === activeTab;
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Platform Resource Management"
      subtitle="Review, approve, and manage verified properties and logistics vehicles across Bangladesh."
    >
      {/* Search and Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
          <TabsList>
            <TabsTrigger value="ALL">All Listings</TabsTrigger>
            <TabsTrigger value="PROPERTY">Properties</TabsTrigger>
            <TabsTrigger value="VEHICLE">Fleets</TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          placeholder="Filter by title, owner, area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="size-4" />}
          className="w-full sm:w-72"
        />
      </div>

      {/* CRUD Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Listing / Resource</TableHead>
            <TableHead>Category & Type</TableHead>
            <TableHead>Owner / Provider</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Fare / Rent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-64 text-center">
                <EmptyState
                  title="No resources found"
                  description="Try adjusting your search query or switching categories."
                  actionLabel="Clear Filters"
                  onAction={() => {
                    setActiveTab("ALL");
                    setSearch("");
                  }}
                />
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-foreground">
                  {item.title}
                </TableCell>
              <TableCell>
                <Badge variant={item.category === "PROPERTY" ? "tonal-blue" : "tonal-green"}>
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-600 dark:text-slate-300">
                {item.owner}
              </TableCell>
              <TableCell className="text-slate-500">{item.location}</TableCell>
              <TableCell className="font-semibold text-foreground">
                {item.rate}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {item.status === "PENDING" && (
                    <Button
                      size="xs"
                      variant="default"
                      onClick={() => handleUpdateStatus(item.id, "ACTIVE")}
                      leftIcon={<CheckCircle className="size-3" />}
                    >
                      Approve
                    </Button>
                  )}
                  {item.status === "ACTIVE" && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleUpdateStatus(item.id, "REJECTED")}
                      className="text-red-600"
                    >
                      Suspend
                    </Button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>

      <div className="mt-6 flex justify-between items-center text-xs text-slate-500">
        <span>Showing {filtered.length} total resources</span>
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </div>
    </DashboardLayout>
  );
}
