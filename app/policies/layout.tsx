import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies - Transparency & Trust",
  description:
    "Our comprehensive policies covering privacy, terms of service, security, and more.",
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set a CSS variable for sticky top offset (NavBar + Hero height)
  return (
    <div className="pt-20 md:pt-24 policy-sticky-top">
      {children}
    </div>
  );
}
