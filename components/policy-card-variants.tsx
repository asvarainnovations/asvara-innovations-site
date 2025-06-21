"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Alternative Card Design - Glassmorphism Style
export const GlassmorphismPolicyCard = ({ policy, index }: { policy: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = policy.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={
            isHovered
              ? {
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                    "linear-gradient(90deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
                    "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                  ],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        <CardContent className="relative p-8">
          {/* Header with icon and badge */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: [0, -10, 10, 0] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Icon className="w-7 h-7 text-blue-400" />
              </div>
              {/* Floating particles */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ y: [-10, -20, -10], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full"
                    animate={{ y: [10, 20, 10], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                </>
              )}
            </motion.div>

            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Updated
            </Badge>
          </div>

          {/* Title with animated underline */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{policy.title}</h3>
            <motion.div
              className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "30%" }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{policy.description}</p>

          {/* Stats row */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
              <span>Live</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link href={policy.href}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all duration-300 relative overflow-hidden group"
                size="lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative flex items-center justify-center">
                  Explore Policy
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </Link>
        </CardContent>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full" />
      </Card>
    </motion.div>
  )
}

// Alternative Card Design - Neumorphism Style
export const NeumorphismPolicyCard = ({ policy, index }: { policy: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = policy.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateX: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <div className="relative p-8 rounded-3xl bg-zinc-900 shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#1a1a1a] hover:shadow-[25px_25px_70px_#0a0a0a,-25px_-25px_70px_#1a1a1a] transition-all duration-500">
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 shadow-inner" />

        <div className="relative z-10">
          {/* Icon container */}
          <motion.div
            animate={isHovered ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-900 shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#1a1a1a] flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-blue-400" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white text-center mb-3">{policy.title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-sm text-center leading-relaxed mb-6 line-clamp-3">{policy.description}</p>

          {/* Button */}
          <Link href={policy.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-6 rounded-2xl bg-zinc-900 shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#1a1a1a] hover:shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#1a1a1a] text-blue-400 font-medium transition-all duration-300 flex items-center justify-center"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Alternative Card Design - Minimal Elegant Style
export const MinimalPolicyCard = ({ policy, index }: { policy: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = policy.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative p-8 border-l-4 border-blue-500/30 hover:border-blue-400 bg-zinc-900/30 hover:bg-zinc-900/50 backdrop-blur-sm transition-all duration-500">
        {/* Animated background line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400"
          initial={{ height: "0%" }}
          animate={{ height: isHovered ? "100%" : "20%" }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-start space-x-6">
          {/* Icon */}
          <motion.div
            animate={isHovered ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                {policy.title}
              </h3>
              <motion.div animate={isHovered ? { x: 5 } : { x: 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </motion.div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{policy.description}</p>

            <Link href={policy.href}>
              <span className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                Read more →
              </span>
            </Link>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={isHovered ? { backgroundPosition: ["0% 50%", "100% 50%"] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </motion.div>
  )
}
