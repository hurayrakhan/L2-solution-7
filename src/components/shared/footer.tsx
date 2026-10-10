"use client";

import Link from "next/link";
import { Home, Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-900 text-slate-300 mt-auto">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
                <Home className="size-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MoveIn<span className="text-primary-400">BD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bangladesh&apos;s unified portal for verified property rentals,
              roommate matching, house-shifting transport fleet, and automated mess
              utility splitting.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Properties & Rooms
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition-colors">
                  Moving Trucks & Fleet
                </Link>
              </li>
              <li>
                <Link href="/utilities" className="hover:text-white transition-colors">
                  Mess Utility Splitter
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing & Fees
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary-400 shrink-0" />
                <span>Gulshan-2, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 text-primary-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary-400 shrink-0" />
                <span>support@moveinbd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MoveInBD. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="size-3 text-red-500 fill-current" /> for Level 2 Assignment 7
          </p>
        </div>
      </div>
    </footer>
  );
}
