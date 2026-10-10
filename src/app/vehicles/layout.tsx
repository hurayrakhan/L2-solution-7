import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Vehicles Fleet & House Shifting — MoveInBD",
  description:
    "Book verified pickups, covered vans, open trucks, and professional moving crews with guaranteed fixed fares and live tracking in Bangladesh.",
  openGraph: {
    title: "Moving Vehicles Fleet — MoveInBD",
    description: "Reliable, transparent shifting transport across Bangladesh.",
  },
};

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
