"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const PolicyCard = ({ policy, index }: { policy: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = policy.icon;

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
  };

  const scheme = colorSchemes[policy.id as keyof typeof colorSchemes] || colorSchemes.privacy;

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
  );
};

export default PolicyCard; 