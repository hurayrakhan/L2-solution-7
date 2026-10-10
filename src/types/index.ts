export type UserRole = "TENANT_USER" | "PROVIDER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = "APARTMENT" | "SINGLE_ROOM" | "SHARED_ROOM" | "SUBLET" | "HOSTEL";

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  rentAmount: number;
  depositAmount?: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt?: number;
  isFurnished: boolean;
  address: string;
  city: string;
  area: string;
  images: string[];
  isAvailable: boolean;
  ownerId: string;
  owner?: User;
  createdAt: string;
  updatedAt: string;
}

export type VehicleType = "PICKUP_TRUCK" | "COVERED_VAN" | "OPEN_TRUCK" | "MICROBUS";

export interface Vehicle {
  id: string;
  title: string;
  model: string;
  licensePlate: string;
  vehicleType: VehicleType;
  capacityTon: number;
  baseFare: number;
  perKmRate: number;
  driverName?: string;
  driverPhone?: string;
  city: string;
  isAvailable: boolean;
  providerId: string;
  provider?: User;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookingType = "PROPERTY_RENTAL" | "HOUSE_SHIFTING" | "TRANSPORT";
export type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "REJECTED";

export interface Booking {
  id: string;
  bookingType: BookingType;
  status: BookingStatus;
  startDate?: string;
  endDate?: string;
  movingDate?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  totalAmount: number;
  notes?: string;
  userId: string;
  user?: User;
  propertyId?: string;
  property?: Property;
  vehicleId?: string;
  vehicle?: Vehicle;
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = "STRIPE" | "SSLCOMMERZ";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type EscrowStatus = "HELD" | "RELEASED" | "REFUNDED";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  escrowStatus: EscrowStatus;
  transactionId?: string;
  bookingId?: string;
  booking?: Booking;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface UtilityBill {
  id: string;
  title: string;
  billMonth: string;
  totalAmount: number;
  perTenantAmount: number;
  isPaidByAll: boolean;
  propertyId: string;
  property?: Property;
  creatorId: string;
  creator?: User;
  shares?: UtilityBillShare[];
  createdAt: string;
  updatedAt: string;
}

export interface UtilityBillShare {
  id: string;
  utilityBillId: string;
  tenantId: string;
  tenant?: User;
  amount: number;
  isPaid: boolean;
  paidAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProviders: number;
  totalProperties: number;
  totalVehicles: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings?: Booking[];
  monthlyRevenue?: { month: string; revenue: number; bookings: number }[];
}

export interface AuditLog {
  id: string;
  action: string;
  userId?: string;
  user?: User;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
