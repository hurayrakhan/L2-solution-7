"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Home, Truck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { ENV } from "@/config/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    setValue,
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
                <span className="bg-card px-3 text-slate-500 font-bold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary-500" />
                  One-Click Demo Login (.env loaded)
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Admin Card */}
              <div className="p-3 rounded-lg border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-purple-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {ENV.DEMO_ADMIN.label}
                    </span>
                    <Badge variant="tonal-purple" size="xs">ADMIN</Badge>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {ENV.DEMO_ADMIN.email}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setValue("email", ENV.DEMO_ADMIN.email);
                      setValue("password", ENV.DEMO_ADMIN.password);
                    }}
                    title="Fill form"
                    className="h-7 px-2 text-[10px]"
                  >
                    Autofill
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="xs"
                    loading={activeDemo === "ADMIN"}
                    onClick={() => handleDemo("ADMIN")}
                    className="h-7 px-2.5 text-[11px] bg-purple-600 hover:bg-purple-700 border-purple-600"
                  >
                    Login
                  </Button>
                </div>
              </div>

              {/* Provider Card */}
              <div className="p-3 rounded-lg border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Truck className="size-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {ENV.DEMO_PROVIDER.label}
                    </span>
                    <Badge variant="tonal-green" size="xs">PROVIDER</Badge>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {ENV.DEMO_PROVIDER.email}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setValue("email", ENV.DEMO_PROVIDER.email);
                      setValue("password", ENV.DEMO_PROVIDER.password);
                    }}
                    title="Fill form"
                    className="h-7 px-2 text-[10px]"
                  >
                    Autofill
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="xs"
                    loading={activeDemo === "PROVIDER"}
                    onClick={() => handleDemo("PROVIDER")}
                    className="h-7 px-2.5 text-[11px] bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                  >
                    Login
                  </Button>
                </div>
              </div>

              {/* Tenant Card */}
              <div className="p-3 rounded-lg border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {ENV.DEMO_TENANT.label}
                    </span>
                    <Badge variant="tonal-blue" size="xs">TENANT</Badge>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {ENV.DEMO_TENANT.email}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setValue("email", ENV.DEMO_TENANT.email);
                      setValue("password", ENV.DEMO_TENANT.password);
                    }}
                    title="Fill form"
                    className="h-7 px-2 text-[10px]"
                  >
                    Autofill
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="xs"
                    loading={activeDemo === "TENANT_USER"}
                    onClick={() => handleDemo("TENANT_USER")}
                    className="h-7 px-2.5 text-[11px]"
                  >
                    Login
                  </Button>
                </div>
              </div>
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
