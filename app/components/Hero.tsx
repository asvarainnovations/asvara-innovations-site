"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineSparkles } from "react-icons/hi";
import { SectionDivider } from "./ui/SectionDivider";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute right-[10%] top-1/3 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute left-[10%] bottom-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-6 space-x-2"
          >
            <HiOutlineSparkles className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-accent font-medium tracking-wide">NEXT-GEN LEGAL TECH</span>
            <HiOutlineSparkles className="w-6 h-6 text-accent animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-white mb-6"
          >
            Revolutionizing Legal Work
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">with AI Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Cutting-edge AI solutions empowering legal professionals, law firms, and enterprises 
            to work smarter and achieve more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "95%", label: "Faster Research" },
              { number: "80%", label: "Cost Reduction" },
              { number: "99%", label: "Accuracy Rate" },
              { number: "24/7", label: "Availability" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-10" />
    </div>
  );
} 