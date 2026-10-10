import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Properties & Roommate Listings — MoveInBD",
  description:
    "Explore verified rental apartments, bachelor seats, family homes, and roommate sublets in Dhaka, Chittagong, and across Bangladesh.",
  openGraph: {
    title: "Properties & Flatmates — MoveInBD",
    description: "Verified housing listings with transparent pricing and escrow deposit security.",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
