/**
 * Application environment configuration
 * Evaluator credentials and API endpoints are loaded from environment variables
 */

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://l2-solution-6.vercel.app/api/v1",
  
  // Evaluation One-Click Demo Credentials
  DEMO_ADMIN: {
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@moveinbd.com",
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "AdminPass123!",
    role: "ADMIN" as const,
    label: "Admin Portal",
    description: "System supervisor, audit log viewer & KYC approval",
  },
  
  DEMO_PROVIDER: {
    email: process.env.NEXT_PUBLIC_DEMO_PROVIDER_EMAIL || "owner@moveinbd.com",
    password: process.env.NEXT_PUBLIC_DEMO_PROVIDER_PASSWORD || "OwnerPass123!",
    role: "PROVIDER" as const,
    label: "Provider Suite",
    description: "Property owner, roommate manager & vehicle fleet operator",
  },
  
  DEMO_TENANT: {
    email: process.env.NEXT_PUBLIC_DEMO_TENANT_EMAIL || "tenant@moveinbd.com",
    password: process.env.NEXT_PUBLIC_DEMO_TENANT_PASSWORD || "TenantPass123!",
    role: "TENANT_USER" as const,
    label: "Tenant Hub",
    description: "Verified renter, escrow depositor & shifting client",
  },
} as const;
