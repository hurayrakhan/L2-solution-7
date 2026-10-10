"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Truck,
  Building,
  Split,
  LayoutDashboard,
  LogOut,
  LogIn,
  Menu,
  X,
  Shield,
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties", icon: Building },
    { href: "/vehicles", label: "House Shifting Fleet", icon: Truck },
    { href: "/utilities", label: "Mess Utilities", icon: Split },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const getDashboardHref = () => {
    if (!user) return "/dashboard";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "PROVIDER") return "/provider";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-sm">
            <Home className="size-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            MoveIn<span className="text-primary-500">BD</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary-500 ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400 font-bold"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth / CTA actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  user.role === "ADMIN"
                    ? "tonal-purple"
                    : user.role === "PROVIDER"
                    ? "tonal-green"
                    : "tonal-blue"
                }
                className="text-xs"
              >
                {user.role === "ADMIN" ? (
                  <Shield className="size-3 mr-1" />
                ) : null}
                {user.role}
              </Badge>

              <Button
                href={getDashboardHref()}
                size="sm"
                variant="default"
                leftIcon={<LayoutDashboard className="size-3.5" />}
              >
                Dashboard
              </Button>

              <Button
                onClick={logout}
                size="sm"
                variant="ghost"
                className="text-slate-500 hover:text-red-600"
                leftIcon={<LogOut className="size-3.5" />}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                href="/login"
                size="sm"
                variant="outline"
                leftIcon={<LogIn className="size-3.5" />}
              >
                Sign In
              </Button>
              <Button href="/register" size="sm" variant="default">
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold py-2 text-slate-700 dark:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border pt-4 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <Button
                  href={getDashboardHref()}
                  variant="default"
                  onClick={() => setMobileOpen(false)}
                >
                  Go to Dashboard ({user.role})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  href="/login"
                  variant="outline"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  href="/register"
                  variant="default"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
