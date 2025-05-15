"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import axiosInstance from '@/lib/axios';
import { GlowingEffect } from "../components/ui/glowing-effect";

const plans = [
  // Individual Service Plans
  {
    name: "DocBare",
    description: "Document Analysis (Standalone)",
    price: "$29",
    features: [
      "DocBare (Document Analysis)",
      "Daily usage limit applies",
    ],
    highlight: false,
  },
  {
    name: "PleadSmart",
    description: "Case Research (Standalone)",
    price: "$39",
    features: [
      "PleadSmart (Case Research)",
      "Daily usage limit applies",
    ],
    highlight: false,
  },
  {
    name: "AI Court Rooms",
    description: "AI Conversation Simulation (Standalone)",
    price: "$59",
    features: [
      "AI Court Rooms (AI Conversation Simulation)",
      "Daily usage limit applies",
    ],
    highlight: false,
  },
  // Combo Plans
  {
    name: "Basic Combo",
    description: "Best for individuals starting out",
    price: "$49",
    features: [
      "DocBare (Document Analysis) - daily usage limit",
      "PleadSmart (Case Research) - daily usage limit",
    ],
    highlight: false,
  },
  {
    name: "Standard Combo",
    description: "For professionals and small teams",
    price: "$99",
    features: [
      "DocBare (Document Analysis) - unlimited",
      "PleadSmart (Case Research) - usage limit",
      "AI Court Rooms (AI Conversation Simulation) - very limited usage",
    ],
    highlight: true,
    popular: true,
  },
  {
    name: "Premium Combo",
    description: "Full access to all AI features",
    price: "$199",
    features: [
      "DocBare (Document Analysis) - unlimited",
      "PleadSmart (Case Research) - unlimited",
      "AI Court Rooms (AI Conversation Simulation) - higher usage limit",
    ],
    highlight: false,
  },
  // Enterprise/Business
  {
    name: "For Business",
    description: "Custom solutions for enterprises. Contact Asvara for details.",
    price: "Contact Us",
    features: [
      "Custom integrations",
      "Dedicated support",
      "All features included",
    ],
    contact: true,
    highlight: false,
    business: true,
  },
];

export default function Pricing() {
  // Split plans into groups
  const standalonePlans = plans.slice(0, 3);
  const comboPlans = plans.slice(3, 6);
  const businessPlan = plans[6];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-black relative overflow-hidden">
      {/* Background dots/grid effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-20">
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

        {/* Standalone Plans Section */}
        <section>
          <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">Standalone AI Services</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-24">
            {standalonePlans.map((plan, index) => (
              <div key={plan.name} className="relative">
                <GlowingEffect
                  blur={30}
                  spread={40}
                  variant="default"
                  glow={true}
                  disabled={false}
                  movementDuration={1.5}
                  borderWidth={2}
                  className="opacity-100"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-1 min-w-[260px] max-w-xs mx-auto flex flex-col justify-between rounded-3xl p-8 py-10 shadow-xl backdrop-blur-lg bg-gradient-to-b from-[#1a2234]/80 to-[#0f172a]/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
                  style={{ minHeight: 440 }}
                >
                  <div>
                    <h2 className="text-2xl font-extrabold mb-4 text-white">{plan.name}</h2>
                    <p className="text-gray-300 mb-6 text-sm font-medium">{plan.description}</p>
                    <div className="text-4xl font-extrabold mb-10 text-accent">
                      {plan.price}
                      <span className="text-lg font-medium text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckIcon className="h-5 w-5 text-green-400" />
                          <span className="text-gray-200 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-colors mt-auto shadow-md bg-accent text-white hover:bg-accent/90"
                    onClick={() => {/* TODO: Implement subscription logic */}}
                  >
                    Subscribe
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Combo Plans Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">Combo Plans</h2>
          <div className="flex flex-col md:flex-row justify-center items-end gap-24">
            {comboPlans.map((plan, index) => (
              <div key={plan.name} className="relative">
                <GlowingEffect
                  blur={30}
                  spread={40}
                  variant="default"
                  glow={true}
                  disabled={false}
                  movementDuration={1.5}
                  borderWidth={2}
                  className="opacity-100"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-1 min-w-[260px] max-w-xs mx-auto flex flex-col justify-between rounded-3xl p-8 py-10 shadow-xl backdrop-blur-lg bg-gradient-to-b from-[#1a2234]/80 to-[#0f172a]/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
                  style={{ minHeight: 480 }}
                >
                  <div>
                    <h2 className="text-2xl font-extrabold mb-4 text-white">{plan.name}</h2>
                    <p className="text-gray-300 mb-6 text-sm font-medium">{plan.description}</p>
                    <div className="text-4xl font-extrabold mb-10 text-accent">
                      {plan.price}
                      <span className="text-lg font-medium text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckIcon className="h-5 w-5 text-green-400" />
                          <span className="text-gray-200 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-colors mt-auto shadow-md bg-accent text-white hover:bg-accent/90"
                    onClick={() => {/* TODO: Implement subscription logic */}}
                  >
                    Subscribe
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Plan Section */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">For Business</h2>
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <GlowingEffect
                blur={30}
                spread={40}
                variant="default"
                glow={true}
                disabled={false}
                movementDuration={1.5}
                borderWidth={2}
                className="opacity-100"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#1a2234]/80 to-[#0f172a]/90 backdrop-blur-lg p-10 py-12 shadow-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
              >
                <h2 className="text-3xl font-extrabold mb-4 text-white">Contact Us</h2>
                <p className="text-gray-300 mb-6 text-lg font-medium">Custom solutions for enterprises. Contact Asvara for details.</p>
                <ul className="space-y-4 mb-10">
                  {businessPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 justify-center">
                      <CheckIcon className="h-5 w-5 text-accent" />
                      <span className="text-gray-200 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors text-center block mt-auto shadow-md"
                >
                  Contact Asvara
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400">
            Need a custom solution?{" "}
            <a href="/contact" className="text-accent hover:text-accent/80 font-semibold">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 