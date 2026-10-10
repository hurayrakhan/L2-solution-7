"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Truck,
  Split,
  CreditCard,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  FileText,
  DollarSign,
  Menu,
  X,
  Home,
  CheckCircle,
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Define nav links based on role
  const getNavLinks = () => {
    if (role === "ADMIN") {
      return [
        { href: "/admin", label: "Overview & Analytics", icon: LayoutDashboard },
        { href: "/admin/manage", label: "Resource Management", icon: Building },
        { href: "/admin/reports", label: "Audit & Verifications", icon: ShieldCheck },
      ];
    }
    if (role === "PROVIDER") {
      return [
        { href: "/provider", label: "My Listings & Fleet", icon: Building },
        { href: "/provider/earnings", label: "Earnings & Analytics", icon: DollarSign },
        { href: "/provider/profile", label: "Provider Profile", icon: User },
      ];
    }
    // Default TENANT_USER
    return [
      { href: "/dashboard", label: "My Bookings & Rentals", icon: LayoutDashboard },
      { href: "/dashboard/payments", label: "Payments & Mess Bills", icon: CreditCard },
      { href: "/dashboard/profile", label: "Profile & Settings", icon: User },
    ];
  };

  const navLinks = getNavLinks();

  const getRoleBadge = () => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="tonal-purple" size="xs">Admin Portal</Badge>;
      case "PROVIDER":
        return <Badge variant="tonal-green" size="xs">Provider Suite</Badge>;
      default:
        return <Badge variant="tonal-blue" size="xs">Tenant Hub</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
            <Home className="size-4" />
          </div>
          <span className="font-bold text-base text-foreground">MoveInBD</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Dashboard Sidebar"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border p-5 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-sm">
                <Home className="size-5" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                MoveIn<span className="text-primary-500">BD</span>
              </span>
            </Link>
          </div>

          {/* User profile card */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border mb-6">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold text-xs">
                {user?.name?.[0] || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground truncate">
                  {user?.name || "User"}
                </h4>
                <div className="mt-0.5">{getRoleBadge()}</div>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary-500 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-foreground"
          >
            <Home className="size-4" />
            <span>Public Home</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="size-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </header>

        {children}
      </main>
    </div>
  );
}
