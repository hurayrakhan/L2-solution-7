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
import { Property, PropertyType } from "@/types";

// Real sample property data matching MoveInBD backend seed
const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Luxury 3BHK Apartment with Balcony View",
    description: "Spacious south-facing apartment in prime Gulshan. Marble floors, modern fittings, and 24/7 generator backup.",
    propertyType: "APARTMENT",
    rentAmount: 45000,
    depositAmount: 90000,
    bedrooms: 3,
    bathrooms: 3,
    sizeSqFt: 1850,
    isFurnished: true,
    address: "Road 45, Gulshan-2",
    city: "Dhaka",
    area: "Gulshan",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-1",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "prop-2",
    title: "Master Bed Sublet with Attached Bath & Balcony",
    description: "Quiet and secure master bedroom in Dhanmondi suitable for female or male corporate jobholders. High-speed Wi-Fi included.",
    propertyType: "SUBLET",
    rentAmount: 14000,
    depositAmount: 14000,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 220,
    isFurnished: true,
    address: "Road 8/A, Dhanmondi",
    city: "Dhaka",
    area: "Dhanmondi",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-1",
    createdAt: "2026-03-02T10:00:00Z",
    updatedAt: "2026-03-02T10:00:00Z",
  },
  {
    id: "prop-3",
    title: "Student Bachelor Shared Seat in Modern Mess",
    description: "Shared seat in a 2-person room near AIUB and BRAC University. Meal system, maid service, and electricity included.",
    propertyType: "SHARED_ROOM",
    rentAmount: 5500,
    depositAmount: 5500,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 140,
    isFurnished: true,
    address: "Block D, Bashundhara R/A",
    city: "Dhaka",
    area: "Bashundhara",
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-2",
    createdAt: "2026-03-03T10:00:00Z",
    updatedAt: "2026-03-03T10:00:00Z",
  },
  {
    id: "prop-4",
    title: "Furnished Single Room Studio for IT Professional",
    description: "Independent single room with mini-pantry and attached washroom. Private entrance and lift access.",
    propertyType: "SINGLE_ROOM",
    rentAmount: 11000,
    depositAmount: 15000,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 280,
    isFurnished: true,
    address: "Sector 11, Uttara",
    city: "Dhaka",
    area: "Uttara",
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-1",
    createdAt: "2026-03-04T10:00:00Z",
    updatedAt: "2026-03-04T10:00:00Z",
  },
  {
    id: "prop-5",
    title: "Chittagong Nasirabad 2BHK Family Flat",
    description: "Quiet residential location near GEC Circle. Ample natural light, car parking slot, and lift facility.",
    propertyType: "APARTMENT",
    rentAmount: 22000,
    depositAmount: 44000,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqFt: 1200,
    isFurnished: false,
    address: "Nasirabad Housing Society",
    city: "Chittagong",
    area: "GEC",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-3",
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-03-05T10:00:00Z",
  },
  {
    id: "prop-6",
    title: "Executive Hostel Seat for University Students",
    description: "Clean executive hostel with 3 daily home-cooked meals, generator backup, and high-speed fiber internet.",
    propertyType: "HOSTEL",
    rentAmount: 7500,
    depositAmount: 7500,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 120,
    isFurnished: true,
    address: "Mirpur 10, Near Metro Station",
    city: "Dhaka",
    area: "Mirpur",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"],
    isAvailable: true,
    ownerId: "owner-2",
    createdAt: "2026-03-06T10:00:00Z",
    updatedAt: "2026-03-06T10:00:00Z",
  },
];

function PropertyListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "all";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortBy = searchParams.get("sort") || "latest";

  const [searchInput, setSearchInput] = React.useState(query);

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

  const filteredProperties = INITIAL_PROPERTIES.filter((prop) => {
    const matchesQuery =
      !query ||
      prop.title.toLowerCase().includes(query.toLowerCase()) ||
      prop.area.toLowerCase().includes(query.toLowerCase()) ||
      prop.description.toLowerCase().includes(query.toLowerCase());

    const matchesCity = city === "all" || prop.city.toLowerCase() === city.toLowerCase();
    const matchesType = type === "all" || prop.propertyType === type;

    return matchesQuery && matchesCity && matchesType;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentList = filteredProperties.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="container py-8 sm:py-12">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <Badge variant="tonal-blue" className="mb-2">
            Verified Listings
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Explore Properties & Rooms in Bangladesh
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Browse verified flats, single rooms, sublets, and hostels with transparent rental contracts.
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
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(val) => updateFilters("type", val)}>
            <SelectTrigger className="h-9 w-40 text-xs">
              <SelectValue placeholder="All Property Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="APARTMENT">Apartments</SelectItem>
              <SelectItem value="SUBLET">Sublets</SelectItem>
              <SelectItem value="SINGLE_ROOM">Single Rooms</SelectItem>
              <SelectItem value="SHARED_ROOM">Shared Rooms</SelectItem>
              <SelectItem value="HOSTEL">Hostels</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-foreground">{filteredProperties.length}</span> properties
        </div>
      </div>

      {/* Listing Cards */}
      {currentList.length === 0 ? (
        <EmptyState
          title="No properties found matching your search"
          description="Try clearing your filters or searching for another neighborhood in Dhaka or Chittagong."
          actionLabel="Clear Filters"
          onAction={() => router.push("/properties")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-0"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="tonal-blue" size="xs" className="bg-white/95 dark:bg-slate-900/90 shadow-sm">
                      {property.propertyType.replace("_", " ")}
                    </Badge>
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
                    <span className="truncate">{property.address}, {property.city}</span>
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
                    {property.sizeSqFt && (
                      <div className="flex items-center gap-1">
                        <Maximize2 className="size-4 text-slate-400" />
                        <span>{property.sizeSqFt} sqft</span>
                      </div>
                    )}
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
          ))}
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
        <Suspense fallback={<div className="container py-12 text-center text-sm">Loading properties...</div>}>
          <PropertyListContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
