"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axiosInstance from '@/lib/axios';

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
    const res = await fetch("/api/plans");
    if (res.ok) {
      setPlans(await res.json());
    }
  };

  const fetchCurrent = async () => {
    const res = await fetch("/api/subscription");
    if (res.ok) {
      setCurrent(await res.json());
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose the plan that best fits your needs
        </p>
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
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            } p-6 shadow-sm`}
          >
            <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
            <p className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                ${plan.priceCents / 100}
              </span>
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
            <ul className="mt-6 space-y-4">
              {plan.features?.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
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
                  <p className="ml-3 text-sm text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {current?.planId === plan.id ? (
                <button
                  disabled
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h2 className="text-lg font-medium text-gray-900">Need a custom plan?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Contact our sales team for a custom solution tailored to your needs.
        </p>
        <div className="mt-4">
          <a
            href="mailto:sales@example.com"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
} 