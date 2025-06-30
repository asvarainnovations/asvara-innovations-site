"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, FileText, Lock, Cookie, Database, Users, ChevronRight, Mail, Scale, Gavel } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlassmorphismPolicyCard, NeumorphismPolicyCard, MinimalPolicyCard } from "@/components/policy-card-variants"
import PolicyCard from "./components/PolicyCard"

const policies = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description:
      "Comprehensive protection of your personal data with industry-leading security measures and transparent data handling practices.",
    icon: Shield,
    href: "/policies/privacy",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description:
      "Clear guidelines and mutual agreements that govern your relationship with our platform and define user responsibilities.",
    icon: FileText,
    href: "/policies/terms",
  },
  {
    id: "blog-terms",
    title: "Blog Terms & Conditions",
    description:
      "Guidelines and policies governing content creation, submission, and community engagement on our blog platform.",
    icon: Users,
    href: "/policies/blog-terms",
  },
  {
    id: "tos",
    title: "Terms of Service",
    description:
      "Rules and conditions for using Asvara's legal research tools, AI-powered applications, and related services.",
    icon: Scale,
    href: "/policies/tos",
  },
]

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10">
        <Scale className="w-8 h-8 text-gray-400" />
      </div>
      <div className="absolute top-20 right-20">
        <Gavel className="w-6 h-6 text-gray-400" />
      </div>
      <div className="absolute bottom-20 left-20">
        <Shield className="w-7 h-7 text-gray-400" />
      </div>
      <div className="absolute bottom-10 right-10">
        <FileText className="w-6 h-6 text-gray-400" />
      </div>
      <div className="absolute top-1/2 left-1/4">
        <Lock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="absolute top-1/3 right-1/3">
        <Scale className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

export default function PoliciesPage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const [cardStyle, setCardStyle] = useState<"enhanced" | "glassmorphism" | "neumorphism" | "minimal">("glassmorphism")

  const renderPolicyCard = (policy: any, index: number) => {
    switch (cardStyle) {
      case "glassmorphism":
        return <GlassmorphismPolicyCard key={policy.id} policy={policy} index={index} />
      case "neumorphism":
        return <NeumorphismPolicyCard key={policy.id} policy={policy} index={index} />
      case "minimal":
        return <MinimalPolicyCard key={policy.id} policy={policy} index={index} />
      default:
        return <PolicyCard key={policy.id} policy={policy} index={index} />
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Banner */}
      <motion.section style={{ y }} className="relative bg-zinc-900 overflow-hidden">
        <BackgroundPattern />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-extrabold text-gray-100 mb-6 tracking-tight"
          >
            Our Policies
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-300">Transparency & Trust</h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </motion.section>

      {/* Style Selector - removed */}
      {/* <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="flex space-x-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800">
            {[ ... ]}
          </div>
        </div>
      </section> */}

      {/* Policy Cards Grid */}
      <section className="container mx-auto px-4 pb-16 mt-10">
        <div
          className={`grid gap-6 max-w-6xl mx-auto ${
            cardStyle === "minimal" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {policies.map((policy, index) => renderPolicyCard(policy, index))}
        </div>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-zinc-900/50 border-t border-zinc-800 py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold text-gray-100 mb-4">Questions? Contact our Legal Team</h3>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
