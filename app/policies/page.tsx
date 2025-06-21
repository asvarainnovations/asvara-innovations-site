"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, FileText, Lock, Cookie, Database, Users, ChevronRight, Mail, Scale, Gavel } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlassmorphismPolicyCard, NeumorphismPolicyCard, MinimalPolicyCard } from "@/components/policy-card-variants"

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
]

const PolicyCard = ({ policy, index }: { policy: (typeof policies)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = policy.icon

  // Color schemes for different policies
  const colorSchemes = {
    privacy: {
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      icon: "text-emerald-400",
      accent: "bg-emerald-500/10",
    },
    terms: {
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      accent: "bg-blue-500/10",
    },
    "blog-terms": {
      gradient: "from-purple-500/20 to-violet-500/20",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      accent: "bg-purple-500/10",
    },
  }

  const scheme = colorSchemes[policy.id as keyof typeof colorSchemes] || colorSchemes.privacy

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card
        className={`relative overflow-hidden bg-gradient-to-br ${scheme.gradient} backdrop-blur-xl border-2 ${scheme.border} hover:border-opacity-60 transition-all duration-500 hover:shadow-2xl hover:shadow-current/10`}
      >
        {/* Decorative corner element */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 ${scheme.accent} rounded-bl-full opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
        />

        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-4 right-4">
            <Icon className="w-32 h-32 text-current opacity-10" />
          </div>
        </motion.div>

        <CardContent className="relative p-8 h-full flex flex-col">
          {/* Status indicator */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div
                className={`w-16 h-16 ${scheme.accent} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border ${scheme.border}`}
              >
                <Icon className={`w-8 h-8 ${scheme.icon}`} />
              </div>
              {/* Pulse ring */}
              <motion.div
                animate={isHovered ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : {}}
                transition={{ duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                className={`absolute inset-0 rounded-2xl border-2 ${scheme.border}`}
              />
            </motion.div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">ACTIVE</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                {policy.title}
              </h3>
              <div className={`w-12 h-1 ${scheme.accent} rounded-full transition-all duration-500 group-hover:w-20`} />
            </div>

            <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
              {policy.description}
            </p>
          </div>

          {/* Interactive elements */}
          <div className="mt-8 space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated</span>
              <span>Dec 2024</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1">
              <motion.div
                className={`h-1 rounded-full bg-gradient-to-r ${scheme.gradient.replace("/20", "/60")}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>

            {/* CTA Button */}
            <Link href={policy.href} className="block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className={`w-full bg-gradient-to-r ${scheme.gradient.replace("/20", "")} hover:shadow-lg hover:shadow-current/25 text-white font-semibold py-3 rounded-xl transition-all duration-300 border-0 relative overflow-hidden group`}
                  size="lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={{ x: "-100%" }}
                    animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center justify-center">
                    View Policy
                    <motion.div animate={isHovered ? { x: 5 } : { x: 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </Link>
          </div>
        </CardContent>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${scheme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </Card>
    </motion.div>
  )
}

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
  const [cardStyle, setCardStyle] = useState<"enhanced" | "glassmorphism" | "neumorphism" | "minimal">("enhanced")

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

      {/* Style Selector */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="flex space-x-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800">
            {[
              { key: "enhanced", label: "Enhanced" },
              { key: "glassmorphism", label: "Glass" },
              { key: "neumorphism", label: "Neuro" },
              { key: "minimal", label: "Minimal" },
            ].map((style) => (
              <button
                key={style.key}
                onClick={() => setCardStyle(style.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  cardStyle === style.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-300 hover:bg-zinc-800/50"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Cards Grid */}
      <section className="container mx-auto px-4 pb-16">
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
