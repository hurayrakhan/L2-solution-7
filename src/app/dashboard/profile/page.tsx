"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { User, Mail, Phone, ShieldCheck, Save, Lock } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Phone number is required"),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function TenantProfilePage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "Tenant User",
      email: user?.email || "tenant@moveinbd.com",
      phone: user?.phone || "+880 1700-112233",
      bio: "Software engineer looking for quiet shared apartment in Dhaka.",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <DashboardLayout
      title="Profile & Account Settings"
      subtitle="Manage your personal details, verified phone number, and security preferences."
    >
      <div className="max-w-2xl space-y-6">
        <Card className="p-6 sm:p-8 border-border">
          <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription className="text-xs">
                Visible to landlords and fleet providers when reservations are made
              </CardDescription>
            </div>
            <Badge variant="tonal-green">
              <ShieldCheck className="size-3 mr-1" /> Active Member
            </Badge>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                isRequired
                leftIcon={<User className="size-4" />}
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                label="Email Address (Login Identity)"
                type="email"
                disabled
                helperText="Email cannot be changed directly for security reasons."
                leftIcon={<Mail className="size-4" />}
                {...register("email")}
              />

              <Input
                label="Primary Phone Number"
                isRequired
                leftIcon={<Phone className="size-4" />}
                error={errors.phone?.message}
                {...register("phone")}
              />

              <Button
                type="submit"
                variant="default"
                size="md"
                loading={isSaving}
                loadingText="Saving..."
                leftIcon={<Save className="size-4" />}
              >
                Save Profile Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Password Box */}
        <Card className="p-6 border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">Security & Password</CardTitle>
            <CardDescription className="text-xs">
              Keep your credentials updated to safeguard your escrow account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Lock className="size-4" />}
              onClick={() => toast.success("Password reset link sent to your email!")}
            >
              Request Password Reset Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
