"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MagnifyingGlassIcon, BookOpenIcon, CodeBracketIcon, QuestionMarkCircleIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data - replace with actual content
const sections = [
  {
    title: "Getting Started",
    icon: BookOpenIcon,
    description: "Learn the basics of using Asvara's legal AI platform",
    articles: [
      {
        title: "Quick Start Guide",
        description: "Get up and running with Asvara in minutes",
        link: "/help/getting-started/quick-start",
      },
      {
        title: "Account Setup",
        description: "How to create and configure your account",
        link: "/help/getting-started/account-setup",
      },
      {
        title: "Basic Features",
        description: "Overview of core platform features",
        link: "/help/getting-started/basic-features",
      },
    ],
  },
  {
    title: "API Reference",
    icon: CodeBracketIcon,
    description: "Technical documentation for developers",
    articles: [
      {
        title: "Authentication",
        description: "How to authenticate with the API",
        link: "/help/api/authentication",
      },
      {
        title: "Endpoints",
        description: "Available API endpoints and their usage",
        link: "/help/api/endpoints",
      },
      {
        title: "Rate Limits",
        description: "Understanding API rate limits",
        link: "/help/api/rate-limits",
      },
    ],
  },
  {
    title: "FAQs",
    icon: QuestionMarkCircleIcon,
    description: "Frequently asked questions and answers",
    articles: [
      {
        title: "Billing & Pricing",
        description: "Common questions about billing and pricing",
        link: "/help/faqs/billing",
      },
      {
        title: "Data Security",
        description: "Information about data handling and security",
        link: "/help/faqs/security",
      },
      {
        title: "Troubleshooting",
        description: "Solutions to common issues",
        link: "/help/faqs/troubleshooting",
      },
    ],
  },
  {
    title: "Tutorials",
    icon: AcademicCapIcon,
    description: "Step-by-step guides for advanced features",
    articles: [
      {
        title: "Advanced Search",
        description: "Master the search functionality",
        link: "/help/tutorials/advanced-search",
      },
      {
        title: "Custom Integrations",
        description: "Integrate Asvara with your existing tools",
        link: "/help/tutorials/integrations",
      },
      {
        title: "Best Practices",
        description: "Tips for optimal platform usage",
        link: "/help/tutorials/best-practices",
      },
    ],
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = sections.map((section) => ({
    ...section,
    articles: section.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.articles.length > 0);

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
            Help & Documentation
          </h1>
          <p className="text-xl text-gray-300">
            Find answers and learn how to use Asvara effectively
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full px-6 py-4 pl-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
            >
              <div className="flex items-center mb-6">
                <section.icon className="h-8 w-8 text-accent mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.articles.map((article) => (
                  <Link
                    key={article.title}
                    href={article.link}
                    className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400">{article.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 