"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineSparkles } from "react-icons/hi";
import { SectionDivider } from "./ui/SectionDivider";

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-32 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-2 mb-8"
          >
            <HiOutlineSparkles className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-accent font-medium tracking-wider uppercase text-sm">NEXT-GEN LEGAL TECH</span>
            <HiOutlineSparkles className="w-6 h-6 text-accent animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-poppins font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            <span className="block mb-3">Revolutionizing</span>
            <span className="block mb-3">Legal Work with</span>
            <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
              AI Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-10 text-left max-w-xl leading-relaxed"
          >
            Cutting-edge AI solutions empowering legal professionals, law firms, and enterprises 
            to work smarter and achieve more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button
              size="lg"
              variant="secondary"
              className="min-w-[200px] text-lg h-14 bg-accent hover:bg-accent/90 font-medium shadow-lg shadow-accent/25 hover:shadow-accent/30 transition-all"
              onClick={() => {
                const element = document.getElementById("innovations");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Solutions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] text-lg h-14 border-2 border-accent/20 text-white hover:bg-accent/10 font-medium transition-all"
              onClick={() => {
                const element = document.getElementById("contact");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-8 max-w-lg"
          >
            {[
              { number: "95%", label: "Faster Research" },
              { number: "80%", label: "Cost Reduction" },
              { number: "99%", label: "Accuracy Rate" },
              { number: "24/7", label: "Availability" },
            ].map((stat, index) => (
              <div key={index} className="text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative h-[600px] lg:h-screen hidden lg:flex items-center justify-center"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-accent/20 text-9xl font-bold">
              AI
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-20" />
    </div>
  );
} 