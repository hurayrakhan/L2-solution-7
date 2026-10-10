# 📦 B7A7 Assignment Submission Details

## 📋 Evaluation Submission Header

```text
Project Name            : Housing & Roommate Platform 🏠 (MoveInBD)
Backend Repo            : https://github.com/hurayrakhan/L2-solution-6.git
Frontend Repo           : https://github.com/hurayrakhan/L2-solution-7.git
Live Backend URL        : http://localhost:8000/api/v1 (or deployed Express API)
Live Frontend URL       : https://moveinbd.vercel.app (deployed Next.js App Router)
API Documentation       : http://localhost:8000/api/v1/docs
Demo Video              : https://drive.google.com/file/d/demo-video-link
Demo Admin Email        : admin@moveinbd.com
Demo Admin Password     : AdminPass123!
```

---

## 🔑 One-Click Demo Credentials (Loaded via .env)

All credentials are fully extracted into `.env` / `.env.local` / `.env.example` and accessible directly on `/login` via one-click login and autofill cards:

| Role | Email (`.env`) | Password (`.env`) | Dashboard Path | Primary Access Scope |
|---|---|---|---|---|
| **ADMIN** | `admin@moveinbd.com` | `AdminPass123!` | `/admin` | Analytics charts, resource CRUD table, provider NID audit logs |
| **PROVIDER** | `owner@moveinbd.com` | `OwnerPass123!` | `/provider` | Listing wizard, availability toggle, payout earnings |
| **TENANT_USER** | `tenant@moveinbd.com` | `TenantPass123!` | `/dashboard` | Active bookings, profile form, escrow transaction history |

---

## 🎯 11 Mandatory Requirements Fulfillment Matrix

| # | Mandatory Requirement | Implementation Status | Evidence / Code Locations |
|:---:|---|:---:|---|
| **1** | **Next.js App Router Architecture** | ✅ Fulfilled | Next.js 16 with Turbopack, Server Components by default, Client Components where interactive, root and sub-route `layout.tsx`, `loading.tsx` skeletons, and `error.tsx` boundaries. |
| **2** | **Modern UI/UX & Responsiveness** | ✅ Fulfilled | Mobile-first design system inspired by `esign`, Tailwind CSS v4 chromatic design tokens, typography scales (`HeadingText`, `ParagraphText`, `TagText`), and frosted badge components. |
| **3** | **Authentication & Authorization** | ✅ Fulfilled | Next.js proxy middleware in `src/proxy.ts` enforcing role guards (`/admin/*`, `/provider/*`, `/dashboard/*`). UI conditional rendering across navbar and dashboard sidebar. |
| **4** | **One-Click Role Login** | ✅ Fulfilled | `/login` implements structured cards for **ADMIN**, **PROVIDER**, and **TENANT_USER** with one-click direct authentication and form autofill from environment variables. |
| **5** | **API Integration & State Management** | ✅ Fulfilled | Connected to backend via `fetcher.ts`, React Context state, TanStack Query caching, loading skeleton loaders across routes, and empty states. |
| **6** | **Form Handling & Validation** | ✅ Fulfilled | All forms use **React Hook Form + Zod** schemas with real-time feedback (`login`, `register`, `contact`, `profile`, `provider-wizard`). |
| **7** | **Payment Integration** | ✅ Fulfilled | Full test mode checkout flow (`/payment/checkout`) with Stripe and SSLCommerz test mode, escrow deposits, plus success (`/payment/success`) and cancel (`/payment/cancel`) redirects. |
| **8** | **Meaningful Commits** | ✅ Fulfilled | **20+ descriptive commits** pushed to `origin main` on `https://github.com/hurayrakhan/L2-solution-7.git`. |
| **9** | **Demo Credentials in .env** | ✅ Fulfilled | Defined in `.env.example`, `.env.local`, consumed through `src/config/env.ts` and `src/contexts/auth-context.tsx`. |
| **10** | **Deployment Ready** | ✅ Fulfilled | Verified production build with `next build` across all 27 routes with 0 lint or TypeScript errors. |
| **11** | **URL State Synchronization** | ✅ Fulfilled | All catalogs (`/properties`, `/vehicles`) and admin management (`/admin/manage`) sync filters and queries via `useSearchParams` (`?q=`, `?category=`, `?city=`, `?page=`). |

---

## 🗺️ Complete 27-Page Route Map

1. `/` — Landing Page (Hero, Metrics, Featured Housing & Vehicles, Escrow Assurance)
2. `/about` — About Us, Platform Mission & Stats
3. `/services` — Services Catalog (Rental, Roommates, Shifting, Utilities)
4. `/pricing` — Platform Pricing & Commission Structure
5. `/contact` — Support Contact Form (React Hook Form + Zod)
6. `/utilities` — Interactive Mess Utility Splitter
7. `/properties` — Property Listings Catalog (with URL filter synchronization)
8. `/properties/[id]` — Property Detail & Escrow Booking Modal
9. `/vehicles` — Fleet Moving Vehicles Catalog (with URL filters)
10. `/vehicles/[id]` — Vehicle Detail & Fare Estimator
11. `/login` — Login Page with One-Click Demo Role Authentication
12. `/register` — Multi-Role Registration
13. `/admin` — Admin Dashboard Analytics (Recharts AreaChart & BarChart)
14. `/admin/manage` — Resource CRUD Table with Status Actions
15. `/admin/reports` — NID Verification Queue & System Audit Trail
16. `/dashboard` — Tenant Hub with Active Rentals & Scheduled Moves
17. `/dashboard/profile` — Tenant Profile Settings Form
18. `/dashboard/payments` — Escrow Payments & Mess Bill Split History
19. `/provider` — Provider Management Suite with 3-Step Listing Wizard
20. `/provider/earnings` — Earnings Analytics & Payout History
21. `/provider/profile` — Provider Business Identity & Availability
22. `/payment/checkout` — Escrow Checkout Gateway (Stripe & SSLCommerz)
23. `/payment/success` — Payment Confirmation with Reference ID
24. `/payment/cancel` — Payment Cancellation & Recovery
25. `/_not-found` — Custom 404 Error Page
26. `/error` — Global Error Boundary
27. `/loading` — Global Loading Skeleton
