"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Home, Truck, Lock, Mail, ArrowRight } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeDemo, setActiveDemo] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    await login(data.email, data.password);
    setIsSubmitting(false);
  };

  const handleDemo = async (role: "ADMIN" | "TENANT_USER" | "PROVIDER") => {
    setActiveDemo(role);
    await demoLogin(role);
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-40 -right-40 size-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 flex flex-col gap-6">
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
            Welcome Back 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access your housing & logistics portal
          </p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In with Credentials</CardTitle>
            <CardDescription>
              Enter your email and password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                isRequired
                leftIcon={<Mail className="size-4" />}
                error={errors.email?.message}
                {...register("email")}
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
                loadingText="Signing In..."
                rightIcon={<ArrowRight className="size-4" />}
              >
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-slate-500 font-bold tracking-wider">
                  🚀 One-Click Demo Login
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                loading={activeDemo === "ADMIN"}
                onClick={() => handleDemo("ADMIN")}
                leftIcon={<Shield className="size-4 text-purple-600" />}
                className="justify-start text-xs border-purple-200 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              >
                Admin Demo
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                loading={activeDemo === "TENANT_USER"}
                onClick={() => handleDemo("TENANT_USER")}
                leftIcon={<Home className="size-4 text-blue-600" />}
                className="justify-start text-xs border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/40"
              >
                Tenant Demo
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                loading={activeDemo === "PROVIDER"}
                onClick={() => handleDemo("PROVIDER")}
                leftIcon={<Truck className="size-4 text-emerald-600" />}
                className="sm:col-span-2 justify-start text-xs border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                Provider (Owner / Logistics) Demo
              </Button>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-bold text-primary-500 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
