import * as z from "zod";

/**
 * Centralized Zod Validation Schemas
 * Synchronized with B7A6 Backend DTO validation rules
 */

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
  role: z.enum(["TENANT_USER", "PROVIDER"] as const),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional(),
});

export const listingWizardSchema = z.object({
  category: z.enum(["PROPERTY", "VEHICLE"] as const),
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(3, "Location area is required"),
  rate: z.string().min(2, "Rate / Rent amount is required"),
  deposit: z.string().optional(),
  specs: z.string().optional(),
  agreedTerms: z.literal(true, {
    message: "You must accept platform escrow terms",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ListingWizardInput = z.infer<typeof listingWizardSchema>;
