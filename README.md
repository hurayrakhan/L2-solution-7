# 🏠🚚 MoveInBD — Housing, Roommates & House-Shifting Logistics Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **MoveInBD** is a unified Next.js App Router fullstack frontend platform for property rentals, bachelor mess roommate finders, house-shifting fleet transport bookings, and automated mess utility bill splitting in Bangladesh.

---

## 🚀 Live Links & Repositories

- **Frontend Repository**: [https://github.com/hurayrakhan/L2-solution-7.git](https://github.com/hurayrakhan/L2-solution-7.git)
- **Backend Repository**: [https://github.com/hurayrakhan/L2-solution-6.git](https://github.com/hurayrakhan/L2-solution-6.git)
- **Backend Local API**: `http://localhost:8000/api/v1`

---

## 🔑 One-Click Demo Evaluation Credentials

The login page at `/login` features distinct **One-Click Demo Login** buttons for all 3 primary roles:

| Role | Email | Password | Primary Destination |
|---|---|---|---|
| **ADMIN** | `admin@moveinbd.com` | `AdminPass123!` | `/admin` |
| **PROVIDER** | `owner@moveinbd.com` | `OwnerPass123!` | `/provider` |
| **TENANT_USER** | `tenant@moveinbd.com` | `TenantPass123!` | `/dashboard` |

---

## 📋 Comprehensive 27 Pages Coverage

### 1. Public Pages (6)
- `/` — Modern landing page with interactive search, metrics counter, feature cards, and escrow guarantees.
- `/about` — Platform mission, vision, statistics, and core values.
- `/services` — Detailed breakdown of property rentals, shifting fleets, and mess utility management.
- `/pricing` — Transparent pricing plans for Tenants, Landlords, and Fleet Owners.
- `/contact` — Support and inquiry form with React Hook Form + Zod validation.
- `/utilities` — Interactive Mess Utility Splitter and per-roommate bill calculation suite.

### 2. Domain Listings & Detailed Views (4)
- `/properties` — Property & room search with real-time URL state synchronization (`?q=`, `?city=`, `?type=`, `?page=`).
- `/properties/[id]` — Property detail view with image gallery, amenities, NID verified landlord card, and escrow booking modal.
- `/vehicles` — House-shifting logistics fleet listings with capacity, base fare, and per-km pricing filters.
- `/vehicles/[id]` — Vehicle detail view with interactive distance fare estimator and shifting booking modal.

### 3. Authentication (2)
- `/login` — Sign in with email/password + One-Click Demo Login for all 3 roles.
- `/register` — Account registration with role selection (`TENANT_USER` vs. `PROVIDER`) and schema validation.

### 4. Admin Dashboard Suite (3)
- `/admin` — High-level platform analytics with **Recharts** (AreaChart for monthly revenue & BarChart for shifting volume) and live activity logs.
- `/admin/manage` — Full CRUD Resource Management table with status approvals (Approve, Suspend, Delete), category tabs, and search.
- `/admin/reports` — Provider National ID identity verification queue and immutable system audit trail.

### 5. Tenant / Customer Dashboard Suite (3)
- `/dashboard` — My Activity with active reservations, scheduled moving trips, and escrow deposit balance.
- `/dashboard/profile` — Profile and account settings form with React Hook Form + Zod validation.
- `/dashboard/payments` — Transaction history with escrow status tracking (`HELD` vs. `RELEASED`) and pending mess bills payment.

### 6. Provider / Fleet Owner Dashboard Suite (3)
- `/provider` — My Listings & Tasks with instant availability toggle (Mark Rented / Mark Available) and New Listing creation modal.
- `/provider/earnings` — Monthly earnings trend chart, payout history, and Bank / bKash withdrawal request workflow.
- `/provider/profile` — Business details, NID compliance verification status, and night-shifting operational switches.

### 7. Payment Integration Flow (3)
- `/payment/checkout` — Multi-gateway checkout gateway (Stripe & SSLCommerz test mode) with escrow policy terms.
- `/payment/success` — Transaction success redirect with unique reference ID and escrow status badge.
- `/payment/cancel` — Payment cancellation redirect with recovery options.

### 8. Shared & Utility (3)
- `/not-found` — Custom branded 404 page with navigation shortcuts.
- `/error` — Global error boundary with retry action.
- `/loading` — Full skeleton loader for data-fetching views.

---

## 🛠️ Tech Stack & Design System

- **Framework**: Next.js 16 (App Router with Turbopack), React 19, TypeScript
- **Styling**: Tailwind CSS v4 + Design Tokens in `globals.css` (chromatic color scales `primary-50` to `primary-600`, semantic containers, and responsive layouts)
- **Component Library**: shadcn/ui & Radix UI primitives
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod
- **Notifications**: React Hot Toast
- **Data Visualization**: Recharts
- **Payment Processing**: Stripe JS & SSLCommerz test mode
- **State & Route Security**: Next.js Proxy Middleware (`proxy.ts`) and AuthContext

---

## 💻 Local Setup & Execution

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hurayrakhan/L2-solution-7.git
   cd L2-solution-7
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment configuration into `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   The `.env.local` file contains:
   ```env
   # Backend API Base URL
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

   # Evaluation One-Click Demo Credentials
   NEXT_PUBLIC_DEMO_ADMIN_EMAIL=admin@moveinbd.com
   NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=AdminPass123!

   NEXT_PUBLIC_DEMO_PROVIDER_EMAIL=owner@moveinbd.com
   NEXT_PUBLIC_DEMO_PROVIDER_PASSWORD=OwnerPass123!

   NEXT_PUBLIC_DEMO_TENANT_EMAIL=tenant@moveinbd.com
   NEXT_PUBLIC_DEMO_TENANT_PASSWORD=TenantPass123!
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
