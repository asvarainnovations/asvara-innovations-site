"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Clock, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tableOfContents = [
  { id: "originality", title: "Originality and Ownership" },
  { id: "rights", title: "Rights Granted to Asvara" },
  { id: "guidelines", title: "Content Guidelines" },
  { id: "editing", title: "Editing and Moderation" },
  { id: "attribution", title: "Attribution" },
  { id: "compensation", title: "No Compensation" },
  { id: "responsibility", title: "Responsibility for Claims" },
  { id: "withdrawal", title: "Withdrawal of Content" },
  { id: "jurisdiction", title: "Jurisdiction" },
];

const SidebarTOC = () => {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Card className="sticky-policy-toc bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-purple-600/20 text-purple-400 border-l-2 border-purple-400"
                  : "text-gray-400 hover:text-gray-300 hover:bg-zinc-800/50"
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default function BlogTermsPage() {
  return (
      <div className="min-h-screen bg-zinc-950">
        {/* Hero Title */}
        <section className="bg-zinc-900 py-16">
          <div className="container mt-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100">
                  Blog Terms & Conditions
                </h1>
              </div>
              <div className="flex items-center justify-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span className="italic">Effective Date: June 15th, 2025</span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Breadcrumb */}
        <div className="bg-zinc-900/50 border-b border-zinc-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <Link
                href="/policies"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Policies
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <span className="text-gray-300">Blog Terms & Conditions</span>
            </nav>
          </div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Sidebar TOC */}
            <div className="lg:col-span-1">
              <SidebarTOC />
            </div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-invert prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-12"
                >
                  {/* Section 0: Intro */}
                  <div className="text-gray-300 leading-relaxed">
                    <p className="mb-6">
                      By submitting a blog post to Asvara, you agree to the
                      following terms:
                    </p>
                  </div>
                  {/* Section 1: Originality and Ownership */}
                  <section id="originality" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      1. Originality and Ownership
                    </motion.h2>
                    <p className="text-gray-300">
                      You confirm that the blog content you submit is your
                      original work and does not infringe on the intellectual
                      property rights of any third party. Plagiarized,
                      AI-generated without proper edits, or copyrighted content
                      without permission is strictly prohibited.
                    </p>
                  </section>
                  {/* Section 2: Rights Granted to Asvara */}
                  <section id="rights" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      2. Rights Granted to Asvara
                    </motion.h2>
                    <p className="text-gray-300">
                      By submitting your blog, you grant Asvara Private Limited a
                      non-exclusive, royalty-free, worldwide license to publish,
                      edit, distribute, and display your blog content on its
                      website, social media platforms, and promotional materials.
                    </p>
                  </section>
                  {/* Section 3: Content Guidelines */}
                  <section id="guidelines" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      3. Content Guidelines
                    </motion.h2>
                    <p className="text-gray-300">
                      Submitted blogs must be relevant to law, legal technology,
                      policy, or professional development. Content that is
                      defamatory, offensive, promotional in nature, or unrelated
                      to legal discourse will be rejected.
                    </p>
                  </section>
                  {/* Section 4: Editing and Moderation */}
                  <section id="editing" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      4. Editing and Moderation
                    </motion.h2>
                    <p className="text-gray-300">
                      Asvara reserves the right to make editorial changes to your
                      blog for clarity, grammar, formatting, or compliance with
                      brand tone—without altering your core message or argument.
                      We may also decline to publish any submission without
                      assigning any reason.
                    </p>
                  </section>
                  {/* Section 5: Attribution */}
                  <section id="attribution" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      5. Attribution
                    </motion.h2>
                    <p className="text-gray-300">
                      If your blog is selected, it will be published under your
                      name (or a pen name, if specified). You are required to
                      provide a short author bio and confirm that the name and
                      details submitted are accurate and do not impersonate any
                      individual, organization, or public figure
                      <br />
                      Any violation of this clause, including the use of false or
                      misleading identity, may result in permanent
                      disqualification from future submissions, removal of
                      published content, and, where applicable, legal action.
                    </p>
                  </section>
                  {/* Section 6: No Compensation */}
                  <section id="compensation" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      6. No Compensation
                    </motion.h2>
                    <p className="text-gray-300">
                      Asvara does not offer financial compensation for blog
                      submissions. This is a voluntary contribution for the
                      purpose of community engagement, legal education, and
                      professional visibility.
                    </p>
                  </section>
                  {/* Section 7: Responsibility for Claims */}
                  <section id="responsibility" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      7. Responsibility for Claims
                    </motion.h2>
                    <p className="text-gray-300">
                      You are solely responsible for the content you submit,
                      including factual accuracy, opinions expressed, and any
                      claims made. Asvara disclaims liability for any third-party
                      disputes or legal action arising from the blog content.
                    </p>
                  </section>
                  {/* Section 8: Withdrawal of Content */}
                  <section id="withdrawal" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      8. Withdrawal of Content
                    </motion.h2>
                    <p className="text-gray-300">
                      Once published, blog content may remain on the Asvara
                      platform indefinitely. However, authors may request removal
                      by emailing the editorial team. Asvara will assess such
                      requests on a case-by-case basis.
                    </p>
                  </section>
                  {/* Section 9: Jurisdiction */}
                  <section id="jurisdiction" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-purple-400/30"
                    >
                      9. Jurisdiction
                    </motion.h2>
                    <p className="text-gray-300">
                      These terms are governed by the laws of India. Any disputes
                      arising from blog submissions will be subject to the
                      jurisdiction of courts located in New Delhi.
                    </p>
                    <p className="text-gray-400 italic mt-6">
                      *If you do not agree with any part of these terms, please do
                      not submit your blog.
                    </p>
                  </section>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer CTA */}
        <section className="bg-zinc-900/50 border-t border-zinc-800 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Questions about blog submissions?
            </h3>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Contact Editorial Team
            </Button>
          </div>
        </section>
      </div>
  );
}
