import * as React from "react";
import { Badge } from "@/components/ui/badge";

export type EntityStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "AVAILABLE"
  | "RENTED"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"
  | "PAID"
  | "UNPAID"
  | "HELD"
  | "RELEASED"
  | "REFUNDED"
  | "VERIFIED"
  | "UNVERIFIED"
  | string;

export interface StatusBadgeProps {
  status: EntityStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status ? status.toUpperCase() : "UNKNOWN";

  switch (normalized) {
    case "ACTIVE":
    case "AVAILABLE":
    case "COMPLETED":
    case "PAID":
    case "RELEASED":
    case "VERIFIED":
      return (
        <Badge variant="tonal-green" dot dotColor="bg-emerald-500" className={className}>
          {normalized}
        </Badge>
      );

    case "PENDING":
    case "HELD":
    case "IN_TRANSIT":
    case "UNPAID":
    case "UNVERIFIED":
      return (
        <Badge variant="tonal-orange" dot dotColor="bg-orange-500" className={className}>
          {normalized}
        </Badge>
      );

    case "CONFIRMED":
    case "RENTED":
      return (
        <Badge variant="tonal-blue" dot dotColor="bg-blue-500" className={className}>
          {normalized}
        </Badge>
      );

    case "CANCELLED":
    case "REJECTED":
    case "REFUNDED":
      return (
        <Badge variant="tonal-red" dot dotColor="bg-red-500" className={className}>
          {normalized}
        </Badge>
      );

    default:
      return (
        <Badge variant="tonal-gray" className={className}>
          {normalized}
        </Badge>
      );
  }
}
