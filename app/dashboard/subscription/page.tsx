"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axiosInstance from '@/lib/axios';
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  priceCents: number;
  description: string;
  features: string[];
  serviceId: string;
}

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [current, setCurrent] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch plans and current subscription
  useEffect(() => {
    fetchPlans();
    fetchCurrent();
  }, []);

  const fetchPlans = async () => {
    // For demo, fetch all plans for the first service
    const res = await axiosInstance.get("/api/plans");
    if (res.status === 200) {
      setPlans(res.data);
    }
  };

  const fetchCurrent = async () => {
    const res = await axiosInstance.get("/api/subscription");
    if (res.status === 200) {
      setCurrent(res.data);
    }
  };

  const handleUpgrade = async (planId: string, serviceId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/api/subscription", { planId, serviceId });
      setCurrent(res.data);
    } catch (err) {
      setError("Failed to process upgrade. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-screen bg-black">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscription</h1>
          <p className="mt-1 text-sm text-gray-300">
            Choose the plan that best fits your needs.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg border ${
              current?.planId === plan.id
                ? "bg-[#101522]"
                : "border-[#222c3c] bg-[#181c24]"
            } p-6 shadow-sm`}
          >
            <h2 className="text-lg font-medium text-white">{plan.name}</h2>
            <p className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-white">
                ${plan.priceCents / 100}
              </span>
              <span className="text-base font-medium text-gray-300">/month</span>
            </p>
            <p className="mt-1 text-sm text-gray-300">{plan.description}</p>
            <ul className="mt-6 space-y-4">
              {plan.features?.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-300">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {current?.planId === plan.id ? (
                <button
                  disabled
                  className="w-full rounded-md border border-[#222c3c] bg-[#232b3a] px-4 py-2 text-sm font-medium text-gray-200 shadow-sm hover:bg-[#222c3c] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id, plan.serviceId)}
                  disabled={isProcessing}
                  className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isProcessing && selectedPlan === plan.id
                    ? "Processing..."
                    : "Upgrade"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!current?.planId && (
        <div className="mt-8 rounded-lg bg-[#181c24] p-6 shadow text-center">
          <h2 className="text-lg font-medium text-white">You are currently on the Free Plan.</h2>
          <p className="mt-2 text-sm text-gray-300">
            Upgrade to a premium plan to unlock more features and benefits.
          </p>
          <div className="mt-4">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 