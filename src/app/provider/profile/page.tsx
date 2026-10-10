"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Save,
  Building,
  MapPin,
  CheckCircle,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/auth-context";

const providerProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Phone number required"),
  city: z.string().min(2, "Operating city is required"),
  nidNumber: z.string().min(10, "National ID number must be valid"),
});

type ProviderProfileFormData = z.infer<typeof providerProfileSchema>;

export default function ProviderProfilePage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [nightShiftingEnabled, setNightShiftingEnabled] = React.useState(true);
  const [instantBookingEnabled, setInstantBookingEnabled] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderProfileFormData>({
    resolver: zodResolver(providerProfileSchema),
    defaultValues: {
      businessName: "Tariqul Property Holdings & Shifting Ltd.",
      ownerName: user?.name || "Tariqul Islam (Owner)",
      email: user?.email || "owner@moveinbd.com",
      phone: "+880 1711-223344",
      city: "Dhaka",
      nidNumber: "1992269201827364",
    },
  });

  const onSubmit = async (data: ProviderProfileFormData) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success("Provider profile and operational rules saved successfully!");
  };

  return (
    <DashboardLayout
      title="Provider Profile & Operational Availability"
      subtitle="Configure your verified business details, emergency dispatch rules, and operating zones."
    >
      <div className="max-w-3xl space-y-8">
        {/* Verification Status Card */}
        <Card className="p-6 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  National ID Verified Provider
                  <Badge variant="fill-green" className="text-[10px]">VERIFIED</Badge>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  NID: <span className="font-mono font-bold">1992269201827364</span> — Verified by MoveInBD Admin
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Settings Form */}
        <Card className="p-6 sm:p-8 border-border">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-base">Business & Contact Details</CardTitle>
            <CardDescription className="text-xs">
              Displayed on public property listings and transport quotes
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Business / Agency Name"
                  isRequired
                  error={errors.businessName?.message}
                  {...register("businessName")}
                />

                <Input
                  label="Contact Person / Owner Name"
                  isRequired
                  error={errors.ownerName?.message}
                  {...register("ownerName")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  disabled
                  helperText="Managed by authentication service"
                  {...register("email")}
                />

                <Input
                  label="Emergency Hotline Phone"
                  isRequired
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Operating City"
                  isRequired
                  error={errors.city?.message}
                  {...register("city")}
                />

                <Input
                  label="National ID Number (NID)"
                  disabled
                  helperText="Locked once approved by Admin"
                  {...register("nidNumber")}
                />
              </div>

              {/* Operational Switches */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">
                      Accept Night House-Shifting Bookings
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Allow customers to schedule pickup trips between 8:00 PM and 5:00 AM
                    </p>
                  </div>
                  <Switch
                    checked={nightShiftingEnabled}
                    onCheckedChange={setNightShiftingEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">
                      Instant Deposit Auto-Confirmation
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Automatically accept reservations once payment escrow is confirmed
                    </p>
                  </div>
                  <Switch
                    checked={instantBookingEnabled}
                    onCheckedChange={setInstantBookingEnabled}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="default"
                  size="md"
                  loading={isSaving}
                  loadingText="Updating..."
                  leftIcon={<Save className="size-4" />}
                >
                  Save Provider Settings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
