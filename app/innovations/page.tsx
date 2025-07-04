"use client";

import { motion } from "framer-motion";
import { SectionDivider } from "../components/ui/SectionDivider";
import ArticleCard from "./components/ArticleCard";

const articles = [
  {
    id: 1,
    title: "PleadSmart",
    description: "Your On-Demand AI Legal Assistant for research, drafting, and argument building.",
    image: "/products/pleadsmart-illustration.png",
    category: "Legal Tech",
    readTime: "10 min read",
    date: "2025-07-01",
    href: "/innovations/pleadsmart"
  },
  {
    id: 2,
    title: "DocBare",
    description: "AI-Powered Contract & Draft Analyzer for clause-by-clause legal review.",
    image: "/products/docbare-illustration.png",
    category: "Innovation",
    readTime: "5 min read",
    date: "2025-07-01",
    href: "/innovations/docbare"
  },
  {
    id: 3,
    title: "AI Court Room",
    description: "A Virtual Courtroom to Simulate Real Trials, Test Arguments, Predict Outcomes, and Resolve Disputes.",
    image: "/products/aicourt-illustration.png",
    category: "Simulation",
    readTime: "15 min read",
    date: "2025-07-01",
    href: "/innovations/aicourt"
  }
];

export default function InnovationsPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-[#101522] to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light beam from top right */}
        <div className="absolute top-0 right-0 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_top_right,_rgba(0,123,255,0.25)_0%,_rgba(255,255,255,0.10)_60%,_transparent_100%)] blur-2xl opacity-80 z-0" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-accent/30 via-blue-700/20 to-transparent rounded-full blur-3xl opacity-60 z-0 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative pt-40 pb-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Innovations
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest technological breakthroughs and discover how we&apos;re 
              revolutionizing the legal industry through AI-powered solutions.
            </p>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-20" /> */}
    </main>
  );
} 