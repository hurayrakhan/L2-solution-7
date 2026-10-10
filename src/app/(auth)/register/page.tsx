"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Home, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["TENANT_USER", "PROVIDER"] as const),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "TENANT_USER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    await registerUser(data);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 size-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 size-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 flex flex-col gap-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="size-10 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-md">
              <Home className="size-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              MoveIn<span className="text-primary-500">BD</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Join MoveInBD as a Tenant or Fleet/Property Provider
          </p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign Up Details</CardTitle>
            <CardDescription>
              Select your role and provide your account information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Role Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Your Role *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setValue("role", "TENANT_USER")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === "TENANT_USER"
                        ? "border-primary-500 bg-primary-50/50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-100 ring-2 ring-primary-500/20"
                        : "border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs">Tenant / Renter</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Find housing & book transport
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue("role", "PROVIDER")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === "PROVIDER"
                        ? "border-primary-500 bg-primary-50/50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-100 ring-2 ring-primary-500/20"
                        : "border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs">Provider / Landlord</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      List properties & vehicles
                    </div>
                  </button>
                </div>
              </div>

              <Input
                label="Full Name"
                placeholder="Rahim Ahmed"
                isRequired
                leftIcon={<User className="size-4" />}
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="rahim@example.com"
                isRequired
                leftIcon={<Mail className="size-4" />}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+880 1712 345678"
                leftIcon={<Phone className="size-4" />}
                error={errors.phone?.message}
                {...register("phone")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                isRequired
                leftIcon={<Lock className="size-4" />}
                error={errors.password?.message}
                {...register("password")}
              />

              <Button
                type="submit"
                variant="default"
                fullWidth
                size="lg"
                loading={isSubmitting}
                loadingText="Creating Account..."
                rightIcon={<ArrowRight className="size-4" />}
              >
                Register as {selectedRole === "PROVIDER" ? "Provider" : "Tenant"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary-500 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
