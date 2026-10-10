"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Building,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  CheckCircle,
  Loader2,
  AlertCircle,
  RefreshCw,
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
import { Property } from "@/types";
import { fetcherWithMeta } from "@/lib/fetcher";
import { getPropertyImages } from "@/lib/media-helpers";

function PropertyListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "all";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [searchInput, setSearchInput] = React.useState(query);
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  // Sync search input if query param changes externally
  React.useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Fetch properties directly from live backend API database
  const loadLiveProperties = React.useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const queryParts: string[] = [];
      if (query.trim()) queryParts.push(`q=${encodeURIComponent(query.trim())}`);
      if (city && city !== "all") queryParts.push(`city=${encodeURIComponent(city)}`);
      
      // Map frontend type to backend enum if needed
      if (type && type !== "all") {
        const backendType = type === "APARTMENT" ? "FLAT" : type;
        queryParts.push(`propertyType=${encodeURIComponent(backendType)}`);
      }

      queryParts.push(`page=${page}`);
      queryParts.push(`limit=9`);

      const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      const result = await fetcherWithMeta<Property[]>(`/properties${queryString}`);

      if (Array.isArray(result.data)) {
        setProperties(result.data);
        if (result.meta) {
          setTotalCount(result.meta.total);
          setTotalPages(result.meta.totalPage || Math.ceil(result.meta.total / 9) || 1);
        } else {
          setTotalCount(result.data.length);
          setTotalPages(1);
        }
      } else {
        setProperties([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } catch (err: any) {
      console.error("Failed to load properties from live API:", err);
      setLoadError(err?.error || err?.message || "Failed to load live properties");
    } finally {
      setIsLoading(false);
    }
  }, [query, city, type, page]);

  React.useEffect(() => {
    loadLiveProperties();
  }, [loadLiveProperties]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/properties?${params.toString()}`);
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
          <Badge variant="tonal-blue" className="mb-2">
            Live Verified Database
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Explore Properties & Rooms in Bangladesh
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Real-time listings synchronized directly with the MoveInBD live database.
          </p>
        </div>

        {/* Filter Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search by area, title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="size-4" />}
            className="w-full md:w-72"
          />
          <Button type="submit" variant="default" size="default">
            Search
          </Button>
        </form>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border mb-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Filter className="size-4 text-primary-500" />
            <span>Filters:</span>
          </div>

          <Select value={city} onValueChange={(val) => updateFilters("city", val)}>
            <SelectTrigger className="h-9 w-36 text-xs">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Dhaka">Dhaka</SelectItem>
              <SelectItem value="Chittagong">Chittagong</SelectItem>
              <SelectItem value="Sylhet">Sylhet</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(val) => updateFilters("type", val)}>
            <SelectTrigger className="h-9 w-44 text-xs">
              <SelectValue placeholder="All Property Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FLAT">Flat / Apartment</SelectItem>
              <SelectItem value="SUBLET">Sublet Master Bed</SelectItem>
              <SelectItem value="MESS">Bachelor Mess Seat</SelectItem>
            </SelectContent>
          </Select>

          {(query || (city && city !== "all") || (type && type !== "all")) && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => router.push("/properties")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-foreground">{totalCount}</span> live listings
        </div>
      </div>

      {/* Error state */}
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
            onClick={() => loadLiveProperties()}
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
      ) : properties.length === 0 ? (
        <EmptyState
          title="No properties found matching your search"
          description="Try clearing your filters or searching for another neighborhood in Dhaka or Chittagong."
          actionLabel="Clear Filters"
          onAction={() => router.push("/properties")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const images = getPropertyImages(property);
            const displayType =
              property.propertyType === "FLAT"
                ? "Apartment Flat"
                : property.propertyType === "SUBLET"
                ? "Master Sublet"
                : property.propertyType === "MESS"
                ? "Student Mess"
                : property.propertyType.replace("_", " ");

            return (
              <Card
                key={property.id}
                className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-0"
              >
                <div>
                  {/* Image Showcase */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant="tonal-blue"
                        size="xs"
                        className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                      >
                        {displayType}
                      </Badge>
                      {property.isAvailable ? (
                        <Badge
                          variant="tonal-emerald"
                          size="xs"
                          className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                        >
                          Available
                        </Badge>
                      ) : (
                        <Badge
                          variant="tonal-amber"
                          size="xs"
                          className="bg-white/95 dark:bg-slate-900/90 shadow-xs"
                        >
                          Occupied
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-black text-sm shadow-md">
                        ৳{property.rentAmount.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-300">/mo</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="size-3.5 text-primary-500 shrink-0" />
                      <span className="truncate">
                        {property.address}, {property.area}, {property.city}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {property.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <div className="flex items-center gap-1">
                        <Bed className="size-4 text-slate-400" />
                        <span>{property.bedrooms} Bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="size-4 text-slate-400" />
                        <span>{property.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <span>{property.landlord?.name?.split(" ")[0] || "Verified Host"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    href={`/properties/${property.id}`}
                    variant="default"
                    fullWidth
                    size="sm"
                  >
                    View Details & Book
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
              router.push(`/properties?${params.toString()}`);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container py-12 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Loader2 className="size-4 animate-spin text-primary-500" />
              <span>Loading MoveInBD properties...</span>
            </div>
          }
        >
          <PropertyListContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
