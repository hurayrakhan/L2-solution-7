"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Truck,
  MapPin,
  Weight,
  DollarSign,
  Phone,
  ShieldCheck,
  Check,
  Calendar,
  CreditCard,
  ArrowLeft,
  Navigation,
  Calculator,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import { Vehicle } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { getVehicleImages } from "@/lib/media-helpers";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const [pickupAddress, setPickupAddress] = React.useState("");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [estimatedKm, setEstimatedKm] = React.useState<number>(15);
  const [movingDate, setMovingDate] = React.useState("");
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Fetch live vehicle from backend API
  const loadLiveVehicle = React.useCallback(async () => {
    if (!vehicleId) return;
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await fetcher<Vehicle>(`/vehicles/${vehicleId}`);
      setVehicle(data);
    } catch (err: any) {
      console.error("Failed to fetch vehicle details:", err);
      setLoadError(err?.error || err?.message || "Failed to load vehicle details");
    } finally {
      setIsLoading(false);
    }
  }, [vehicleId]);

  React.useEffect(() => {
    loadLiveVehicle();
  }, [loadLiveVehicle]);

  const baseFare = vehicle?.hourlyRate || vehicle?.baseFare || 1200;
  const perKmRate = vehicle?.perKmRate || 50;
  const calculatedTotal = baseFare + estimatedKm * perKmRate;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;

    if (!isAuthenticated) {
      toast.error("Please log in to complete your vehicle booking");
      router.push(`/login?callbackUrl=/vehicles/${vehicle.id}`);
      return;
    }

    if (!pickupAddress || !deliveryAddress || !movingDate) {
      toast.error("Please provide pickup address, delivery address, and date");
      return;
    }

    setIsProcessing(true);
    let createdBookingId: string | null = null;

    try {
      // Create live booking record in backend database
      const bookingRes = await fetcher<any>("/bookings", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: vehicle.id,
          bookingType: "HOUSE_SHIFTING",
          pickupAddress: pickupAddress.trim(),
          dropoffAddress: deliveryAddress.trim(),
          shiftingDate: movingDate,
          laborCount: 2,
          totalAmount: calculatedTotal,
        }),
      });

      if (bookingRes?.id) {
        createdBookingId = bookingRes.id;
      }
      toast.success("Live shifting reservation created in database!");
    } catch (apiErr: any) {
      console.warn("Backend booking API note:", apiErr);
      // Fallback smoothly if session expired
    } finally {
      setIsProcessing(false);
      setBookingModalOpen(false);
    }

    router.push(
      `/payment/checkout?type=VEHICLE&id=${vehicle.id}&amount=${calculatedTotal}&bookingId=${createdBookingId || ""}&pickup=${encodeURIComponent(
        pickupAddress
      )}&delivery=${encodeURIComponent(deliveryAddress)}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-12 container max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="aspect-[16/7] w-full rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-40 w-full mt-6" />
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

  if (loadError || !vehicle) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-20 container max-w-xl mx-auto text-center">
          <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Vehicle Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">
            {loadError || "The requested fleet vehicle could not be found in the database."}
          </p>
          <div className="flex justify-center gap-3">
            <Button href="/vehicles" variant="default">
              Browse All Fleets
            </Button>
            <Button
              variant="outline"
              onClick={() => loadLiveVehicle()}
              leftIcon={<RefreshCw className="size-4" />}
            >
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getVehicleImages(vehicle);
  const driverName = vehicle.driverName || vehicle.owner?.name || "Assigned MoveInBD Captain";
  const driverPhone = vehicle.driverPhone || vehicle.owner?.phone || "+880 1819-000000";

  const features = [
    "GPS live tracking & dispatched trip verification",
    "Heavy-duty ratchet tie-down straps & waterproof tarp",
    "Accommodates full 1-3 room furniture & home electronics",
    "Available for day & night schedule shifts",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="container max-w-5xl mx-auto">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-foreground mb-6"
          >
            <ArrowLeft className="size-4" /> Back to Moving Fleets
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details & Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border">
                <img
                  src={images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="tonal-green" size="sm">
                    {vehicle.vehicleType.replace("_", " ")}
                  </Badge>
                  <Badge variant="tonal-blue" size="sm">
                    <ShieldCheck className="size-3 mr-1" /> BRTA Registered & Verified
                  </Badge>
                  {vehicle.isAvailable ? (
                    <Badge variant="tonal-emerald" size="sm">Available</Badge>
                  ) : (
                    <Badge variant="tonal-amber" size="sm">On Trip</Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {vehicle.title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  License Plate: {vehicle.licensePlate} • Based in {vehicle.city || "Dhaka"}
                </p>
              </div>

              {/* Fare Calculator Card */}
              <Card className="p-6 border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="size-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-foreground">
                    Interactive Shifting Fare Estimator
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Estimated Shifting Distance:{" "}
                      <span className="text-emerald-600 font-bold">{estimatedKm} km</span>
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={80}
                      value={estimatedKm}
                      onChange={(e) => setEstimatedKm(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>3 km (Local)</span>
                      <span>40 km (Cross-city)</span>
                      <span>80 km (Intercity)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Estimated Fare:</span>
                      <span className="text-2xl font-black text-emerald-600">
                        ৳{calculatedTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <div>Base Fare: ৳{baseFare}</div>
                      <div>
                        Distance: {estimatedKm}km × ৳{perKmRate}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Features */}
              <Card className="p-6 border-border">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  Vehicle Highlights & Safety Features
                </h3>
                <div className="space-y-2">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <Check className="size-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Col: Driver & Booking Button */}
            <div className="space-y-6">
              <Card className="p-6 border-emerald-500/40 shadow-xl">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Ready to Book This Vehicle?
                </h3>

                <div className="space-y-3 mb-6 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Payload Capacity:</span>
                    <span className="font-bold text-foreground">
                      {vehicle.capacity || "1.5 Tons"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Hourly Fare:</span>
                    <span className="font-bold text-foreground">৳{baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Per Km:</span>
                    <span className="font-bold text-foreground">৳{perKmRate}/km</span>
                  </div>
                </div>

                <Button
                  onClick={() => setBookingModalOpen(true)}
                  variant="default"
                  fullWidth
                  size="lg"
                  disabled={!vehicle.isAvailable}
                  rightIcon={<Truck className="size-4" />}
                >
                  {vehicle.isAvailable ? "Book Pickup Now" : "Currently on Trip"}
                </Button>
              </Card>

              <Card className="p-5 border-border">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Assigned Driver Contact
                </h4>
                <div className="text-sm font-bold text-foreground">{driverName}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Phone className="size-3.5 text-emerald-500" />
                  <span>{driverPhone}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Form Dialog */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Book Shifting Transport</DialogTitle>
            <DialogDescription>
              Enter shifting locations to confirm dispatch and proceed to checkout.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
            <Input
              label="Pickup Location / Address"
              placeholder="e.g. House 12, Road 4, Dhanmondi"
              isRequired
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />

            <Input
              label="Delivery / Destination Address"
              placeholder="e.g. Block C, Bashundhara R/A"
              isRequired
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />

            <Input
              type="date"
              label="Moving Date"
              isRequired
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
            />

            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-200">
              Estimated Total: <strong>৳{calculatedTotal.toLocaleString()}</strong>. Held safely in escrow until delivery is signed off.
            </div>

            <Button
              type="submit"
              variant="default"
              fullWidth
              size="lg"
              loading={isProcessing}
              loadingText="Creating Booking in Database..."
            >
              Confirm & Pay with Escrow
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
