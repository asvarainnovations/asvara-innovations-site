"use client";

import { motion } from "framer-motion";
import { SectionDivider } from "../components/ui/SectionDivider";
import { ArticleCard } from "../components/ArticleCard";

const articles = [
  {
    id: 1,
    title: "AI-Powered Legal Research Revolution",
    description: "Discover how our advanced AI algorithms are transforming legal research, making it faster and more accurate than ever before.",
    image: "/images/article1.png",
    category: "Legal Tech",
    readTime: "5 min read",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Automated Document Analysis",
    description: "Learn how our machine learning models can analyze complex legal documents with unprecedented accuracy and speed.",
    image: "/images/article2.png",
    category: "Innovation",
    readTime: "7 min read",
    date: "2024-03-18",
  },
  {
    id: 3,
    title: "Predictive Analytics in Legal Practice",
    description: "Explore how data-driven insights can help predict case outcomes and make better legal decisions.",
    image: "/images/article3.png",
    category: "Analytics",
    readTime: "6 min read",
    date: "2024-03-15",
  }
];

export default function InnovationsPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
      </div>

      <div className="relative pt-32 pb-20">
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
              Explore our latest technological breakthroughs and discover how we're 
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

      <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-20" />
    </main>
  );
} 