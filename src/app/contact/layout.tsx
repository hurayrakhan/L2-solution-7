import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — MoveInBD",
  description:
    "Get in touch with the MoveInBD team for housing verification, fleet inquiries, or tenant support across Bangladesh.",
  openGraph: {
    title: "Contact Us — MoveInBD",
    description: "24/7 Housing, Roommate Matching, and Shifting Support in Bangladesh.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
