"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import axiosInstance from '@/lib/axios';
import { GlowingEffect } from "../components/ui/glowing-effect";
import PricingHeader from "./components/PricingHeader";
import StandalonePlans from "./components/StandalonePlans";
import ComboPlans from "./components/ComboPlans";
import BusinessPlan from "./components/BusinessPlan";

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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#101522] to-black relative overflow-hidden">
      {/* Background dots/grid effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light beam from top right */}
        <div className="absolute top-0 right-0 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_top_right,_rgba(0,123,255,0.25)_0%,_rgba(255,255,255,0.10)_60%,_transparent_100%)] blur-2xl opacity-80 z-0" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-accent/30 via-blue-700/20 to-transparent rounded-full blur-3xl opacity-60 z-0 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 flex flex-col gap-20">
        <PricingHeader />
        <StandalonePlans plans={standalonePlans} />
        <ComboPlans plans={comboPlans} />
        <BusinessPlan plan={businessPlan} />
      </div>
    </div>
  );
} 