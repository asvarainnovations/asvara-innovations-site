"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axiosInstance from '@/lib/axios';

interface SearchResult {
  id: number;
  title: string;
  snippet: string;
  confidence: number;
  source: string;
  date: string;
}

const services = ["CaseGenius", "RAG-API"];
const jurisdictions = ["Federal", "State", "International"];

export default function Search() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    service: services[0],
    jurisdiction: jurisdictions[0],
    dateRange: "all",
  });
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post('/api/search', {
        query,
        ...filters
      });
      setSearchResults(data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
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
            Search & Query
          </h1>
          <p className="text-xl text-gray-300">
            Ask your legal questions and get AI-powered insights
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your legal question..."
                className="w-full px-6 py-4 pl-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <MagnifyingGlassIcon className="h-6 w-6 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <AdjustmentsHorizontalIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 rounded-xl p-6 space-y-4"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Service
                    </label>
                    <select
                      id="service"
                      value={filters.service}
                      onChange={(e) =>
                        setFilters({ ...filters, service: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
                      htmlFor="jurisdiction"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Jurisdiction
                    </label>
                    <select
                      id="jurisdiction"
                      value={filters.jurisdiction}
                      onChange={(e) =>
                        setFilters({ ...filters, jurisdiction: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      {jurisdictions.map((jurisdiction) => (
                        <option key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dateRange"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Date Range
                    </label>
                    <select
                      id="dateRange"
                      value={filters.dateRange}
                      onChange={(e) =>
                        setFilters({ ...filters, dateRange: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="all">All Time</option>
                      <option value="year">Last Year</option>
                      <option value="month">Last Month</option>
                      <option value="week">Last Week</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white py-4 rounded-xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
            {error}
          </div>
        )}

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {result.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.confidence >= 0.9
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {Math.round(result.confidence * 100)}% Confidence
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{result.snippet}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{result.source}</span>
                    <span>•</span>
                    <span>{result.date}</span>
                  </div>
                  <button
                    className="text-accent hover:text-accent/80"
                    onClick={() => {
                      // TODO: Implement view full document logic
                    }}
                  >
                    View Full Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 