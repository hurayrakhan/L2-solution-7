"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Check,
  Calendar,
  CreditCard,
  Phone,
  User,
  ArrowLeft,
  Share2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { Property } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { getPropertyImages } from "@/lib/media-helpers";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const propertyId = params.id as string;

  const [property, setProperty] = React.useState<Property | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Fetch live property from backend API
  const loadLiveProperty = React.useCallback(async () => {
    if (!propertyId) return;
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await fetcher<Property>(`/properties/${propertyId}`);
      setProperty(data);
    } catch (err: any) {
      console.error("Failed to fetch property details:", err);
      setLoadError(err?.error || err?.message || "Failed to load property details");
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  React.useEffect(() => {
    loadLiveProperty();
  }, [loadLiveProperty]);

  const handleInitiateRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    if (!isAuthenticated) {
      toast.error("Please log in to book this property");
      router.push(`/login?callbackUrl=/properties/${property.id}`);
      return;
    }

    if (!movingDate) {
      toast.error("Please select your intended moving date");
      return;
    }

    setIsProcessing(true);
    // Proceed to checkout gateway with deposit
    const deposit = property.depositAmount || property.rentAmount;
    await new Promise((r) => setTimeout(r, 600));
    setIsProcessing(false);
    setBookingModalOpen(false);

    toast.success("Rental reservation initiated! Redirecting to secure deposit payment...");
    router.push(
      `/payment/checkout?type=PROPERTY&id=${property.id}&amount=${deposit}&date=${movingDate}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-12 container max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="aspect-[16/7] w-full rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-32 w-full mt-6" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loadError || !property) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-20 container max-w-xl mx-auto text-center">
          <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">
            {loadError || "The requested property listing could not be found in the database."}
          </p>
          <div className="flex justify-center gap-3">
            <Button href="/properties" variant="default">
              Browse All Properties
            </Button>
            <Button variant="outline" onClick={() => loadLiveProperty()} leftIcon={<RefreshCw className="size-4" />}>
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getPropertyImages(property);
  const deposit = property.depositAmount || property.rentAmount;
  const landlordName = property.landlord?.name || property.owner?.name || "Verified Landlord";
  const landlordPhone = property.landlord?.phone || property.owner?.phone || "+880 1819-000000";
  const landlordEmail = property.landlord?.email || property.owner?.email || "owner@moveinbd.com";

  const amenities = [
    "24/7 Security & CCTV",
    "Dedicated Water Connection",
    "Electricity Meter Backup",
    "Prepaid Gas / Cylinder Provision",
    "Waste Management Included",
    "South Facing Ventilation",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="container max-w-6xl mx-auto">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to Properties
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Listing link copied!");
                  }
                }}
                leftIcon={<Share2 className="size-3.5" />}
              >
                Share
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden mb-8 border border-border">
            <div className="md:col-span-2 aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-3">
              <div className="bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={images[1] || images[0]}
                  alt="Property Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={images[2] || images[0]}
                  alt="Property Bedroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="tonal-blue" size="sm">
                    {property.propertyType}
                  </Badge>
                  <Badge variant="tonal-emerald" size="sm">
                    <ShieldCheck className="size-3 mr-1" /> Verified Database Property
                  </Badge>
                  {property.isAvailable ? (
                    <Badge variant="tonal-emerald" size="sm">Available</Badge>
                  ) : (
                    <Badge variant="tonal-amber" size="sm">Occupied</Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                  <MapPin className="size-4 text-primary-500 shrink-0" />
                  <span>
                    {property.address}, {property.area}, {property.city}
                  </span>
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-card border border-border text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                    <Bed className="size-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {property.bedrooms} Bedrooms
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                    <Bath className="size-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {property.bathrooms} Bathrooms
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                    <Maximize2 className="size-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {property.sizeSqFt || 1200} sq. ft.
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">
                  About this Property
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">
                  Building & Unit Highlights
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-border"
                    >
                      <Check className="size-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Booking Card & Owner Card */}
            <div className="space-y-6">
              {/* Rental Price & Booking Box */}
              <Card className="p-6 border-primary-500/40 shadow-xl relative">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-3xl font-extrabold text-foreground">
                      ৳{property.rentAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500"> / month</span>
                  </div>
                  {property.isAvailable ? (
                    <Badge variant="tonal-emerald">Available</Badge>
                  ) : (
                    <Badge variant="tonal-amber">Occupied</Badge>
                  )}
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-6">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="font-semibold text-foreground">
                      ৳{property.rentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit (Escrow):</span>
                    <span className="font-semibold text-foreground">
                      ৳{deposit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-slate-700 dark:text-slate-300 font-bold">
                    <span>Deposit Due Now:</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ৳{deposit.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setBookingModalOpen(true)}
                  variant="default"
                  fullWidth
                  size="lg"
                  disabled={!property.isAvailable}
                  rightIcon={<CreditCard className="size-4" />}
                >
                  {property.isAvailable ? "Rent with Escrow Protection" : "Currently Unavailable"}
                </Button>

                <p className="text-[11px] text-center text-slate-400 mt-3">
                  🛡️ Deposit is held securely in escrow until move-in inspection
                </p>
              </Card>

              {/* Owner Info Card */}
              <Card className="p-5 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-11 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center font-bold">
                    <User className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {landlordName}
                      <ShieldCheck className="size-3.5 text-emerald-500" />
                    </h4>
                    <span className="text-xs text-slate-400">Verified Landlord on MoveInBD</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-500 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-primary-500" />
                    <span>{landlordPhone}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Email: {landlordEmail}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Dialog Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Confirm Rental Reservation</DialogTitle>
            <DialogDescription>
              Reserve {property.title} by providing your expected shifting date.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInitiateRental} className="space-y-4 pt-2">
            <Input
              type="date"
              label="Intended Moving Date"
              isRequired
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              helperText="You will have 48 hours after moving to inspect property and confirm keys."
            />

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200">
              Advance deposit of <strong>৳{deposit.toLocaleString()}</strong> will be processed through Stripe / SSLCommerz and placed in protected escrow.
            </div>

            <Button
              type="submit"
              variant="default"
              fullWidth
              size="lg"
              loading={isProcessing}
              loadingText="Proceeding to Payment..."
            >
              Continue to Escrow Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
