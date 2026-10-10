"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Weight,
  DollarSign,
  Phone,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Vehicle } from "@/types";

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "veh-1",
    title: "1-Ton Open Pickup Truck for Furniture & Cartons",
    model: "Tata Ace EX 2023",
    licensePlate: "Dhaka Metro-Tha-112233",
    vehicleType: "PICKUP_TRUCK",
    capacityTon: 1.0,
    baseFare: 1200,
    perKmRate: 45,
    driverName: "Mizanur Rahman",
    driverPhone: "+880 1812-345678",
    city: "Dhaka",
    isAvailable: true,
    providerId: "prov-1",
    images: ["https://images.unsplash.com/photo-1586191582056-a19280f97063?w=800&auto=format&fit=crop&q=80"],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "veh-2",
    title: "2-Ton Heavy Covered Van for Rain-Protected Moving",
    model: "Isuzu NPR 2022",
    licensePlate: "Dhaka Metro-U-445566",
    vehicleType: "COVERED_VAN",
    capacityTon: 2.0,
    baseFare: 2200,
    perKmRate: 65,
    driverName: "Kamrul Hassan",
    driverPhone: "+880 1712-987654",
    city: "Dhaka",
    isAvailable: true,
    providerId: "prov-1",
    images: ["https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80"],
    createdAt: "2026-03-02T10:00:00Z",
    updatedAt: "2026-03-02T10:00:00Z",
  },
  {
    id: "veh-3",
    title: "3.5-Ton Long Distance Intercity Shifting Truck",
    model: "Mahindra Bolero Maxi Truck Plus",
    licensePlate: "Chatto Metro-Sha-778899",
    vehicleType: "OPEN_TRUCK",
    capacityTon: 3.5,
    baseFare: 3500,
    perKmRate: 85,
    driverName: "Abdur Rashid",
    driverPhone: "+880 1611-445566",
    city: "Chittagong",
    isAvailable: true,
    providerId: "prov-2",
    images: ["https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80"],
    createdAt: "2026-03-03T10:00:00Z",
    updatedAt: "2026-03-03T10:00:00Z",
  },
  {
    id: "veh-4",
    title: "Toyota HiAce 12-Seat Microbus for Passenger & Luggage",
    model: "Toyota HiAce Super GL",
    licensePlate: "Dhaka Metro-Cha-990011",
    vehicleType: "MICROBUS",
    capacityTon: 0.8,
    baseFare: 2500,
    perKmRate: 50,
    driverName: "Zahidul Islam",
    driverPhone: "+880 1912-334455",
    city: "Dhaka",
    isAvailable: true,
    providerId: "prov-1",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"],
    createdAt: "2026-03-04T10:00:00Z",
    updatedAt: "2026-03-04T10:00:00Z",
  },
];

function VehicleListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "all";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [searchInput, setSearchInput] = React.useState(query);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/vehicles?${params.toString()}`);
  };

  const filteredVehicles = INITIAL_VEHICLES.filter((v) => {
    const matchesQuery =
      !query ||
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.model.toLowerCase().includes(query.toLowerCase());

    const matchesCity = city === "all" || v.city.toLowerCase() === city.toLowerCase();
    const matchesType = type === "all" || v.vehicleType === type;

    return matchesQuery && matchesCity && matchesType;
  });

  return (
    <div className="container py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <Badge variant="tonal-green" className="mb-2">
            House-Shifting Logistics Fleet
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Book Moving Trucks & Pickups
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Transparent fares, verified drivers, and guaranteed safety for your furniture and personal goods.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateFilters("q", searchInput);
          }}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <Input
            placeholder="Search vehicle model..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="size-4" />}
            className="w-full md:w-72"
          />
          <Button type="submit" variant="default">Search</Button>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border mb-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Filter className="size-4 text-emerald-500" />
            <span>Filter Fleet:</span>
          </div>

          <Select value={city} onValueChange={(val) => updateFilters("city", val)}>
            <SelectTrigger className="h-9 w-36 text-xs">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(val) => updateFilters("type", val)}>
            <SelectTrigger className="h-9 w-40 text-xs">
              <SelectValue placeholder="All Fleet Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PICKUP_TRUCK">Pickup Trucks</SelectItem>
              <SelectItem value="COVERED_VAN">Covered Vans</SelectItem>
              <SelectItem value="OPEN_TRUCK">Open Trucks</SelectItem>
              <SelectItem value="MICROBUS">Microbuses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-foreground">{filteredVehicles.length}</span> fleet vehicles
        </div>
      </div>

      {filteredVehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found matching your criteria"
          description="Try adjusting your filters or looking for another vehicle type."
          actionLabel="Reset Filters"
          onAction={() => router.push("/vehicles")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-0"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="fill-green" className="text-[11px] font-bold">
                      {vehicle.vehicleType.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-black text-sm shadow-md">
                      Base ৳{vehicle.baseFare.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Based in {vehicle.city} • Plate: {vehicle.licensePlate}</span>
                  </div>

                  <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {vehicle.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    Model: {vehicle.model} • Driver: {vehicle.driverName}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <div className="flex items-center gap-1">
                      <Weight className="size-4 text-slate-400" />
                      <span>{vehicle.capacityTon} Ton Max</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span>৳{vehicle.perKmRate}/km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  href={`/vehicles/${vehicle.id}`}
                  variant="default"
                  fullWidth
                  size="sm"
                >
                  Calculate Fare & Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="container py-12 text-center text-sm">Loading vehicle fleets...</div>}>
          <VehicleListContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
