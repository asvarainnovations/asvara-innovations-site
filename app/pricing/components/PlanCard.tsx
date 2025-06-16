"use client";
import { CheckIcon } from "@heroicons/react/24/solid";
import { GlowingEffect } from "@/app/components/ui/glowing-effect";
import { motion } from "framer-motion";

type Plan = {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlight?: boolean;
  contact?: boolean;
  popular?: boolean;
  business?: boolean;
};

interface PlanCardProps {
  plan: Plan;
  index: number;
  minHeight?: number;
  onSubscribe: () => void;
}

export default function PlanCard({ plan, index, minHeight = 440, onSubscribe }: PlanCardProps) {
  return (
    <div className="relative">
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
        style={{ minHeight }}
      >
        <div>
          <h2 className="text-2xl font-extrabold mb-4 text-white">{plan.name}</h2>
          <p className="text-gray-300 mb-6 text-sm font-medium">{plan.description}</p>
          <div className="text-4xl font-extrabold mb-10 text-accent">
            {plan.price}
            {plan.price !== "Contact Us" && (
              <span className="text-lg font-medium text-gray-400">/month</span>
            )}
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
        {plan.contact ? (
          <a
            href="/contact"
            className="w-full py-3 rounded-xl font-semibold transition-colors mt-auto shadow-md bg-accent text-white hover:bg-accent/90 text-center block"
          >
            Contact Us
          </a>
        ) : (
          <button
            className="w-full py-3 rounded-xl font-semibold transition-colors mt-auto shadow-md bg-accent text-white hover:bg-accent/90"
            onClick={onSubscribe}
          >
            Subscribe
          </button>
        )}
      </motion.div>
    </div>
  );
} 