"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import axiosInstance from '@/lib/axios';

const plans = [
  {
    name: "Basic",
    description: "For individual lawyers",
    price: "$49",
    features: [
      "Basic legal research",
      "Document analysis (up to 100 pages/month)",
      "Email support",
      "Basic analytics",
      "1 user account",
    ],
  },
  {
    name: "Professional",
    description: "For small law firms",
    price: "$149",
    features: [
      "Advanced legal research",
      "Document analysis (up to 500 pages/month)",
      "Priority support",
      "Advanced analytics",
      "Up to 5 user accounts",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large firms",
    price: "Custom",
    features: [
      "Custom legal research solutions",
      "Unlimited document analysis",
      "24/7 dedicated support",
      "Custom analytics dashboard",
      "Unlimited user accounts",
      "Advanced API access",
      "Custom integrations",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background dots/grid effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose your plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your legal practice needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg">/month</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-accent flex-shrink-0 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
                onClick={async () => {
                  try {
                    // TODO: Replace with actual subscription API call
                    await axiosInstance.post('/api/subscribe', { plan: plan.name });
                    alert('Subscription request sent!');
                  } catch (err) {
                    alert('Failed to subscribe. Please try again.');
                  }
                }}
              >
                Subscribe
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Need a custom solution?{" "}
            <a href="/contact" className="text-accent hover:text-accent/80">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 