import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";

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
  size?: "xs" | "sm" | "default" | "md" | "lg";
  uppercase?: boolean;
}

export function StatusBadge({
  status,
  className,
  size = "sm",
  uppercase = false,
}: StatusBadgeProps) {
  const normalized = status ? status.toUpperCase().trim() : "UNKNOWN";

  const getStatusConfig = (): {
    variant: NonNullable<BadgeProps["variant"]>;
    label: string;
    dotColor?: string;
  } => {
    switch (normalized) {
      case "ACTIVE":
        return { variant: "tonal-green", label: "Active", dotColor: "bg-emerald-500" };
      case "AVAILABLE":
        return { variant: "tonal-green", label: "Available", dotColor: "bg-emerald-500" };
      case "COMPLETED":
        return { variant: "tonal-green", label: "Completed", dotColor: "bg-emerald-500" };
      case "PAID":
        return { variant: "tonal-green", label: "Paid", dotColor: "bg-emerald-500" };
      case "RELEASED":
        return { variant: "tonal-green", label: "Released", dotColor: "bg-emerald-500" };
      case "VERIFIED":
        return { variant: "tonal-green", label: "Verified", dotColor: "bg-emerald-500" };

      case "CONFIRMED":
        return { variant: "tonal-blue", label: "Confirmed", dotColor: "bg-blue-600" };
      case "RENTED":
        return { variant: "tonal-blue", label: "Rented", dotColor: "bg-blue-600" };

      case "IN_TRANSIT":
        return { variant: "tonal-orange", label: "In Transit", dotColor: "bg-orange-500" };
      case "PENDING":
        return { variant: "tonal-orange", label: "Pending", dotColor: "bg-orange-500" };
      case "HELD":
        return { variant: "tonal-orange", label: "In Escrow", dotColor: "bg-amber-500" };
      case "UNPAID":
        return { variant: "tonal-orange", label: "Unpaid", dotColor: "bg-orange-500" };
      case "UNVERIFIED":
        return { variant: "tonal-orange", label: "Unverified", dotColor: "bg-orange-500" };

      case "CANCELLED":
        return { variant: "tonal-red", label: "Cancelled", dotColor: "bg-red-500" };
      case "REJECTED":
        return { variant: "tonal-red", label: "Rejected", dotColor: "bg-red-500" };
      case "REFUNDED":
        return { variant: "tonal-red", label: "Refunded", dotColor: "bg-red-500" };

      default:
        return {
          variant: "tonal-gray",
          label: normalized
            .toLowerCase()
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          dotColor: "bg-slate-400",
        };
    }
  };

  const { variant, label, dotColor } = getStatusConfig();
  const displayLabel = uppercase ? label.toUpperCase() : label;

  return (
    <Badge
      variant={variant}
      dot
      size={size}
      dotClassName={dotColor}
      className={className}
    >
      {displayLabel}
    </Badge>
  );
}
