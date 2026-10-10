import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mess & Utility Bill Splitter — MoveInBD",
  description:
    "Free interactive calculator to split electricity, gas, water, internet, and bachelor mess expenses fairly among flatmates.",
  openGraph: {
    title: "Mess & Utility Bill Splitter — MoveInBD",
    description: "Fair expense calculation for roommates and bachelor flats in Bangladesh.",
  },
};

export default function UtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
