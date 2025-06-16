"use client";
import { motion } from "framer-motion";

export default function PricingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Choose your plan
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Select the perfect plan for your legal practice needs
      </p>
    </motion.div>
  );
} 