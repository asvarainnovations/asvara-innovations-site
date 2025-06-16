"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Types for section and article
export type Article = {
  title: string;
  description: string;
  link: string;
};

export type Section = {
  title: string;
  icon: React.ElementType;
  description: string;
  articles: Article[];
};

interface DocumentationSectionsProps {
  filteredSections: Section[];
}

export default function DocumentationSections({ filteredSections }: DocumentationSectionsProps) {
  return (
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
  );
} 