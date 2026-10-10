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
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [pickupAddress, setPickupAddress] = React.useState("");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [estimatedKm, setEstimatedKm] = React.useState<number>(15);
  const [movingDate, setMovingDate] = React.useState("");
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const vehicle = {
    id: params.id as string,
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
    images: [
      "https://images.unsplash.com/photo-1586191582056-a19280f97063?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Sturdy tie-down ropes & waterproof tarpaulin cover",
      "Available for night shifting (post 8 PM)",
      "Accommodates up to 1-2 room furniture",
      "Real-time GPS dispatch & trip verification",
    ],
  };

  const calculatedTotal = vehicle.baseFare + estimatedKm * vehicle.perKmRate;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    await new Promise((r) => setTimeout(r, 900));
    setIsProcessing(false);
    setBookingModalOpen(false);

    toast.success("Shifting booking created! Redirecting to checkout...");
    router.push(
      `/payment/checkout?type=VEHICLE&id=${vehicle.id}&amount=${calculatedTotal}&pickup=${encodeURIComponent(pickupAddress)}&delivery=${encodeURIComponent(deliveryAddress)}`
    );
  };

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
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-border">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="fill-green">
                    {vehicle.vehicleType.replace("_", " ")}
                  </Badge>
                  <Badge variant="tonal-blue">
                    <ShieldCheck className="size-3 mr-1" /> BRTA Registered & Verified
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {vehicle.title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  License: {vehicle.licensePlate} • Based in {vehicle.city}
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
                      Estimated Distance: <span className="text-emerald-600 font-bold">{estimatedKm} km</span>
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
                      <div>Base: ৳{vehicle.baseFare}</div>
                      <div>Distance: {estimatedKm}km × ৳{vehicle.perKmRate}</div>
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
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
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
                    <span>Capacity:</span>
                    <span className="font-bold text-foreground">{vehicle.capacityTon} Ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Fare:</span>
                    <span className="font-bold text-foreground">৳{vehicle.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Per Km:</span>
                    <span className="font-bold text-foreground">৳{vehicle.perKmRate}/km</span>
                  </div>
                </div>

                <Button
                  onClick={() => setBookingModalOpen(true)}
                  variant="default"
                  fullWidth
                  size="lg"
                  rightIcon={<Truck className="size-4" />}
                >
                  Book Pickup Now
                </Button>
              </Card>

              <Card className="p-5 border-border">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Assigned Driver Contact
                </h4>
                <div className="text-sm font-bold text-foreground">
                  {vehicle.driverName}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Phone className="size-3.5 text-emerald-500" />
                  <span>{vehicle.driverPhone}</span>
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
              loadingText="Creating Booking..."
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
