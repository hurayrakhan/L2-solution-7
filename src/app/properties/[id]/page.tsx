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
  Heart,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Property data mock matching ID
  const property = {
    id: params.id as string,
    title: "Luxury 3BHK Apartment with Balcony View",
    description:
      "Modern 3 bedroom south-facing apartment in the heart of Gulshan-2. Features marble floors, imported sanitary fittings, dedicated car parking space, 24/7 generator backup, and high-speed elevator access. Ideal for corporate families or high-profile professionals.",
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
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    ],
    amenities: [
      "24/7 Generator Backup",
      "Dedicated Car Parking",
      "High-speed Elevator (Lift)",
      "CCTV & Security Guard",
      "Wasa Water Connection",
      "Prepaid Gas Meter",
      "South-Facing Sunlight",
      "Waste Management Service",
    ],
    owner: {
      name: "Tariqul Islam (Owner)",
      email: "owner@moveinbd.com",
      phone: "+880 1711-223344",
      isVerified: true,
      memberSince: "2024",
    },
  };

  const handleInitiateRental = async (e: React.FormEvent) => {
    e.preventDefault();
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
    // Proceed to payment gateway simulation
    await new Promise((r) => setTimeout(r, 1000));
    setIsProcessing(false);
    setBookingModalOpen(false);

    toast.success("Rental request created! Redirecting to secure deposit payment...");
    router.push(`/payment/checkout?type=PROPERTY&id=${property.id}&amount=${property.depositAmount}&date=${movingDate}`);
  };

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
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Listing link copied!");
                }}
                leftIcon={<Share2 className="size-3.5" />}
              >
                Share
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden mb-8 border border-border">
            <div className="md:col-span-2 aspect-[16/10] bg-slate-100 overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-3">
              <div className="bg-slate-100 overflow-hidden">
                <img
                  src={property.images[1]}
                  alt="Property Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-slate-100 overflow-hidden">
                <img
                  src={property.images[2]}
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
                  <Badge variant="fill-blue" className="text-xs uppercase">
                    {property.propertyType}
                  </Badge>
                  <Badge variant="tonal-green" className="text-xs">
                    <ShieldCheck className="size-3 mr-1" /> NID Verified Property
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                  <MapPin className="size-4 text-primary-500 shrink-0" />
                  <span>{property.address}, {property.city}</span>
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
                    {property.sizeSqFt} sq. ft.
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">
                  About this Property
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">
                  Building & Unit Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
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
                  <Badge variant="tonal-green">Available Now</Badge>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-6">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="font-semibold text-foreground">৳{property.rentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit (Escrow):</span>
                    <span className="font-semibold text-foreground">৳{property.depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-slate-700 dark:text-slate-300 font-bold">
                    <span>Deposit Due Now:</span>
                    <span className="text-primary-600 dark:text-primary-400">৳{property.depositAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setBookingModalOpen(true)}
                  variant="default"
                  fullWidth
                  size="lg"
                  rightIcon={<CreditCard className="size-4" />}
                >
                  Rent with Escrow Protection
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
                      {property.owner.name}
                      <ShieldCheck className="size-3.5 text-emerald-500" />
                    </h4>
                    <span className="text-xs text-slate-400">Verified Landlord on MoveInBD</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-500 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-primary-500" />
                    <span>{property.owner.phone}</span>
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
              helperText="You will have 48 hours after moving to confirm keys and condition."
            />

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200">
              Advance deposit of <strong>৳{property.depositAmount.toLocaleString()}</strong> will be processed through Stripe / SSLCommerz and placed in protected escrow.
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
