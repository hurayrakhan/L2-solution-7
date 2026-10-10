/**
 * Media and image fallback helpers for entities in MoveInBD
 * Prisma models store verified property/vehicle metadata, while rich photography
 * is provided with contextual architectural fallbacks if images array is null/empty.
 */

export function getPropertyImages(prop?: {
  id?: string;
  propertyType?: string;
  images?: string[];
}): string[] {
  if (prop?.images && prop.images.length > 0) {
    return prop.images;
  }

  const type = prop?.propertyType?.toUpperCase() || "";

  if (type === "MESS" || type === "SHARED_ROOM") {
    return [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80",
    ];
  }

  if (type === "SUBLET" || type === "SINGLE_ROOM") {
    return [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    ];
  }

  return [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
  ];
}

export function getVehicleImages(v?: {
  vehicleType?: string;
  images?: string[];
}): string[] {
  if (v?.images && v.images.length > 0) {
    return v.images;
  }

  const type = v?.vehicleType?.toUpperCase() || "";

  if (type === "MICROBUS" || type === "PASSENGER_CAR") {
    return [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    ];
  }

  if (type === "COVERED_VAN") {
    return [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80",
    ];
  }

  return [
    "https://images.unsplash.com/photo-1586191582056-a19280f97063?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=800&auto=format&fit=crop&q=80",
  ];
}
