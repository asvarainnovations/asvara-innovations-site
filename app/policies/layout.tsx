import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Policies - Transparency & Trust",
  description: "Our comprehensive policies covering privacy, terms of service, security, and more.",
}

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
