"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Mock data - replace with actual data from your backend
const existingKeys = [
  {
    id: 1,
    name: "CaseGenius API Key",
    service: "CaseGenius",
    created: "2024-03-01",
    status: "Active",
  },
  {
    id: 2,
    name: "DocBare API Key",
    service: "DocBare",
    created: "2024-03-15",
    status: "Active",
  },
];

const services = ["CaseGenius", "DocBare"];

export default function ApiKeys() {
  const [newKey, setNewKey] = useState({
    name: "",
    service: services[0],
  });

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API key creation logic
  };

  const handleRevokeKey = (keyId: number) => {
    // TODO: Implement API key revocation logic
  };

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
          <h1 className="text-4xl font-bold text-white mb-6">
            API Keys Management
          </h1>
          <p className="text-xl text-gray-300">
            Generate and manage your service API keys
          </p>
        </motion.div>

        {/* Create New API Key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Create New API Key
            </h2>
            <form onSubmit={handleCreateKey} className="space-y-6">
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Service
                </label>
                <select
                  id="service"
                  value={newKey.service}
                  onChange={(e) =>
                    setNewKey({ ...newKey, service: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Key Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newKey.name}
                  onChange={(e) =>
                    setNewKey({ ...newKey, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Enter a name for your API key"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
              >
                Generate API Key
              </button>
            </form>
          </div>
        </motion.div>

        {/* Existing API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Existing API Keys
          </h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {existingKeys.map((key) => (
                    <tr
                      key={key.id}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {key.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {key.service}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {key.created}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            key.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {key.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-red-500 hover:text-red-400"
                          onClick={() => handleRevokeKey(key.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
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