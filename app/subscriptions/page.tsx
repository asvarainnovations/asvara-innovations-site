"use client";

import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Mock data - replace with actual data from your backend
const activeSubscriptions = [
  {
    id: 1,
    service: "CaseGenius",
    tier: "Professional",
    billingCycle: "Monthly",
    nextPayment: "2024-04-01",
    amount: "$149.00",
  },
  {
    id: 2,
    service: "DocBare",
    tier: "Basic",
    billingCycle: "Monthly",
    nextPayment: "2024-04-15",
    amount: "$49.00",
  },
];

const billingHistory = [
  {
    id: 1,
    date: "2024-03-01",
    amount: "$149.00",
    service: "CaseGenius",
    invoiceNumber: "INV-2024-001",
  },
  {
    id: 2,
    date: "2024-03-15",
    amount: "$49.00",
    service: "DocBare",
    invoiceNumber: "INV-2024-002",
  },
  // Add more history items as needed
];

export default function Subscriptions() {
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
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">My Subscriptions</h1>
        </motion.div>

        {/* Active Subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Active Subscriptions</h2>
          <div className="grid gap-6">
            {activeSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {subscription.service}
                    </h3>
                    <p className="text-gray-400">
                      {subscription.tier} Plan • {subscription.billingCycle}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <p className="text-gray-400 mb-2">
                      Next payment: {subscription.nextPayment}
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => {
                          // TODO: Implement manage plan logic
                        }}
                      >
                        Manage Plan
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                        onClick={() => {
                          // TODO: Implement cancel subscription logic
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Billing History</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Invoice
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {invoice.service}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-accent hover:text-accent/80"
                          onClick={() => {
                            // TODO: Implement download invoice logic
                          }}
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 