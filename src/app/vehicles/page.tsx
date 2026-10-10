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
  Filter,
  Search,
  Sparkles,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Loader2,
  User,
  Phone,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Vehicle } from "@/types";
import { fetcherWithMeta } from "@/lib/fetcher";
import { getVehicleImages } from "@/lib/media-helpers";

function VehicleListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [searchInput, setSearchInput] = React.useState(query);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Fetch live fleet from backend API database
  const loadLiveVehicles = React.useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const queryParts: string[] = [];
      if (query.trim()) queryParts.push(`q=${encodeURIComponent(query.trim())}`);
      if (type && type !== "all") queryParts.push(`vehicleType=${encodeURIComponent(type)}`);
      queryParts.push(`page=${page}`);
      queryParts.push(`limit=9`);

      const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      const result = await fetcherWithMeta<Vehicle[]>(`/vehicles${queryString}`);

      if (Array.isArray(result.data)) {
        setVehicles(result.data);
        if (result.meta) {
          setTotalCount(result.meta.total);
          setTotalPages(result.meta.totalPage || Math.ceil(result.meta.total / 9) || 1);
        } else {
          setTotalCount(result.data.length);
          setTotalPages(1);
        }
      } else {
        setVehicles([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } catch (err: any) {
      console.error("Failed to load vehicles from live API:", err);
      setLoadError(err?.error || err?.message || "Failed to load live vehicles");
    } finally {
      setIsLoading(false);
    }
  }, [query, type, page]);

  React.useEffect(() => {
    loadLiveVehicles();
  }, [loadLiveVehicles]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("q", searchInput);
  };

  return (
    <div className="container py-8 sm:py-12">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <Badge variant="tonal-emerald" className="mb-2">
            Live Verified Logistics Fleet
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Book Moving Trucks, Pickups & Vans
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Real-time registered fleets with transparent base fares and per-km pricing.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search vehicle model, driver..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="size-4" />}
            className="w-full md:w-72"
          />
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border mb-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Filter className="size-4 text-emerald-500" />
            <span>Filter Fleet:</span>
          </div>

          <Select value={type} onValueChange={(val) => updateFilters("type", val)}>
            <SelectTrigger className="h-9 w-44 text-xs">
              <SelectValue placeholder="All Fleet Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PICKUP_TRUCK">Pickup Trucks</SelectItem>
              <SelectItem value="COVERED_VAN">Covered Vans</SelectItem>
              <SelectItem value="MICROBUS">Microbuses</SelectItem>
              <SelectItem value="PASSENGER_CAR">Passenger Cars</SelectItem>
            </SelectContent>
          </Select>

          {(query || (type && type !== "all")) && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => router.push("/vehicles")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-foreground">{totalCount}</span> fleet vehicles
        </div>
      </div>

      {/* Error State */}
      {loadError && (
        <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-between text-sm text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{loadError}</span>
          </div>
          <Button
            size="xs"
            variant="outline"
            leftIcon={<RefreshCw className="size-3" />}
            onClick={() => loadLiveVehicles()}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-border p-0">
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-full mt-4" />
              </div>
            </Card>
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found matching your criteria"
          description="Try adjusting your filters or looking for another vehicle type."
          actionLabel="Reset Filters"
          onAction={() => router.push("/vehicles")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => {
            const images = getVehicleImages(vehicle);
            const baseFare = vehicle.hourlyRate || vehicle.baseFare || 1200;
            const displayType = vehicle.vehicleType.replace("_", " ");

            return (
              <Card
                key={vehicle.id}
                className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-0"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={images[0]}
                      alt={vehicle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant="tonal-emerald"
                        size="xs"
                        className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                      >
                        {displayType}
                      </Badge>
                      {vehicle.isAvailable ? (
                        <Badge
                          variant="tonal-green"
                          size="xs"
                          className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                        >
                          Ready
                        </Badge>
                      ) : (
                        <Badge
                          variant="tonal-amber"
                          size="xs"
                          className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                        >
                          On Trip
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-black text-sm shadow-md">
                        Base ৳{baseFare.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="size-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">Plate: {vehicle.licensePlate}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {vehicle.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      Capacity: {vehicle.capacity || "1.5 Tons"} • Driver: {vehicle.driverName || "Assigned Driver"}
                    </p>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <div className="flex items-center gap-1">
                        <Weight className="size-4 text-slate-400" />
                        <span>{vehicle.capacity || "1.5 Ton"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
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
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", newPage.toString());
              router.push(`/vehicles?${params.toString()}`);
            }}
          />
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
        <Suspense
          fallback={
            <div className="container py-12 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Loader2 className="size-4 animate-spin text-emerald-500" />
              <span>Loading MoveInBD vehicle fleet...</span>
            </div>
          }
        >
          <VehicleListContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
